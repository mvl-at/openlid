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

import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {controllers} from "./controllers";
import {ConfigurationService} from "./configuration.service";
import {Configuration} from "../common/configuration.model";

@Injectable({
  providedIn: "root"
})
export class DocumentService {

  private configuration: Configuration;
  constructor(private httpClient: HttpClient, private configurationService: ConfigurationService) {
    this.configuration = configurationService.configuration;
  }

  /**
   * Get a list of all documents which are part of the blackboard.
   * The list contains relative path names which are required to request the specific document content.
   */
  getBlackboardDocuments(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.configuration.barrelUrl}${controllers.documents.blackboard.root()}`);
  }

  /**
   * Get the content of a document of the blackboard.
   * The document is desired to be in the Markdown format.
   * @param name the filename of the blackboard document
   */
  getBlackBoardDocument(name: string): Observable<string> {
    const headers = new HttpHeaders({"Accept": "text/markdown"});
    return this.httpClient.get(`${this.configuration.barrelUrl}${controllers.documents.blackboard.document(name)}`, {headers: headers, responseType: "text"});
  }
}
