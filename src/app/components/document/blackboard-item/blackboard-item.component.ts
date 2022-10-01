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
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs';
import {controllers} from '../../../services/controllers';

@Component({
  selector: 'lid-blackboard-item',
  templateUrl: './blackboard-item.component.html',
  styleUrls: ['./blackboard-item.component.scss']
})
export class BlackboardItemComponent implements OnInit {

  @Input() filename: string = '';

  constructor(private documentService: DocumentService) {
  }

  private _isLoading: boolean = true;

  get isLoading() {
    return this._isLoading;
  }

  private _content: string = '';

  get content() {
    return this._content;
  }

  /**
   * Replace all attachment urls within a markdown content string and return a copy.
   * The urls must be in the following format: `![image description](.attachments.id/filename)` where `image description` and `id` are arbitrary strings and `filename` is the filename of the file to request.
   *
   * @param markdownContent the markdown content string - will not be changed
   * @private
   */
  private static replaceAttachmentUrls(markdownContent: string): string {
    console.debug('replaceAttachmentUrls');
    const attachmentRegex = /!\[.*]\(\.attachments\..*\/.*\)/;
    const urlPartPrefix = '](.attachments.';
    let workingContent = markdownContent.toString();
    let searchIndex;
    while ((searchIndex = workingContent.search(attachmentRegex)) != -1) {
      const fileIdBeginIndex = workingContent.indexOf(urlPartPrefix, searchIndex) + urlPartPrefix.length;
      console.debug('fileIdBeginIndex', searchIndex);
      const documentFileCombination = workingContent.substring(fileIdBeginIndex, workingContent.indexOf(')', fileIdBeginIndex)).split('/');
      const newUrl = controllers.documents.blackboard.image(documentFileCombination[1]);
      console.debug('new url', newUrl);
      workingContent = workingContent.replace(/\(.*\)/, `(${environment.barrelUrl}${newUrl})`);
    }
    return workingContent;
  }

  ngOnInit(): void {
    this.documentService.getBlackBoardDocument(this.filename).pipe(map(BlackboardItemComponent.replaceAttachmentUrls)).subscribe({
      next: value => this._content = value,
      error: console.error,
      complete: () => this._isLoading = false,
    });
  }
}
