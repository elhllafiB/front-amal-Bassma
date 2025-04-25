import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZComponent } from './z/z.component';
import {NavbarComponent} from './navbar/navbar.component';

const routes: Routes = [

  { path: 'z', component: ZComponent },
  { path: '/navbar', component: NavbarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
