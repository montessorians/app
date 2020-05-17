import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.styl']
})
export class NotificationsComponent implements OnInit {

  user = { userId: null };
  list = [];
  loading = true;
  error = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getNotifications();
  }

  getNotifications() {
    this.db.collection('users').doc(this.user.userId).collection('notifications').get().subscribe(res => {
      if (!res.empty) {
        res.forEach(obj => this.list.push(obj.data()));
        this.list = this.list.reverse();
        localStorage.setItem('notifications', JSON.stringify(this.list));
      }
      this.loading = false;
    }, () => {
      this.loading = false;
      if (localStorage.getItem('notifications')) {
        this.list = JSON.parse(localStorage.getItem('notifications'));
      } else {
        this.error = true;
      }
    });
  }

}
