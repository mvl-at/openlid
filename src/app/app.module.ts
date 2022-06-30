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
import {MatCardModule} from "@angular/material/card";
import {MembersComponent} from './pages/members/members.component';
import {HttpClientModule} from "@angular/common/http";
import {FlexModule} from "@angular/flex-layout";
import {FallbackImgDirective} from './directives/fallback-img.directive';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MemberCardComponent,
    MembersComponent,
    FallbackImgDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterModule.forRoot([], {
      useHash: false,
      anchorScrolling: "enabled",
      onSameUrlNavigation: "reload",
      enableTracing: true,
      scrollPositionRestoration: "enabled"
    }),
    FlexModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
