import {Component, Input} from "@angular/core";
import {Crew, Member} from "../../common/member";
import {environment} from "../../../environments/environment";
import {controllers} from "../../services/controllers";

@Component({
  selector: "lid-orchestra", templateUrl: "./orchestra.component.html", styleUrls: ["./orchestra.component.scss"]
})
export class OrchestraComponent {
  @Input() members: Crew = {honoraryMembers: [], musicians: [], sutlers: []};
  @Input() distance = 6;
  @Input() iconSize = 5;
  @Input() yAmplRatio = 0.75;
  @Input() rowOffset = 7;
  height = 0;
  width = 0;

  get orchestraSeatsDistributed(): OrchestraSeat[] {
    let maxRowLength = 0;

    let currentRow: MemberWithRegister[] = [];
    const rows: MemberWithRegister[][] = [];
    const seatConfig = environment.orchestra.seats;
    for (let i = 0; i < seatConfig.length; i++) {
      currentRow.push(...seatConfig[i].map(s => this.members.musicians.find(r => r.name === s)?.members?.map(m => {
        return {member: m, register: s};
      }) ?? []).flat());
      if (i % 3 === 2 || seatConfig.length - 1 === i) {
        maxRowLength = Math.max(currentRow.length, maxRowLength);
        rows.push(currentRow);
        currentRow = [];
      }
    }
    const orchestra: OrchestraSeat[] = [];
    const table = this.indexTable(maxRowLength, this.distance);

    this.height = this.iconSize + this.rowOffset * (rows.length - 1) + (table.get(0)?.y ?? 0);
    this.width = this.iconSize + 2 * (table.get(-maxRowLength + 1)?.x ?? 0);
    console.debug("Ellipse table", maxRowLength, table);

    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
      const row: MemberWithRegister[] = rows[rowNum];
      const rowOffset = -row.length;
      const rowYAlign = (rows.length - rowNum - 1) * this.rowOffset;
      for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
        const seatNumberByCenter = rowOffset + seatIndex * 2 + 1;
        const basePoint = table.get(seatNumberByCenter);
        const seat = row[seatIndex];
        if (basePoint) {
          orchestra.push({
            register: seat.register, member: seat.member, coords: {
              x: basePoint.x, y: ((table.get(0)?.y) ?? 0) - basePoint.y + rowYAlign
            }
          });
        }
      }
    }
    return orchestra;
  }

  private indexTable(maxIndexExclusive: number, distance: number): Map<number, { x: number, y: number }> {
    const table = new Map<number, { x: number, y: number }>();
    const xAmplitude = (maxIndexExclusive - 1) * distance / (Math.sqrt(1 + this.yAmplRatio * this.yAmplRatio));
    const yAmplitude = xAmplitude * this.yAmplRatio;
    console.debug("amplitudes", xAmplitude, yAmplitude);
    const steps = 1000;
    let previousDistance = NaN;
    for (let t = 0, i = 0; t < steps && !table.has(maxIndexExclusive - 1); t++) {
      const step = t * Math.PI / (2 * steps);
      const x = xAmplitude * Math.sin(step);
      const y = yAmplitude * Math.cos(step);
      const point = {x: x, y: y};
      const mirroredPoint = {x: -x, y: y};

      if (i === 0) {
        table.set(i, point);
        console.debug("Found point", i, point);
        i++;
      } else {
        let currentDistance;
        if (i === 1) {
          currentDistance = this.distanceBetween(point, mirroredPoint);
        } else {
          currentDistance = this.distanceBetween(point, table.get(i - 2));
        }
        if (currentDistance === distance || (previousDistance < distance && currentDistance > distance)) {
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
    return `${environment.barrelUrl}${controllers.members.photo(username)}`;
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
