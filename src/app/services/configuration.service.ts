/*
 * OpenLid, the frontend of the Musikverein Leopoldsdorf.
 * Copyright (C) 2023 Richard Stöckl
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
import {HttpClient} from "@angular/common/http";
import {Configuration} from "../common/configuration.model";
import {Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {

  public isLoaded: Subject<void> = new Subject();
  constructor(private http: HttpClient) {
  }

  private _configuration: Configuration = {
    barrelUrl: "",
    executiveRoles: {archive: "", root: ""},
    footer: {address: "", email: "", links: [], phone: ""},
    orchestra: {seats: []},
    passwordResetLink: ""
  };

  get configuration(): Configuration {
    return this._configuration;
  }

  reloadConfiguration(): Observable<Configuration> {
    return this.http.get<Configuration>("/assets/configuration.json").pipe(tap(value => {
      this._configuration = value;
      this.isLoaded.next();
      console.log("Successfully loaded configuration");
    }));
  }

  static initializeConfigurationService(configurationService: ConfigurationService) {
    return () => configurationService.reloadConfiguration();
  }
}
