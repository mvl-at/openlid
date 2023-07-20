import {Component} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ServerInfoService} from "../../services/server-info.service";
import {ServerInfo} from "../../common/server-info";

@Component({
  selector: "lid-system-infos",
  templateUrl: "./system-infos.component.html",
  styleUrls: ["./system-infos.component.scss"]
})
export class SystemInfosComponent {


  serverInfo?: ServerInfo;

  constructor(private serverInfoService: ServerInfoService) {
    this.serverInfoService.serverInfo().subscribe(value => this.serverInfo = value);
  }
  protected readonly environment = environment;
}
