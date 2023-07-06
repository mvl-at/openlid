import {Component, Input} from "@angular/core";
import {Crew} from "../../common/member";

@Component({
  selector: "lid-classic-members",
  templateUrl: "./classic-members.component.html",
  styleUrls: ["./classic-members.component.scss"]
})
export class ClassicMembersComponent {
  @Input()
  crew!: Crew;
}
