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

import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {controllers} from "./controllers";
import {
  CountStatistic,
  CountStatisticSubject,
  DatabaseOperationResponse,
  Pagination,
  Score,
  ScoreFilter,
  SearchResult
} from "../common/archive";
import {ConfigurationService} from "./configuration.service";
import {Configuration} from "../common/configuration.model";

@Injectable({
  providedIn: "root"
})
export class ArchiveService {
  private configuration: Configuration;

  constructor(private httpClient: HttpClient, private configurationService: ConfigurationService) {
    this.configuration = configurationService.configuration;
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
    return this.httpClient.get<Pagination<Score>>(`${this.configuration.barrelUrl}${controllers.archive.scores.root}`, {params: params});
  }

  /**
   * Get the latest score version from the backend.
   * @param id the id of the score
   * @return the outcome of the request
   */
  getScore(id: string): Observable<Score> {
    return this.httpClient.get<Score>(`${this.configuration.barrelUrl}${controllers.archive.scores.root}/${id}`);
  }

  /**
   * Store a score in the database. It is not relevant in this case whether it is a new or an existing one.
   * Both actions only differ whether {@link Score._id} and {@link Score._rev} are set or not.
   * If it is the case, a new revision of the score will be stored.
   * Keep in mind that faulty id (combinations) will lead to errors.
   * @param score the score to persist
   * @return the outcome of the request
   */
  putScore(score: Score): Observable<DatabaseOperationResponse> {
    return this.httpClient.put<DatabaseOperationResponse>(`${this.configuration.barrelUrl}${controllers.archive.scores.root}`, score);
  }

  /**
   * Delete a score from the database.
   * If the revision is not the latest, this operation will fail.
   * @param id the id of the score
   * @param rev the revision of the score to delete
   */
  deleteScore(id: string, rev: string): Observable<void> {
    const params = new HttpParams().set("rev", rev);
    return this.httpClient.delete<void>(`${this.configuration.barrelUrl}${controllers.archive.scores.root}/${id}`, {params: params});
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
    params = params.set("limit", limit);
    if (bookmark) {
      params = params.set("bookmark", bookmark);
    }
    if (filter.searchTerm) {
      params = params.set("search_term", filter.searchTerm);
    }
    params = params.set("regex", filter.regex);
    filter.attributes.forEach(a => {params = params.append("attributes", a)});
    if (filter.book) {
      params = params.set("book", filter.book);
    }
    if (filter.location) {
      params = params.set("location", filter.location);
    }
    if (filter.sort) {
      params = params.set("sort", filter.sort);
    }
    if (filter.ascending) {
      params = params.set("ascending", filter.ascending);
    }
    return this.httpClient.get<SearchResult<Score>>(`${this.configuration.barrelUrl}${controllers.archive.scores.searches()}`, {params: params});
  }

  /**
   * Fetch all the genres of the database with the counts of how much they are being used.
   */
  getBooks(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Books);
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
   * Fetch all the locations of the database with the counts of how much they are being used.
   */
  getLocations(): Observable<CountStatistic> {
    return this.getCountStatistics(CountStatisticSubject.Locations);
  }

  /**
   * Fetch the count statistics for the given subject.
   * @param subject the subject whose statistic should be retrieved
   * @private
   */
  private getCountStatistics(subject: CountStatisticSubject): Observable<CountStatistic> {
    const params = {subject: subject.toString()};
    return this.httpClient.get<CountStatistic>(`${this.configuration.barrelUrl}${controllers.archive.statistics.counts()}`, {params: params});
  }
}
