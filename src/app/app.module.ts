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

import {APP_INITIALIZER, NgModule, SecurityContext} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {LayoutModule} from "@angular/cdk/layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MemberCardComponent} from "./components/member-card/member-card.component";
import {MatCardModule} from "@angular/material/card";
import {MembersComponent} from "./pages/members/members.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FallbackImgDirective} from "./directives/fallback-img.directive";
import {RouterModule} from "@angular/router";
import {ArchiveComponent} from "./pages/archive/archive.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {ScoreEditorComponent} from "./components/archive/score-editor/score-editor.component";
import {ChipListComponent} from "./components/form/chip-list/chip-list.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TrimDirective} from "./directives/trim.directive";
import {BlackboardComponent} from "./pages/blackboard/blackboard.component";
import {BlackboardItemComponent} from "./components/document/blackboard-item/blackboard-item.component";
import {MarkdownModule, MarkdownService} from "ngx-markdown";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FooterComponent} from "./components/footer/footer.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {LoginComponent} from "./pages/login/login.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {BearerTokenInterceptor} from "./interceptors/bearer-token.interceptor";
import {SelfService} from "./services/self.service";
import {MatMenuModule} from "@angular/material/menu";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {SelfComponent} from "./pages/self/self.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {DebugDisplayPipe} from "./pipes/debug-display.pipe";
import {ScoreShelfComponent} from "./pages/archive/scores/score-shelf/score-shelf.component";
import {ScoreCreatorComponent} from "./pages/archive/scores/score-creator/score-creator.component";
import {ScoreModificationDialogComponent} from "./dialogs/score-modification-dialog/score-modification-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {CalendarComponent} from "./pages/calendar/calendar.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgOptimizedImage} from "@angular/common";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [AppComponent, NavigationComponent, MemberCardComponent, MembersComponent, FallbackImgDirective, ArchiveComponent, ScoreEditorComponent, ChipListComponent, TrimDirective, BlackboardComponent, BlackboardItemComponent, FooterComponent, LoginComponent, SelfComponent, DebugDisplayPipe, ScoreShelfComponent, ScoreCreatorComponent, ScoreModificationDialogComponent, CalendarComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, RouterModule.forRoot([], {
    useHash: false,
    anchorScrolling: "enabled",
    onSameUrlNavigation: "reload",
    enableTracing: true,
    scrollPositionRestoration: "enabled"
  }), MarkdownModule.forRoot({
    sanitize: SecurityContext.NONE
  }), MatTableModule, MatPaginatorModule, MatSelectModule, ReactiveFormsModule, MatChipsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MarkdownModule, MatProgressBarModule, MatGridListModule, MatSlideToggleModule, MatMenuModule, MatSnackBarModule, MatExpansionModule, MatDialogModule, MatProgressSpinnerModule, NgOptimizedImage, MatSortModule],
  exports: [RouterModule, MatFormFieldModule, MatInputModule],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {appearance: "fill"}
  }, MarkdownService, {
    provide: HTTP_INTERCEPTORS,
    useClass: BearerTokenInterceptor,
    multi: true
  }, {
    provide: APP_INITIALIZER,
    deps: [SelfService],
    useFactory: SelfService.initializeSelfService,
    multi: true
  }, {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: {duration: 2500}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
