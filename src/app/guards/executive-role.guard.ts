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

import {inject} from "@angular/core";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {SelfService} from "../services/self.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfigurationService} from "../services/configuration.service";
import {Configuration} from "../common/configuration.model";

/**
 * Redirect the user to the `/self` page if their executive roles are not sufficient.
 * This guard requires the `roles` field set in the `data` field in the route definitions.
 * This field must be of type {@link string[]}, containing all roles whereas at least one is required.
 */

export const executiveRoleGuard = (route: ActivatedRouteSnapshot, rolesFunction: (configuration: Configuration) => string[]) => {
  const selfService = inject(SelfService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const configurationService = inject(ConfigurationService);
  const desiredRoles: string[] = rolesFunction(configurationService.configuration);
  if (desiredRoles.some(r => selfService.hasExecutiveRole(r))) {
    return true;
  }
  console.debug("user has not at least one of the required executive roles", desiredRoles);
  router.navigateByUrl("/self").then(value => {
      console.debug("user redirection", value);
      snackBar.open(`Sie haben nicht eines der notwendigen Rechte: ${desiredRoles.join(", ")}`);
    }
  );
    return false;
  }

export const archiveRoleGuard = (route: ActivatedRouteSnapshot) => {
  return executiveRoleGuard(route, configuration => [configuration.executiveRoles.archive])
}
