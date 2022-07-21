import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MembersComponent} from './pages/members/members.component';
import {ArchiveComponent} from './pages/archive/archive.component';

const routes: Routes = [
  {path: 'menu', component: NavigationComponent},
  {path: 'members', component: MembersComponent},
  {path: 'archive', component: ArchiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
