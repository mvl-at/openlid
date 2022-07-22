import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MemberCardComponent} from './components/member-card/member-card.component';
import {MatCardModule} from '@angular/material/card';
import {MembersComponent} from './pages/members/members.component';
import {HttpClientModule} from '@angular/common/http';
import {FlexModule} from '@angular/flex-layout';
import {FallbackImgDirective} from './directives/fallback-img.directive';
import {RouterModule} from '@angular/router';
import {ArchiveComponent} from './pages/archive/archive.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {ScoreEditorComponent} from './components/archive/score-editor/score-editor.component';
import {ChipListComponent} from './components/form/chip-list/chip-list.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [AppComponent, NavigationComponent, MemberCardComponent, MembersComponent, FallbackImgDirective, ArchiveComponent, ScoreEditorComponent, ChipListComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, RouterModule.forRoot([], {
    useHash: false,
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    enableTracing: true,
    scrollPositionRestoration: 'enabled'
  }), FlexModule, MatTableModule, MatPaginatorModule, MatSelectModule, ReactiveFormsModule, MatChipsModule, MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatCheckboxModule],
  exports: [RouterModule, MatFormFieldModule, MatInputModule],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
