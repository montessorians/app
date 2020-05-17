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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
