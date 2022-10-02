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

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Login} from '../common/login';
import {environment} from '../../environments/environment';
import {controllers} from './controllers';
import {map} from 'rxjs/operators';

const TOKEN_KEY = 'request_token';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * The token used to authorize against the API.
   * Read from the local storage.
   */
  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Set a new API token in the local storage.
   * If null, it will be removed from the local storage.
   * @param token the new token
   */
  set token(token: string | null) {
    if (!token) {
      localStorage.removeItem(TOKEN_KEY);
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Perform a login against the API using HTTP basic auth.
   * @param credentials the credentials to login
   */
  login(credentials: Login) {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain', 'Authorization': 'Basic ' + btoa(`${credentials.username}:${credentials.password}`)
    });
    return this.httpClient.post(`${environment.barrelUrl}${controllers.self.auth()}`, '', {
      headers: headers,
      observe: 'response'
    }).pipe(map(response => {
      if (response.ok) {
        console.log('login was successful, store token');
        this.token = response.headers.get('authorization');
      }
      return response;
    }));
  }
}
