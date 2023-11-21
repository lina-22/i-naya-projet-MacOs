import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComicsListComponent } from './comics-list/comics-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'comics', component: ComicsListComponent },
  { path: 'about', component: AboutComponent }
 
];

// @NgModule({
//   imports: [
//     CommonModule
//   ],
//   declarations: []
// })

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
