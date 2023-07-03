import {Component} from '@angular/core';
import {CalendarService} from '../../services/calendar.service';
import {Calendar, CalendarType, eventStart} from '../../common/calendar';

@Component({
  selector: 'lid-calendar', templateUrl: './calendar.component.html', styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  calendar: Calendar = [];
  displayedColumns = ['summary', 'dtstart', 'location'];
  eventsLoadingDone = false;
  dateDisplayOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
  };
  protected readonly eventStart = eventStart;

  constructor(private calendarService: CalendarService) {
    calendarService.allEvents(CalendarType.PUBLIC).subscribe({
      next: value => {
        console.debug('received calendar', value);
        this.calendar = value.filter(e => {
          const start = eventStart(e);
          return !start || start >= new Date();
        });
        this.eventsLoadingDone = true;
      }, error: err => {this.eventsLoadingDone = true}
    });
  }

  dateFormat(date: Date | null) {
    if (!date) {
      return null;
    }
    return date.toLocaleString(undefined, this.dateDisplayOption);
  }
}
