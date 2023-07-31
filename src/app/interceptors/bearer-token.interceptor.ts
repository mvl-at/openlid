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
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {SelfService} from "../services/self.service";
import {controllers} from "../services/controllers";
import {ConfigurationService} from "../services/configuration.service";
import {Configuration} from "../common/configuration.model";

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private configuration: Configuration;

  constructor(private selfService: SelfService, private configurationService: ConfigurationService) {
    this.configuration = configurationService.configuration;
  }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.debug("intercept bearer token");
    const token = this.selfService.token;
    const isApiUrl = request.url.startsWith(this.configuration.barrelUrl);
    const isRenewalUrl = request.url.toLowerCase() === `${this.configuration.barrelUrl}${controllers.self.refresh()}`;

    if (isRenewalUrl) {
      console.debug("skip bearer interceptor on token renewal");
      return next.handle(request);
    }

    if (isApiUrl && token) {
      request = this.addToken(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        console.debug("catch bearer error", error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleTokenError(request, next);
        } else {
          return throwError(error);
        }
      }));
  }

  /**
   * Add a token to the authorization header with a bearer prefix.
   * @param request the request to attach the token to
   * @param token the token to attach
   * @private
   */
  private addToken(request: HttpRequest<object>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * Handle any error regarding the token such as expiration.
   * This will try to request a new token and retry the original request.
   * @param request the request to retry
   * @param next the handler to use to pass the next request to
   * @private
   */
  private handleTokenError(request: HttpRequest<object>, next: HttpHandler) {
    console.debug("handleTokenError");
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      console.debug("begin to refresh token");
      return this.selfService.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          console.debug("handle refresh next", token, this.selfService.token);
          const clonedRequest = token && this.selfService.token ? this.addToken(request, this.selfService.token) : request;
          return next.handle(clonedRequest);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
