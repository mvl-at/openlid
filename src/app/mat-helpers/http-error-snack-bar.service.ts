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
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';

export interface StatusMessages {
  [key: number]: string;
}

const DEFAULT_MESSAGES: StatusMessages = {
  400: 'Die Anfrage war ungültig, vermutlich sind Daten falsch eingegeben worden',
  403: 'Die Anfrage ist für Sie nicht erlaubt',
  404: 'Die angefragte Resource kann nicht gefunden werden',
  500: 'Der Server scheint Probleme zu haben, bitte probieren Sie es später',
  0: 'Der Server kann zurzeit nicht erreicht werden, bitte probieren Sie es später'
};

@Injectable({
  providedIn: 'root'
})
export class HttpErrorSnackBarService {

  constructor(private snackBar: MatSnackBar) {
  }

  showError(err: HttpErrorResponse, statusMessages?: StatusMessages) {
    let messages: StatusMessages = {};
    for (let statusCode in DEFAULT_MESSAGES) {
      messages[statusCode] = DEFAULT_MESSAGES[statusCode];
    }
    if (statusMessages) {
      for (let statusCode in statusMessages) {
        messages[statusCode] = statusMessages[statusCode];
      }
    }
    if (messages.hasOwnProperty(err.status)) {
      this.snackBar.open(messages[err.status], 'schade', {duration: 0});
    }
  }
}
