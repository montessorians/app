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

import { AdminComponent } from './page/admin/admin/admin.component';
import { AdminCalendarComponent } from './page/admin/admin-calendar/admin-calendar.component';
import { AdminEcashComponent } from './page/admin/admin-ecash/admin-ecash.component';
import { AdminRegistrarComponent } from './page/admin/admin-registrar/admin-registrar.component';
import { AdminReportsComponent } from './page/admin/admin-reports/admin-reports.component';
import { AdminEcashTransactComponent } from './page/admin/ecash/admin-ecash-transact/admin-ecash-transact.component';
import { AdminEcashInquireComponent } from './page/admin/ecash/admin-ecash-inquire/admin-ecash-inquire.component';
import { AdminEcashToggleComponent } from './page/admin/ecash/admin-ecash-toggle/admin-ecash-toggle.component';

import { AdminStudentAddComponent } from './page/admin/student/admin-student-add/admin-student-add.component';

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
  { path: 'admin', component: AdminComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/calendar', component: AdminCalendarComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/ecash', component: AdminEcashComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/registrar', component: AdminRegistrarComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/reports', component: AdminReportsComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/ecash/transact', component: AdminEcashTransactComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/ecash/inquire', component: AdminEcashInquireComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/ecash/toggle', component: AdminEcashToggleComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }},
  { path: 'admin/student/add', component: AdminStudentAddComponent, canActivate: [AngularFireAuthGuard],
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
