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

  scroll(id: string) {
    const target = document.getElementById(id);
    target?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isScrollItem(item: NavigationItem): boolean {
    return item.scroll === true && item.fragment !== undefined;
  }

  isNotScrollItem(item: NavigationItem): boolean {
    return item.scroll !== true || item.fragment === undefined;
  }
}

export const defaultItems: NavigationItem[] = [{label: 'Mitglieder', link: ['/members'], children: []}]

export interface NavigationItem {
  label: string;
  link?: string[];
  fragment?: string;
  children: NavigationItem[];
  scroll?: boolean;
}
