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

import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from '../../../services/document.service';

@Component({
  selector: 'lid-blackboard-item',
  templateUrl: './blackboard-item.component.html',
  styleUrls: ['./blackboard-item.component.scss']
})
export class BlackboardItemComponent implements OnInit {

  @Input() filename: string = '';

  constructor(private documentService: DocumentService) {
  }

  private _content: string = '';

  get content() {
    return this._content;
  }

  ngOnInit(): void {
    this.documentService.getBlackBoardDocument(this.filename).subscribe({
      next: value => this._content = value,
      error: console.error
    });
  }

}
