import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { LoginComponent } from './auth/login/login.component'; // CLI imports router
import { RegisterComponent } from './auth/register/register.component';
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./_helpers";
import {HomeComponent} from "./student/home/home.component"; // CLI imports router

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children:[{
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      }]
  },
  {
    path: '',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];
// sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
