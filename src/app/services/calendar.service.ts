import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Calendar, CalendarType} from '../common/calendar';
import {environment} from '../../environments/environment';
import {controllers} from './controllers';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private httpClient: HttpClient) {
  }

  allEvents(type: CalendarType): Observable<Calendar> {
    return this.httpClient.get<Calendar>(`${environment.barrelUrl}${controllers.calendar.root}`, {params: {cal_type: type}});
  }
}
