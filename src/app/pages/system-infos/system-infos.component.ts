import {Component} from "@angular/core";
import {ServerInfoService} from "../../services/server-info.service";
import {ServerInfo} from "../../common/server-info";
import {ConfigurationService} from "../../services/configuration.service";

@Component({
  selector: "lid-system-infos",
  templateUrl: "./system-infos.component.html",
  styleUrls: ["./system-infos.component.scss"]
})
export class SystemInfosComponent {


  serverInfo?: ServerInfo;

  constructor(private serverInfoService: ServerInfoService, private configurationService: ConfigurationService) {
    this.serverInfoService.serverInfo().subscribe(value => this.serverInfo = value);
  }
  protected readonly configuration = this.configurationService.configuration;
}
