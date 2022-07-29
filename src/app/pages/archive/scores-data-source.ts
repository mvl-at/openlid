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

import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {isEmpty, Score, ScoreFilter} from '../../common/archive';
import {BehaviorSubject, catchError, finalize, Observable, of} from 'rxjs';
import {ArchiveService} from '../../services/archive.service';

export class ScoresDataSource implements DataSource<Score> {

  private scoresSubject = new BehaviorSubject<Score[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  // `true` if the last request by `this.logScores(...)` was requested with an empty filter
  private isEmpty: boolean = true;

  private lastFilter: ScoreFilter | undefined = undefined;
  private lastLimit: number = 0;

  // begin empty filter attributes
  private totalRows: number = 1;
  // end empty filter attributes

  // begin non-empty filter attributes
  private lastResultSize: number = 0;
  private foundResults: number = 1;
  private bookmarks: Map<number, string> = new Map();

  // begin non-empty filter attributes

  constructor(private archiveService: ArchiveService) {
  }

  get totalAmount(): number {
    if (this.isEmpty) {
      return this.totalRows;
    } else {
      return this.foundResults;
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<Score[]> {
    return this.scoresSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.scoresSubject.complete();
    this.loadingSubject.complete();
  }

  loadScores(index: number, limit: number, filter: ScoreFilter) {
    this.loadingSubject.next(true);
    this.isEmpty = isEmpty(filter);
    this.lastLimit = limit;
    console.debug('old and new filter', this.lastFilter, filter);
    if (JSON.stringify(filter) !== JSON.stringify(this.lastFilter)) {
      console.log('clear bookmarks');
      this.bookmarks.clear();
      this.totalRows = 0;
      this.foundResults = 1;
    }
    this.lastFilter = filter;
    if (this.isEmpty) {
      this.loadAllScores(index, limit);
    } else {
      this.loadScoresFromSearch(index, limit, filter);
    }
  }

  private loadAllScores(index: number, limit: number) {
    this.archiveService.getAllScoresPaginated(limit, index * limit).pipe(catchError(() => of({
      rows: [], total_rows: 0, offset: 0
    }))).subscribe({
      next: data => {
        this.scoresSubject.next(data.rows.map(r => r.doc));
        this.totalRows = data.total_rows;
      },
    });
  }

  private loadScoresFromSearch(index: number, limit: number, filter: ScoreFilter) {
    let bookmark = this.bookmarks.get(index) || null;
    console.debug('current bookmarks', index, this.bookmarks);
    this.archiveService.searchScore(filter, limit, bookmark).pipe(catchError(() => of({
      docs: [], bookmark: ''
    })), finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: data => {
          this.scoresSubject.next(data.docs);
          console.debug('store bookmark', index + 1, data.bookmark);
          if (!this.bookmarks.has(index + 1)) {
            this.foundResults += data.docs.length;
            if (this.lastResultSize > data.docs.length) {
              this.foundResults -= 1;
            }
          }
          this.bookmarks.set(index + 1, data.bookmark);
          this.lastResultSize = data.docs.length;
        }
      });
  }
}
