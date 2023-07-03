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
import {map, tap} from 'rxjs/operators';
import {Group, Member} from '../common/member';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, of} from 'rxjs';

const TOKEN_KEY = 'request_token';
const RENEWAL_TOKEN_KEY = 'renewal_token';
const LAST_ROLES = 'last_roles';

const AUTHORIZATION_HEADER = 'authorization';
const AUTHORIZATION_RENEWAL_HEADER = 'x-authorization-renewal';

@Injectable({
  providedIn: 'root'
})
export class SelfService {

  private _user?: Member = undefined;

  constructor(private httpClient: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  /**
   * Get the user which is currently logged in.
   */
  get user() {
    return this._user;
  }

  private _executives: Group[] = [];

  /**
   * Get the executive roles of the user which is currently logged in.
   */
  get executives() {
    return this._executives;
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
      this._executives = [];
      return;
    }
    localStorage.setItem(TOKEN_KEY, this.removeBearerPrefix(token));
  }

  get renewalToken(): string | null {
    return localStorage.getItem(RENEWAL_TOKEN_KEY);
  }

  set renewalToken(token: string | null) {
    if (!token) {
      localStorage.removeItem(RENEWAL_TOKEN_KEY);
      return;
    }
    localStorage.setItem(RENEWAL_TOKEN_KEY, this.removeBearerPrefix(token));
  }

  /**
   * Check whether the currently logged-in user is part of the provided executive role or not.
   * @param role the role which the user should belong to
   */
  hasExecutiveRole(role: string) {
    return this._executives.some(g => g.name === role);
  }

  /**
   * Create the initializer function which initializes the {@link SelfService} from persisted information such as the token.
   * @param selfService
   */
  static initializeSelfService(selfService: SelfService) {
    return () => {
      if (selfService.token) {
        selfService.refreshUserInfo();
        const lastRoles = localStorage.getItem(LAST_ROLES);
        if (lastRoles) {
          selfService._executives = JSON.parse(lastRoles);
        }
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
        this.token = response.headers.get(AUTHORIZATION_HEADER);
        if (credentials.persist) {
          console.log('user decided to remain logged-in, store renewal token');
          this.renewalToken = response.headers.get(AUTHORIZATION_RENEWAL_HEADER);
        }
        this.refreshUserInfo();
      }
      return response;
    }));
  }

  /**
   * Refresh the (expired) request token with the usage of the refresh token.
   * If it is not available, the observer will do nothing.
   * If something goes wrong during the refresh, the user will be logged out.
   */
  refreshToken() {
    if (!this.renewalToken) {
      console.log('there is not refresh token');
      return of(false);
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.renewalToken}`
    });
    return this.httpClient
      .post<object>(`${environment.barrelUrl}${controllers.self.refresh()}`, '', {headers: headers, observe: 'response'})
      .pipe(
        tap((response) => {
          console.debug('retrieved the new token');
          this.token = response.headers.get(AUTHORIZATION_HEADER);
          this.refreshUserInfo();
        }),
        catchError((error) => {
          console.log('error during token renewal', error);
          this.logout();
          return of(false);
        })
      );
  }

  /**
   * Perform the user logout.
   * This will wipe the token and the user information.
   * After success, it redirects to the root and displays a message.
   */
  logout() {
    this.token = null;
    this.renewalToken = null;
    this.setExecutives([]);
    this.router.navigateByUrl('/').then(() => this.snackBar.open('Sie sind nun abgemeldet'));
  }

  /**
   * Retrieve the member infos of the currently logged-in user.
   */
  info() {
    return this.httpClient.get<Member>(`${environment.barrelUrl}${controllers.self.info()}`);
  }

  /**
   * Retrieve all the executive roles of the currently logged-in user.
   */
  executiveRoles() {
    return this.httpClient.get<Group[]>(`${environment.barrelUrl}${controllers.self.executiveRoles()}`);
  }

  private refreshUserInfo() {
    this.info().subscribe({
      next: value => {
        console.debug('retrieved user info', value);
        this._user = value;
      }
    });
    this.executiveRoles().subscribe({
      next: value => {
        console.debug('retrieved executive roles', value);
        this.setExecutives(value);
      }
    });
  }

  /**
   * Set the new executive roles amd update the local storage.
   * @param executives the new executive roles, if `[]` it will be removed from the local storage
   * @private
   */
  private setExecutives(executives: Group[]) {
    this._executives = executives;
    if (executives.length === 0) {
      localStorage.removeItem(LAST_ROLES);
    } else {
      localStorage.setItem(LAST_ROLES, JSON.stringify(executives));
    }
  }

  /**
   * Remove the bearer prefix from the token if available.
   * Otherwise, the token itself will be returned.
   * This does not manipulate the passed token but returns a copy instead.
   * @param token the token to remove the bearer
   * @private
   */
  private removeBearerPrefix(token: string): string {
    return token.replace(/^([Bb])earer( )*/, '');
  }
}
