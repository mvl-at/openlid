import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Member} from "../../common/member";
import {environment} from "../../../environments/environment";
import {controllers} from "../../services/controllers";

@Component({
  selector: "lid-member-dialog",
  templateUrl: "./member-dialog.component.html",
  styleUrls: ["./member-dialog.component.scss"]
})
export class MemberDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MemberDialogData) { }

  get photo(): string {
    return `${environment.barrelUrl}${controllers.members.photo(this.data.member.username)}`;
  }
}

export interface MemberDialogData {
  register: string;
  member: Member;
}
