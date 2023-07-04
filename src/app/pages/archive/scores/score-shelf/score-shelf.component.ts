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

import {Component, ViewChild} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {ScoresDataSource} from "../../scores-data-source";
import {MatPaginator} from "@angular/material/paginator";
import {ArchiveService} from "../../../../services/archive.service";
import {CountStatistic, Page, PageNumber, ScoreFilter} from "../../../../common/archive";
import {FormModel, InferModeFromModel} from "ngx-mf";
import {Sort} from "@angular/material/sort";

@Component({
  selector: "lid-score-shelf",
  templateUrl: "./score-shelf.component.html",
  styleUrls: ["./score-shelf.component.scss"]
})
export class ScoreShelfComponent {

  attributeList = [{name: "Titel", value: "title"}, {name: "Untertitel", value: "subtitles"}, {
    name: "Komponisten", value: "composers"
  }, {name: "Arrangeure", value: "arrangers"}, {name: "Verlag", value: "publisher"}, {
    name: "Aufbewahrung", value: "location"
  }, {name: "Seiten", value: "pages"}];

  attributes = new FormControl(this.attributeList);
  inProgress = false;

  filterAttributes = [{name: "Titel", value: "title"}, {name: "Alias", value: "alias"}, {name: "Untertitel", value: "subtitles"}, {name: "Genres", value: "genres"}, {
    name: "Komponisten", value: "composers"
  }, {name: "Arrangeure", value: "arrangers"}, {name: "Verlag", value: "publisher"}];

  scoreFilterForm = this.formBuilder.nonNullable.group<ScoreFilterForm["controls"]>({
    searchTerm: this.formBuilder.control(null),
    regex: this.formBuilder.nonNullable.control(false),
    attributes: this.formBuilder.nonNullable.control(this.filterAttributes.map(a => a.value)),
    book: this.formBuilder.control(null),
    location: this.formBuilder.control(null),
    sort: this.formBuilder.control(null),
    ascending: this.formBuilder.control(null)
  });

  // fields for the pagination
  pageSizes = [10, 20, 30, 50, 100];
  limit = 20;

  readonly scoresDataSource: ScoresDataSource;

  @ViewChild(MatPaginator)
  private paginator?: MatPaginator;
  booksStatistics: CountStatistic = {rows: []};
  locationsStatistics: CountStatistic = {rows: []};

  constructor(private archiveService: ArchiveService, private formBuilder: FormBuilder) {
    this.scoresDataSource = new ScoresDataSource(archiveService);
    this.scoresDataSource.loadingSubject.subscribe({next: value => this.inProgress = value});
    this.archiveService.getBooks().subscribe({next: value => this.booksStatistics = value});
    this.archiveService.getLocations().subscribe({next: value => this.locationsStatistics = value});
    this.scoreFilterForm.valueChanges.subscribe({next: () => this.refreshScores()});
    this.refreshScores();
  }

  get scores() {
    return this.scoresDataSource;
  }

  get selectedValues() {
    return (this.attributes.value?.map(e => e.value) ?? []).concat("actions");
  }

  private static pageNumberToString(pageNumber: PageNumber) {
    return `${pageNumber.prefix ?? ""}${pageNumber.number}${pageNumber.suffix ?? ""}`;
  }

  changePage() {
    this.refreshScores();
  }

  pageToString(page: Page) {
    const begin = ScoreShelfComponent.pageNumberToString(page.begin);
    if (page.end) {
      return `${page.book} ${begin}-${ScoreShelfComponent.pageNumberToString(page.end)}`;
    } else {
      return `${page.book} ${begin}`;
    }
  }

  private refreshScores() {
    this.scoresDataSource.loadScores(this.paginator?.pageIndex ?? 0, this.paginator?.pageSize ?? this.limit, this.scoreFilterForm.getRawValue());
  }

  announceSortChange(sortEvent: Sort) {
    this.scoreFilterForm.controls.sort.setValue(sortEvent.direction !== ""? sortEvent.active:null);
    this.scoreFilterForm.controls.ascending.setValue(sortEvent.direction === "asc");
  }
}

type ScoreFilterForm = FormModel<ScoreFilter, object, InferModeFromModel>;
