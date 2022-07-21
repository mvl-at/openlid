/*
 * Lid, the frontend of the Musikverein Leopoldsdorf.
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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {controllers} from './controllers';
import {Pagination, Score} from '../common/archive';

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
    return this.httpClient.get<Pagination<Score>>(`${environment.barrelUrl}${controllers.archive.all()}`, {params: params});
  }
}
