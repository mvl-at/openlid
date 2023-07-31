import {Component, Input} from "@angular/core";
import {Crew, Member} from "../../common/member";
import {controllers} from "../../services/controllers";
import {MatDialog} from "@angular/material/dialog";
import {MemberDialogComponent} from "../../dialogs/member-dialog/member-dialog.component";
import {ConfigurationService} from "../../services/configuration.service";
import {Configuration} from "../../common/configuration.model";

@Component({
  selector: "lid-orchestra", templateUrl: "./orchestra.component.html", styleUrls: ["./orchestra.component.scss"]
})
export class OrchestraComponent {
  private configuration: Configuration;
  @Input() set members(members: Crew) {
    this.calculateOrchestraSeatsDistribution(members);
  }
  @Input() distance = 6;
  @Input() iconSize = 5;
  @Input() yAmplRatio = 0.75;
  @Input() rowOffset = 7;
  height = 0;
  width = 0;
  orchestraSeats: OrchestraSeat[] = [];

  constructor(private dialog: MatDialog, private configurationService: ConfigurationService) {
    this.configuration = configurationService.configuration;
  }

  /**
   * Calculates the orchestra distribution out of the crew.
   * Assigns the result to the orchestraSeats variable.
   * Calculates and assigns the height and the width of this container.
   *
   * @param members the crew to calculate the distribution from
   */
  calculateOrchestraSeatsDistribution(members: Crew) {
    if (!members) {
      return;
    }
    const seatConfig = this.configuration.orchestra.seats;
    const rowsInfo = this.extractRows(seatConfig, members);
    const rows = rowsInfo.rows;
    const maxRowLength = rowsInfo.maxRowLength;
    const orchestra: OrchestraSeat[] = [];
    const table = this.indexTable(maxRowLength, this.distance);

    this.adjustContainerMeasurements(rows, table, maxRowLength);

    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
      const row: MemberWithRegister[] = rows[rowNum];
      const rowOffset = -row.length;
      const rowYAlign = (rows.length - rowNum - 1) * this.rowOffset;
      this.addSeats(row, rowOffset, table, orchestra, rowYAlign);
    }
    this.orchestraSeats = orchestra;
  }

  /**
   * Add the seats to an orchestra.
   * @param row the row of which seats should be added
   * @param rowOffset the negative offset where the row should start at
   * @param table the approximation table
   * @param orchestra the orchestra to add the seats to
   * @param rowYAlign the vertical offset of the row in em
   * @private
   */
  private addSeats(row: MemberWithRegister[], rowOffset: number, table: Map<number, {
    x: number; y: number
  }>, orchestra: OrchestraSeat[], rowYAlign: number) {
    for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
      const seatNumberByCenter = rowOffset + seatIndex * 2 + 1;
      const basePoint = table.get(seatNumberByCenter);
      const seat = row[seatIndex];
      if (basePoint) {
        orchestra.push({
          register: seat.register, member: seat.member, coords: {
            x: basePoint.x - this.iconSize / 2, y: ((table.get(0)?.y) ?? 0) - basePoint.y + rowYAlign
          }
        });
      }
    }
  }

  /**
   * Sets the height and the width of this components' container.
   * @param rows the rows
   * @param table the table with the approximations
   * @param maxRowLength the maximum row length
   * @private
   */
  private adjustContainerMeasurements(rows: MemberWithRegister[][], table: Map<number, {
    x: number; y: number
  }>, maxRowLength: number) {
    this.height = this.iconSize + this.rowOffset * (rows.length - 1) + (table.get(0)?.y ?? 0) - (table.get(maxRowLength - 1)?.y ?? 0);
    this.width = this.iconSize + 2 * (table.get(maxRowLength - 1)?.x ?? 0);
    console.debug("Ellipse table", maxRowLength, table);
    console.debug("Icon size, maxrowlength, table", this.iconSize, maxRowLength, table);
  }

  /**
   * Extract the rows out of the register configuration.
   * Calculates the length of the row with the maximum length.

   * @param seatConfig the configuration
   * @param members the crew to put into the rows
   * @private
   */
  private extractRows(seatConfig: string[][], members: Crew) {
    let maxRowLength = 0;
    let currentRow: MemberWithRegister[] = [];
    const rows: MemberWithRegister[][] = [];
    for (let i = 0; i < seatConfig.length; i++) {
      currentRow.push(...seatConfig[i].map(s => members.musicians.find(r => r.name === s)?.members?.map(m => {
        return {member: m, register: s};
      }) ?? []).flat());
      if (i % 3 === 2 || seatConfig.length - 1 === i) {
        maxRowLength = Math.max(currentRow.length, maxRowLength);
        rows.push(currentRow);
        currentRow = [];
      }
    }
    return {rows, maxRowLength};
  }

  /**
   * Calculate the approximations of the ellipse.
   * @param maxIndexExclusive the length of the maximum seats of all rows
   * @param distance the distance between the seats
   * @private
   */
  private indexTable(maxIndexExclusive: number, distance: number): Map<number, { x: number, y: number }> {
    const table = new Map<number, { x: number, y: number }>();
    const xAmplitude = (maxIndexExclusive - 1) * distance / (Math.sqrt(1 + this.yAmplRatio * this.yAmplRatio)); // calculate an upper bound for the x-axis using the pythagoras and the y amplitude ration
    const yAmplitude = xAmplitude * this.yAmplRatio;
    console.debug("amplitudes", xAmplitude, yAmplitude);
    const steps = 1000; // the steps to use. if denser, the result will be more accurate but takes more processing time
    let previousDistance = NaN;
    // iterates through the steps, t is used as the ellipse parameter there i is the index (-maximum row length;maximum row length). even i are used for rows with odd amounts of seats and vice versa
    for (let t = 0, i = 0; t < steps && !table.has(maxIndexExclusive - 1); t++) {
      const step = t * Math.PI / (2 * steps);
      const x = xAmplitude * Math.sin(step);
      const y = yAmplitude * Math.cos(step);
      const point = {x: x, y: y};
      const mirroredPoint = {x: -x, y: y};

      if (i === 0) { // the point on top
        table.set(i, point);
        console.debug("Found point", i, point);
        i++;
      } else {
        let currentDistance;
        if (i === 1) { // the distance of the first non-top point must be equal to its mirror
          currentDistance = this.distanceBetween(point, mirroredPoint);
        } else { // else use the last odd/even point
          currentDistance = this.distanceBetween(point, table.get(i - 2));
        }
        if (currentDistance === distance || (previousDistance < distance && currentDistance > distance)) { // check if previous distance < distance <= current distance to prevent skips
          table.set(i, point);
          table.set(-i, mirroredPoint);
          console.debug("Found point", i, point, currentDistance);
          i++;
        }
        previousDistance = currentDistance;
      }
      if (!(t + 1 < steps && !table.has(maxIndexExclusive - 1))) {
        console.debug("Abort: ", i, t + 1 < steps, !table.has(maxIndexExclusive - 1));
        console.debug("Final point", point);
      }
    }
    return table;
  }

  private distanceBetween(a?: { x: number, y: number }, b?: { x: number, y: number }) {
    if (!a || !b) {
      return NaN;
    }
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
  }

  photo(username: string): string {
    return `${this.configuration.barrelUrl}${controllers.members.photo(username)}`;
  }

  infos(seat: OrchestraSeat) {
    this.dialog.open(MemberDialogComponent, {
      data: {member: seat.member, register: seat.register},
    });
  }
}

interface MemberWithRegister {
  register: string,
  member: Member
}

interface OrchestraSeat {
  register: string;
  member: Member;
  coords: {
    x: number; y: number;
  };
}
