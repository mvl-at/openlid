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
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SelfService} from '../services/self.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**
 * Redirect the user to the `/self` page if their executive roles are not sufficient.
 * This guard requires the `roles` field set in the `data` field in the route definitions.
 * This field must be of type {@link string[]}, containing all roles whereas at least one is required.
 */
@Injectable({
  providedIn: 'root'
})
export class ExecutiveRoleGuard implements CanActivate {

  constructor(private selfService: SelfService, private router: Router, private snackBar: MatSnackBar) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const desiredRoles: string[] = route.data['roles'];
    if (desiredRoles.some(r => this.selfService.hasExecutiveRole(r))) {
      return true;
    }
    console.debug('user has not at least one of the required executive roles', desiredRoles);
    this.router.navigateByUrl('/self').then(value => {
        console.debug('user redirection', value);
        this.snackBar.open(`Sie haben nicht eines der notwendigen Rechte: ${desiredRoles.join(', ')}`);
      }
    );
    return false;
  }

}
