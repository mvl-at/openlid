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
import {Router} from "@angular/router";
import {SelfService} from "../services/self.service";

/**
 * Redirect the user to `/login` if they are not authenticated.
 */

export const authenticationGuard = () => {
  const selfService = inject(SelfService);
  const router = inject(Router);
  const isLoggedIn = selfService.token !== undefined && selfService.token !== null;
  if (isLoggedIn) {
    return true;
  }
  router.navigateByUrl("/login").then(() => console.debug("tried to reach page which requires authentication, redirected to login"));
  return false;
};

