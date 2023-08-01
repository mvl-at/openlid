import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Crew} from "../common/member";
import {controllers} from "./controllers";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: "root"
})
export class MemberService {

  constructor(private httpClient: HttpClient, private configurationService: ConfigurationService) {
  }

  getAllByRegisters(): Observable<Crew> {
    return this.httpClient.get<Crew>(`${this.configurationService.configuration.barrelUrl}${controllers.members.root}`);
  }
}
