import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './page/home/home.component';
import { AssessmentComponent } from './page/assessment/assessment.component';
import { EcashComponent } from './page/ecash/ecash.component';
import { PeopleComponent } from './page/people/people.component';
import { MeComponent } from './page/me/me.component';
import { NotificationsComponent } from './page/notifications/notifications.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AccountSettingsComponent } from './page/account-settings/account-settings.component';
import { PostComponent } from './page/post/post.component';
import { LoginComponent } from './page/login/login.component';
import { LogoutComponent } from './page/logout/logout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'assessment', component: AssessmentComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'ecash', component: EcashComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'people', component: PeopleComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'me', component: MeComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'post/:id', component: PostComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'account/settings', component: AccountSettingsComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }},
  { path: 'logout', component: LogoutComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
