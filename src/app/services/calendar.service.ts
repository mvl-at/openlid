import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Calendar, CalendarType} from "../common/calendar";
import {controllers} from "./controllers";
import {ConfigurationService} from "./configuration.service";

@Injectable({
  providedIn: "root"
})
export class CalendarService {

  constructor(private httpClient: HttpClient, private configurationService: ConfigurationService) {
  }

  allEvents(type: CalendarType): Observable<Calendar> {
    return this.httpClient.get<Calendar>(`${this.configurationService.configuration.barrelUrl}${controllers.calendar.root}`, {params: {cal_type: type}});
  }
}
