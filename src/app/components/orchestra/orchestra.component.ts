import {Component, Input} from "@angular/core";
import {Crew, Member} from "../../common/member";
import {environment} from "../../../environments/environment";
import {controllers} from "../../services/controllers";

@Component({
  selector: "lid-orchestra", templateUrl: "./orchestra.component.html", styleUrls: ["./orchestra.component.scss"]
})
export class OrchestraComponent {
  @Input() members!: Crew;


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
    const startAngle = Math.PI / 2 * 0.75;
    const orchestra: OrchestraSeat[] = [];

    let minimalX = 0;
    let rowWithMinimalX = 0;
    let minimalSeatNumberByCenter = 0;
    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
      const seatNumberByCenter = -rows[rowNum].length / 2 + 0.5;
      const x = ((rowNum + 1) / rows.length) * Math.sin(startAngle * seatNumberByCenter / (maxRowLength / 2));
      console.debug("X", x);
      if (rowNum === 0 || x < minimalX) {
        minimalX = x;
        rowWithMinimalX = rowNum;
        minimalSeatNumberByCenter = seatNumberByCenter;
      }
    }

    console.debug("Minimal rownum", rowWithMinimalX);
    const xBaseAmplitude = ((-50) / (Math.sin(startAngle * minimalSeatNumberByCenter / (maxRowLength / 2)))) / (rowWithMinimalX + 1);

    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
      const row: MemberWithRegister[] = rows[rowNum];
      const rowOffset = -row.length / 2;
      // const xAmplitude = 50 * (rowNum + 1) / rows.length;
      const xAmplitude = xBaseAmplitude * (rowNum + 1);
      // const yAmplitude = 100*(rowNum+1)/rows.length;
      const yAmplitude = 25;
      for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
        const seatNumberByCenter = rowOffset + seatIndex + 0.5;
        const x = 50 + xAmplitude * Math.sin(startAngle * seatNumberByCenter / (maxRowLength / 2));
        const y = 20 * rowNum + yAmplitude * Math.cos(startAngle * seatNumberByCenter / (maxRowLength / 2));
        const seat = row[seatIndex];
        orchestra.push({
          register: seat.register, member: seat.member, coords: {
            x: x, y: y
          }
        });
      }
    }
    return orchestra;
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
