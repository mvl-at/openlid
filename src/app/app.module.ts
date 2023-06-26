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

import {APP_INITIALIZER, NgModule, SecurityContext} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MemberCardComponent} from './components/member-card/member-card.component';
import {MatLegacyCardModule as MatCardModule} from '@angular/material/legacy-card';
import {MembersComponent} from './pages/members/members.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FallbackImgDirective} from './directives/fallback-img.directive';
import {RouterModule} from '@angular/router';
import {ArchiveComponent} from './pages/archive/archive.component';
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import {MatLegacyPaginatorModule as MatPaginatorModule} from '@angular/material/legacy-paginator';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_LEGACY_FORM_FIELD_DEFAULT_OPTIONS as MAT_FORM_FIELD_DEFAULT_OPTIONS, MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {ScoreEditorComponent} from './components/archive/score-editor/score-editor.component';
import {ChipListComponent} from './components/form/chip-list/chip-list.component';
import {MatLegacyChipsModule as MatChipsModule} from '@angular/material/legacy-chips';
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from '@angular/material/legacy-autocomplete';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular/material/legacy-checkbox';
import {TrimDirective} from './directives/trim.directive';
import {BlackboardComponent} from './pages/blackboard/blackboard.component';
import {BlackboardItemComponent} from './components/document/blackboard-item/blackboard-item.component';
import {MarkdownModule, MarkdownService} from 'ngx-markdown';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {FooterComponent} from './components/footer/footer.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {LoginComponent} from './pages/login/login.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BearerTokenInterceptor} from './interceptors/bearer-token.interceptor';
import {SelfService} from './services/self.service';
import {MatMenuModule} from '@angular/material/menu';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {SelfComponent} from './pages/self/self.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {DebugDisplayPipe} from './pipes/debug-display.pipe';
import {ScoreShelfComponent} from './pages/archive/scores/score-shelf/score-shelf.component';
import { ScoreCreatorComponent } from './pages/archive/scores/score-creator/score-creator.component';
import { ScoreModificationDialogComponent } from './dialogs/score-modification-dialog/score-modification-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, NavigationComponent, MemberCardComponent, MembersComponent, FallbackImgDirective, ArchiveComponent, ScoreEditorComponent, ChipListComponent, TrimDirective, BlackboardComponent, BlackboardItemComponent, FooterComponent, LoginComponent, SelfComponent, DebugDisplayPipe, ScoreShelfComponent, ScoreCreatorComponent, ScoreModificationDialogComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, RouterModule.forRoot([], {
        useHash: false,
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
        enableTracing: true,
        scrollPositionRestoration: 'enabled'
    }), MarkdownModule.forRoot({
        sanitize: SecurityContext.NONE
    }), MatTableModule, MatPaginatorModule, MatSelectModule, ReactiveFormsModule, MatChipsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MarkdownModule, MatProgressBarModule, MatGridListModule, MatSlideToggleModule, MatMenuModule, MatSnackBarModule, MatExpansionModule, MatDialogModule],
  exports: [RouterModule, MatFormFieldModule, MatInputModule],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: {appearance: 'fill'}
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
