import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-ecash-toggle',
  templateUrl: './admin-ecash-toggle.component.html',
  styleUrls: ['./admin-ecash-toggle.component.styl']
})
export class AdminEcashToggleComponent implements OnInit {

  email = null;
  isEnabled = 'false';

  message = null;
  loading = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  setValue() {
    this.loading = true;
    let em = null;
    if (this.email.includes('@')) {
      em = this.email;
    } else {
      em = `${this.email}@montessorian.xyz`;
    }

    this.db.collection('users', ref => ref.where('email', '==', em)).get().subscribe(res => {
      if (res.empty) {
        this.loading = false;
        this.message = 'User was not found';
      } else {
        res.forEach(res2 => {
          const user = res2.data();
          const userRef = res2.ref;

          let val = null;
          let s = 'disabled';
          if (this.isEnabled === 'true') {
            val = true;
            s = 'enabled';
          } else {
            val = false;
          }

          userRef.collection('ecash').doc('info').update({ is_enabled: val }).then(() => {
            this.loading = false;
            this.message = `Updated ${user.first_name}'s Montessori Pay to ${s}.`;
          }).catch(e => {
            this.loading = false;
            this.message = 'An error occurred while updating state';
          });
        });
      }
    });
  }

}
