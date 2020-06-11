import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-admin-ecash-transact',
  templateUrl: './admin-ecash-transact.component.html',
  styleUrls: ['./admin-ecash-transact.component.styl']
})
export class AdminEcashTransactComponent implements OnInit {

  email = null;
  amount = null;
  title = 'Purchase';
  type = 'purchase';
  action = 'subtract';
  merchant = { merchant_id: '0', business_name: 'Holy Child Montessori', name: 'Holy Child Montessori' };

  error = null;
  loading = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  postTransaction() {
    this.loading = true;
    let em = null;

    if (!this.email.includes('@')) {
      em = `${this.email}@montessorian.xyz`;
    } else {
      em = this.email;
    }

    const writeData = {
      action: this.action,
      amount: this.amount,
      merchant: {
        business_name: this.merchant.business_name,
        merchant_id: this.merchant.merchant_id,
        name: this.merchant.name
      },
      status: 'done',
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      title: this.title,
      type: this.type
    };

    this.db.collection('users', ref => ref.where('email', '==', em)).get().subscribe(res => {
      if (res.empty) {
        this.loading = false;
        this.error = 'User not found';
      } else {
        res.forEach(obj => {
          const id = obj.id;
          const userRef = obj.ref;
          userRef.collection('ecash').doc('info').get().then(res2 => {
            if (res.empty) {
              this.loading = false;
              this.error = 'User is not yet enrolled in Montessori Pay';
            } else {
              const ecashInfo = res2.data();

              if (ecashInfo.is_enabled === false) {
                this.loading = false;
                this.error = 'Montessori Pay is disabled for this user.';
              } else {

                const balance = +ecashInfo.balance;
                if (this.action === 'subtract') {
                  if (balance < this.amount) {
                    this.loading = false;
                    this.error = `The user does not have enough balance. Remaining balance is ₱ ${(+balance).toFixed(2)}.`;
                  } else {
                    this.db.collection('users').doc(id).collection('ecash-transactions')
                      .doc(`${id}${Math.round(new Date().getTime() / 1000)}`).set(writeData).then(() => {
                        const newBal = +balance - +this.amount;
                        res2.ref.update({ balance: newBal }).then(() => {

                          this.db.collection('users').doc(id).collection('notifications')
                            .doc(`${Math.round(new Date().getTime() / 1000)}`)
                            .set({
                              author: {
                                department: 'Montessori Pay'
                              },
                              icon: 'credit_card',
                              // tslint:disable-next-line: max-line-length
                              message: `Your new balance is ₱ ${(+newBal).toFixed(2)}. If this transaction was unauthorized, please report immediately.`,
                              timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                              title: `${this.merchant.name} charged your account ₱ ${(+this.amount).toFixed(2)}`,
                              url: '/ecash'
                            }).then(() => {
                              this.loading = false;
                              this.error = `Transaction was processed successfully! New Balance is ₱ ${(+newBal).toFixed(2)}.`;

                              this.email = null;
                              this.amount = null;
                            }).catch(e => {
                              this.loading = false;
                              this.error = `Transaction was processed successfully! New Balance is ₱ ${(+newBal).toFixed(2)}.`;

                              this.email = null;
                              this.amount = null;
                            });
                        });
                      }).catch(e => {
                        this.loading = false;
                        this.error = e.message;
                      });
                  }
                } else {
                  this.db.collection('users').doc(id).collection('ecash-transactions')
                    .doc(`${id}${Math.round(new Date().getTime() / 1000)}`).set(writeData).then(() => {
                      const newBal = +balance + +this.amount;
                      res2.ref.update({ balance: newBal }).then(() => {

                        this.db.collection('users').doc(id).collection('notifications')
                          .doc(`${Math.round(new Date().getTime() / 1000)}`)
                          .set({
                            author: {
                              department: 'Montessori Pay'
                            },
                            icon: 'credit_card',
                            // tslint:disable-next-line: max-line-length
                            message: `Your new balance is ₱ ${(+newBal).toFixed(2)}. If this transaction was unauthorized, please report immediately.`,
                            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                            title: `${this.merchant.name} topped-up your account ₱ ${(+this.amount).toFixed(2)}`,
                            url: '/ecash'
                          }).then(() => {
                            this.loading = false;
                            this.error = `Transaction was processed successfully! New Balance is ₱ ${(+newBal).toFixed(2)}.`;

                            this.email = null;
                            this.amount = null;
                          })
                          .catch(e => {
                            this.loading = false;
                            this.error = `Transaction was processed successfully! New Balance is ₱ ${(+newBal).toFixed(2)}.`;

                            this.email = null;
                            this.amount = null;
                          });
                      }).catch(e => {
                        this.loading = false;
                        this.error = e.message;
                      });
                    }).catch(e => {
                      this.loading = false;
                      this.error = e.message;
                    });
                }

              }
            }
          });
        });
      }
    });
  }

}
