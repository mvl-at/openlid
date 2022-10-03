/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2021  Richard Stöckl
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {SelfService} from '../../services/self.service';
import {environment} from '../../../environments/environment';
import {controllers} from '../../services/controllers';

@Component({
  selector: 'lid-navigation', templateUrl: './navigation.component.html', styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  navigationItems = defaultItems;
  isExtraScreenSmall: Observable<boolean>;
  isScreenSmall: Observable<boolean>;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  get photo(): string {
    return `${environment.barrelUrl}${controllers.members.photo(this.selfService?.user?.username? this.selfService?.user?.username : '')}`;
  }

  constructor(private breakpointObserver: BreakpointObserver, public selfService: SelfService) {
    this.isExtraScreenSmall = breakpointObserver.observe(Breakpoints.XSmall)
      .pipe(map(breakpoint => breakpoint.matches));
    this.isScreenSmall = breakpointObserver.observe(Breakpoints.Small)
      .pipe(map(breakpoint => breakpoint.matches));
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

export const defaultItems: NavigationItem[] = [{label: 'Startseite', link: ['/'], children: []}, {
  label: 'Mitglieder',
  link: ['/members'],
  children: []
}, {
  label: 'Archiv', link: ['/archive'], children: []
}];

export interface NavigationItem {
  label: string;
  link?: string[];
  fragment?: string;
  children: NavigationItem[];
  scroll?: boolean;
}
