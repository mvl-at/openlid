import {Component, Input} from "@angular/core";
import {Member} from "../../common/member";
import {environment} from "../../../environments/environment";
import {controllers} from "../../services/controllers";

@Component({
  selector: "lid-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.scss"]
})
export class MemberCardComponent {

  @Input()
  member!: Member;

  get photo(): string {
    return `${environment.barrelUrl}${controllers.members.photo(this.member.username)}`;
  }

}
