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
import {Member} from '../common/member';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

const TOKEN_KEY = 'request_token';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  private _user?: Member = undefined;

  /**
   * Get the user which is currently logged in.
   */
  get user() {
    return this._user;
  }

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
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
      this._user = undefined;
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Create the initializer function which initializes the {@link SelfService} from persisted information such as the token.
   * @param selfService
   */
  static initializeSelfService(selfService: SelfService) {
    return () => {
      if (selfService.token) {
        selfService.refreshUserInfo();
      }
    };
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
        this.refreshUserInfo();
      }
      return response;
    }));
  }

  /**
   * Perform the user logout.
   * This will wipe the token and the user information.
   * After success, it redirects to the root and displays a message.
   */
  logout() {
    this.token = null;
    this.router.navigateByUrl('/').then(() => this.snackBar.open('Sie sind nun abgemeldet'));
  }

  /**
   * Retrieve the member infos of the currently logged-in user.
   */
  info() {
    return this.httpClient.get<Member>(`${environment.barrelUrl}${controllers.self.info()}`);
  }

  private refreshUserInfo() {
    this.info().subscribe({
      next: value => {
        console.debug('retrieved user info', value);
        this._user = value;
      }
    });
  }
}
