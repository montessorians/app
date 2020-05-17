import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  loading = false;
  username = null;
  password = null;
  error = null;

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    if (!this.username || !this.password) {
      this.loading = false;
      this.error = 'Username and Password are required';
    } else {
      let username = this.username;
      if (!username.includes('@')) { username = `${username}@montessorian.xyz`; }

      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this.afAuth.signInWithEmailAndPassword(username, this.password).then(res => {
          this.db.collection('users').doc(res.user.uid).get().subscribe(user => {
            if (user.exists) {
              const data = user.data();
              data.userId = res.user.uid;
              localStorage.setItem('user', JSON.stringify(data));
              this.db.collection('school').get().subscribe(res2 => {
                if (res2.empty) {
                  this.router.navigateByUrl('/logout');
                } else {
                  res2.forEach(obj => {
                    localStorage.setItem(obj.id, JSON.stringify(obj.data()));
                  });
                  this.router.navigateByUrl('/');
                }
              });
            }
          }, e => {
            this.afAuth.signOut().then(() => {
              this.loading = false;
              this.error = 'An error occurred while getting your information.';
            });
          });
        }).catch(e => {
          this.loading = false;
          if (e.message === 'EMAIL_NOT_FOUND') {
            this.error = 'The account does not exist.';
          } else {
            if (e.message === 'INVALID_PASSWORD') {
              this.error = 'You have entered an invalid password';
            } else {
              this.error = 'There was an error occurred. Please try again.';
            }
          }
        });
      });
    }
  }

}