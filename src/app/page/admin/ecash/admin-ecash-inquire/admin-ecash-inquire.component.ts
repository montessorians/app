import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-ecash-inquire',
  templateUrl: './admin-ecash-inquire.component.html',
  styleUrls: ['./admin-ecash-inquire.component.styl']
})
export class AdminEcashInquireComponent implements OnInit {

  init = true;

  email = null;
  emailError = null;

  balance = 0.00;
  isEnabled = false;

  loading = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  inquire() {
    this.loading = true;
    this.init = true;

    if (this.email) {
      let em = null;
      if (!this.email.includes('@')) {
        em = `${this.email}@montessorian.xyz`;
      } else {
        em = this.email;
      }

      this.db.collection('users', (ref) => ref.where('email', '==', em)).get().subscribe(res => {
        if (!res.empty) {
          res.forEach(res2 => {
            res2.ref.collection('ecash').doc('info').get().then(res3 => {
              if (res3.exists) {
                const data = res3.data();
                this.balance = +data.balance || 0.00;
                this.isEnabled = data.is_enabled || false;
                this.loading = false;
                this.init = false;
              } else {
                this.balance = 0.00;
                this.isEnabled = false;
                this.loading = false;
                this.init = false;
              }
            });
          });
        } else {
          this.loading = false;
          this.emailError = 'User not found';
        }
      });
    } else {
      this.loading = false;
    }
  }

}
