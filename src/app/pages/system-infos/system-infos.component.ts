import {Component} from "@angular/core";
import {environment} from "../../../environments/environment";

@Component({
  selector: "lid-system-infos",
  templateUrl: "./system-infos.component.html",
  styleUrls: ["./system-infos.component.scss"]
})
export class SystemInfosComponent {

  protected readonly environment = environment;
}
