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

import {Component, OnInit, ViewChild} from '@angular/core';
import {Score} from '../../../../common/archive';
import {ScoreEditorComponent} from '../../../../components/archive/score-editor/score-editor.component';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  ScoreModificationDialogComponent
} from '../../../../dialogs/score-modification-dialog/score-modification-dialog.component';
import {ArchiveService} from '../../../../services/archive.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorSnackBarService} from '../../../../mat-helpers/http-error-snack-bar.service';

@Component({
  selector: 'lid-score-creator',
  templateUrl: './score-creator.component.html',
  styleUrls: ['./score-creator.component.scss']
})
export class ScoreCreatorComponent implements OnInit {

  @ViewChild(ScoreEditorComponent) scoreEditor?: ScoreEditorComponent;

  readonly defaultScore: Score = {
    _id: null,
    _rev: null,
    alias: [],
    annotation: null,
    arrangers: [],
    back_title: null,
    composers: [],
    conductor_score: false,
    genres: [],
    grade: null,
    legacy_ids: [],
    location: null,
    pages: [],
    publisher: null,
    subtitles: [],
    title: ''
  };

  constructor(private location: Location, private dialog: MatDialog, private archiveService: ArchiveService, private snackBar: MatSnackBar, private snackBarErrorHandler: HttpErrorSnackBarService) {
  }

  ngOnInit(): void {
  }

  cancel(event: MouseEvent) {
    console.debug('navigate back with', event);
    if (this.scoreEditor?.scoreForm?.untouched) {
      this.location.back();
      return;
    }
    const dialogRef = this.dialog.open(ScoreModificationDialogComponent, {
      data: {score: this.scoreEditor?.scoreForm?.getRawValue(), mode: 'cancel'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.debug(`the dialog was closed: ${result}`);
      if (result) {
        this.location.back();
      }
    });
  }

  createScore() {
    const score = this.scoreEditor?.scoreForm.getRawValue();
    if (!score) {
      console.error('unable to retrieve score from presumably valid form');
      return;
    }
    this.archiveService.putScore(score as Score).subscribe({
      next: value => {
        console.log('created score', value);
        this.location.back();
        this.snackBar.open(`Stück "${score.title}" erfolgreich eingetragen`);
      }, error: err => {
        console.error('unable to persist score', err);
        this.snackBarErrorHandler.showError(err);
      }
    });
  }
}
