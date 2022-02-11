import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './admin/view/view.component';
import { LoginComponent } from './login/login.component';

import { SignupComponent } from './signup/signup.component';
import { TakeQuizComponent } from './user/take-quiz/take-quiz.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminComponent},
  {path:'admin-dashboard', component: AdminDashboardComponent},
  {path: 'view/:id', component: ViewComponent},
  {path: 'user', component: UserComponent},
  {path: 'takeQuiz/:id', component:TakeQuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
