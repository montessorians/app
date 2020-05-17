import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.styl']
})
export class MeComponent implements OnInit {

  firebaseUser = { photoURL: null, displayName: null, email: null };
  user = { userId: null, photoURL: null, email: null,
  first_name: null, last_name: null, account_type: null, student_no: null };

  constructor(private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.afAuth.user.subscribe(res => {
      this.firebaseUser = res;
    });
  }

}
