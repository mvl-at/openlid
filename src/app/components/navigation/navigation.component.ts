import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'lid-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  navigationItems = defaultItems;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  addChildren(label: string, children: NavigationItem[]) {
    this.navigationItems.filter(i => i.label === label).forEach(item => item.children = children);
  }
}

export const defaultItems: NavigationItem[] = [{label: 'Mitglieder', link: '/members', children: []}]

export interface NavigationItem {
  label: string;
  link?: string;
  fragment?: string;
  children: NavigationItem[];
}
