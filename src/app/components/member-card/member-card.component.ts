import {Component, Input} from "@angular/core";
import {Member} from "../../common/member";
import {controllers} from "../../services/controllers";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: "lid-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.scss"]
})
export class MemberCardComponent {

  @Input()
  member!: Member;

  constructor(private configurationService: ConfigurationService) {
  }

  get photo(): string {
    return `${this.configurationService.configuration.barrelUrl}${controllers.members.photo(this.member.username)}`;
  }

}
