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

import {Component, Input, OnInit} from '@angular/core';
import {Score} from '../../../common/archive';
import {FormBuilder} from '@angular/forms';
import {FormModel, InferModeNullable} from 'ngx-mf';
import {ArchiveService} from '../../../services/archive.service';
import {Observable, startWith} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'lid-score-editor',
  templateUrl: './score-editor.component.html',
  styleUrls: ['./score-editor.component.scss']
})
export class ScoreEditorComponent implements OnInit {

  genres: string[] = [];
  arrangers: string[] = [];
  composers: string[] = [];
  publishers: string[] = [];
  locations: string[] = [];
  filteredPublishers: Observable<string[]> | undefined;
  filteredLocations: Observable<string[]> | undefined;

  scoreForm = this.formBuilder.nonNullable.group<ScoreForm['controls']>({
    _id: this.formBuilder.control(null),
    _rev: this.formBuilder.control(null),
    alias: this.formBuilder.nonNullable.control([]),
    annotation: this.formBuilder.control(null),
    arrangers: this.formBuilder.nonNullable.control([]),
    back_title: this.formBuilder.control(null),
    composers: this.formBuilder.nonNullable.control([]),
    conductor_score: this.formBuilder.control(true),
    genres: this.formBuilder.nonNullable.control([]),
    grade: this.formBuilder.control(null),
    legacy_ids: this.formBuilder.nonNullable.control([]),
    location: this.formBuilder.control(null),
    pages: this.formBuilder.array<PageForm>([]),
    publisher: this.formBuilder.control(null),
    subtitles: this.formBuilder.nonNullable.control([]),
    title: this.formBuilder.nonNullable.control('')
  });

  constructor(private formBuilder: FormBuilder, private archiveService: ArchiveService) {
  }

  @Input()
  set score(score: Score) {
    this.scoreForm.patchValue(score);
  }

  ngOnInit(): void {
    this.refreshStatistics();
    this.filteredPublishers = this.scoreForm.controls['publisher'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.publishers)),
    );
    this.filteredLocations = this.scoreForm.controls['location'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.locations)),
    );
  }

  private refreshStatistics() {
    this.archiveService.getGenres().subscribe({
      next: data => this.genres = data.rows.map(r => r.key),
      error: console.log
    });
    this.archiveService.getArrangers().subscribe({
      next: data => this.arrangers = data.rows.map(r => r.key),
      error: console.log
    });
    this.archiveService.getComposers().subscribe({
      next: data => this.composers = data.rows.map(r => r.key),
      error: console.log
    });
    this.archiveService.getPublishers().subscribe({
      next: data => this.publishers = data.rows.map(r => r.key),
      error: console.log
    });
    this.archiveService.getLocations().subscribe({
      next: data => this.locations = data.rows.map(r => r.key),
      error: console.log
    });
  }

  private _filter(value: string, collection: string[]): string[] {
    const filterValue = value.toLowerCase();
    return collection.filter(publisher => publisher.toLowerCase().includes(filterValue));
  }
}

type ScoreForm = FormModel<Score, { pages: ['group'] }, InferModeNullable>;
type PageForm = ScoreForm['controls']['pages']['controls'][0];
