import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.styl']
})
export class AccountSettingsComponent implements OnInit {

  uploadData = null;
  uploadLoading = false;

  user = { email: null, userId: null };
  password = { current: null, new: null };
  error = { changePassword: null, upload: null };

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private storage: AngularFireStorage,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  changePassword() {
    const credential = firebase.auth.EmailAuthProvider.credential(this.user.email, this.password.current);
    this.afAuth.user.subscribe(res => {
      res.reauthenticateWithCredential(credential).then(res2 => {
        res2.user.updatePassword(this.password.new).then(res3 => {
          this.router.navigateByUrl('/logout');
        }).catch(e => {
          this.error.changePassword = e.message;
        });
      }).catch(e => {
        this.error.changePassword = e.message;
      });
    }, e => {
      this.error.changePassword = e.message;
    });
  }

  upload(event) {
    this.uploadLoading = true;
    if (event.target.files.length !== 0) {
      const d = new Date().toISOString();
      this.storage.upload(`/profile-pictures/${this.user.userId}-${d}`, event.target.files[0]).then(async (res) => {
        res.ref.getDownloadURL().then(url => {
          this.db.collection('users').doc(this.user.userId).update({
            photoURL: url
          }).then(() => {
            this.afAuth.user.subscribe(res2 => {
              res2.updateProfile({ photoURL: url })
              .then(() => {
                this.uploadData = null;
                this.error.upload = 'Updated Profile Picture Successfully!';
                this.uploadLoading = false;
              });
            });
          }).catch(e => {
            this.uploadLoading = false;
            this.error.upload = 'An error occurred. Please try reuploading the photo again.';
          });
        }).catch(e => {
          this.uploadLoading = false;
          this.error.upload = 'An error occurred. Please try reuploading the photo again.';
        });
      }).catch(e => {
        this.error.upload = e.message;
        this.uploadLoading = false;

      });
    }
  }

}
