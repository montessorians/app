import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-ecash',
  templateUrl: './ecash.component.html',
  styleUrls: ['./ecash.component.styl']
})
export class EcashComponent implements OnInit {

  infoLoading = true;
  transactionLoading = true;

  user = { userId: null };
  error = false;
  info = { balance: 0.00, is_enabled: false } as DocumentData;

  transactions = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getEcashInfo();
  }

  getEcashInfo() {
    this.infoLoading = true;
    this.db.collection('users').doc(this.user.userId).collection('ecash').doc('info').get().subscribe(res => {
      this.infoLoading = false;
      if (res.exists) {
        this.info = res.data();
      }
      this.getTransactions();
    }, e => {
      this.infoLoading = false;
      this.error = true;
    });
  }

  getTransactions() {
    this.transactionLoading = true;
    this.db.collection('users').doc(this.user.userId).collection('ecash-transactions').get().subscribe(res => {
      this.transactions = [];
      this.transactionLoading = false;
      if (!res.empty) {
        res.forEach(obj => {
          const d = { id: obj.id };
          Object.keys(obj.data()).forEach(k => {
            if (k === 'timestamp') {
              d[k] = obj.data()[k].toDate();
            } else {
              d[k] = obj.data()[k];
            }
          });
          this.transactions.push(d);
          this.transactions = this.transactions.reverse();
        });
      }
    }, e => {
      this.transactionLoading = false;
    });
  }

}
