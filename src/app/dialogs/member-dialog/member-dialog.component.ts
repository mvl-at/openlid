import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Member} from "../../common/member";
import {controllers} from "../../services/controllers";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: "lid-member-dialog",
  templateUrl: "./member-dialog.component.html",
  styleUrls: ["./member-dialog.component.scss"]
})
export class MemberDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MemberDialogData, private configurationService: ConfigurationService) { }

  get photo(): string {
    return `${this.configurationService.configuration.barrelUrl}${controllers.members.photo(this.data.member.username)}`;
  }
}

export interface MemberDialogData {
  register: string;
  member: Member;
}
