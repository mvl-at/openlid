/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2021-2022  Richard Stöckl
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

import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {controllers} from './controllers';
import {CountStatistic, CountStatisticSubject, Pagination, Score, ScoreFilter, SearchResult} from '../common/archive';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Fetches all available scores from the archive database.
   * This call supports pagination.
   *
   * @param limit the maximum amount of records being returned
   * @param skip the page offset, starts with `0`
   * @return the [Observable] of all the paginates rows of scores
   */
  getAllScoresPaginated(limit: number, skip: number): Observable<Pagination<Score>> {
    const params = {limit: limit, skip: skip};
    return this.httpClient.get<Pagination<Score>>(`${environment.barrelUrl}${controllers.archive.scores.root}`, {params: params});
  }

  /**
   * Search for all scores with the given filter.
   * For pagination see the upstream API doc.
   * @param filter the filter to use for the search
   * @param limit the limit of the search results
   * @param bookmark the bookmark used for pagination
   */
  searchScore(filter: ScoreFilter, limit: number, bookmark: string | null): Observable<SearchResult<Score>> {
    let params = new HttpParams();
    params = params.set('limit', limit);
    if (bookmark) {
      params = params.set('bookmark', bookmark);
    }
    if (filter.searchTerm) {
      params = params.set('search_term', filter.searchTerm);
    }
    params = params.set('regex', filter.regex);
    filter.attributes.forEach(a => {params = params.append('attributes', a)});
    if (filter.book) {
      params = params.set('book', filter.book);
    }
    if (filter.location) {
      params = params.set('location', filter.location);
    }
    if (filter.sort) {
      params = params.set('sort', filter.sort);
    }
    if (filter.ascending) {
      params = params.set('ascending', filter.ascending);
    }
    return this.httpClient.get<SearchResult<Score>>(`${environment.barrelUrl}${controllers.archive.scores.searches()}`, {params: params});
  }

  /**
   * Fetch all the genres of the database with the counts of how much they are being used.
   */
  getGenres(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Genres);
  }

  /**
   * Fetch all the composers of the database with the counts of how much they are being used.
   */
  getComposers(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Composers);
  }

  /**
   * Fetch all the arrangers of the database with the counts of how much they are being used.
   */
  getArrangers(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Arrangers);
  }

  /**
   * Fetch all the publisher of the database with the counts of how much they are being used.
   */
  getPublishers(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Publishers);
  }

  /**
   * Fetch the count statistics for the given subject.
   * @param subject the subject whose statistic should be retrieved
   * @private
   */
  private getCountStatistics(subject: CountStatisticSubject): Observable<CountStatistic> {
    const params = {subject: subject.toString()};
    return this.httpClient.get<CountStatistic>(`${environment.barrelUrl}${controllers.archive.statistics.counts()}`, {params: params});
  }
}
