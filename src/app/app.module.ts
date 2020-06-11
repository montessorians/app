import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { LogoutComponent } from './page/logout/logout.component';
import { AppbarComponent } from './component/global/appbar/appbar.component';
import { AssessmentComponent } from './page/assessment/assessment.component';
import { EcashComponent } from './page/ecash/ecash.component';
import { PeopleComponent } from './page/people/people.component';
import { MeComponent } from './page/me/me.component';
import { SpinnerComponent } from './component/global/spinner/spinner.component';
import { NotificationsComponent } from './page/notifications/notifications.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AccountSettingsComponent } from './page/account-settings/account-settings.component';
import { PostComponent } from './page/post/post.component';
import { NavbarComponent } from './component/global/navbar/navbar.component';
import { AdminCalendarComponent } from './page/admin/admin-calendar/admin-calendar.component';
import { AdminEcashComponent } from './page/admin/admin-ecash/admin-ecash.component';
import { AdminRegistrarComponent } from './page/admin/admin-registrar/admin-registrar.component';
import { AdminComponent } from './page/admin/admin/admin.component';
import { AdminReportsComponent } from './page/admin/admin-reports/admin-reports.component';
import { AdminEcashTransactComponent } from './page/admin/ecash/admin-ecash-transact/admin-ecash-transact.component';
import { AdminEcashInquireComponent } from './page/admin/ecash/admin-ecash-inquire/admin-ecash-inquire.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AdminEcashToggleComponent } from './page/admin/ecash/admin-ecash-toggle/admin-ecash-toggle.component';
import { AdminStudentAddComponent } from './page/admin/student/admin-student-add/admin-student-add.component';
import { AdminStudentLinkAccountComponent } from './page/admin/student/admin-student-link-account/admin-student-link-account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    AppbarComponent,
    AssessmentComponent,
    EcashComponent,
    PeopleComponent,
    MeComponent,
    SpinnerComponent,
    NotificationsComponent,
    ProfileComponent,
    AccountSettingsComponent,
    PostComponent,
    NavbarComponent,
    AdminCalendarComponent,
    AdminEcashComponent,
    AdminRegistrarComponent,
    AdminComponent,
    AdminReportsComponent,
    AdminEcashTransactComponent,
    AdminEcashInquireComponent,
    AdminEcashToggleComponent,
    AdminStudentAddComponent,
    AdminStudentLinkAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
