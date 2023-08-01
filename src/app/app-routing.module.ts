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

import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {MembersComponent} from "./pages/members/members.component";
import {ArchiveComponent} from "./pages/archive/archive.component";
import {BlackboardComponent} from "./pages/blackboard/blackboard.component";
import {LoginComponent} from "./pages/login/login.component";
import {SelfComponent} from "./pages/self/self.component";
import {authenticationGuard} from "./guards/authentication.guard.service";
import {archiveRoleGuard} from "./guards/executive-role.guard";
import {ScoreShelfComponent} from "./pages/archive/scores/score-shelf/score-shelf.component";
import {ScoreCreatorComponent} from "./pages/archive/scores/score-creator/score-creator.component";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {SystemInfosComponent} from "./pages/system-infos/system-infos.component";

const routes: Routes = [
  {path: "", component: BlackboardComponent},
  {path: "menu", component: NavigationComponent},
  {path: "members", component: MembersComponent},
  {path: "events", component: CalendarComponent},
  {
    path: "archive",
    component: ArchiveComponent,
    canActivate: [archiveRoleGuard],
    children: [{
      path: "",
      component: ScoreShelfComponent
    },
      {
        path: "scores",
        component: ScoreShelfComponent,
      },
      {
        path: "scores/new",
        component: ScoreCreatorComponent
      },
      {
        path: "scores/:id",
        component: ScoreCreatorComponent
      }
    ]
  },
  {path: "login", component: LoginComponent},
  {path: "self", component: SelfComponent, canActivate: [authenticationGuard]},
  {path: "system-infos", component: SystemInfosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
