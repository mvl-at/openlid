/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2022  Richard Stöckl
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

import {Component, OnInit} from '@angular/core';
import {SelfService} from '../../services/self.service';

@Component({
  selector: 'lid-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.scss']
})
export class SelfComponent implements OnInit {
  panelOpenState: boolean = false;

  constructor(private selfService: SelfService) {
  }

  get selfInfo() {
    return this.selfService.user;
  }

  get details() {
    return this.selfInfo?.sensitives;
  }

  get executiveRoles() {
    return this.selfService.executives;
  }


  ngOnInit(): void {
  }

}
