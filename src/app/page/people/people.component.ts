import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.styl']
})
export class PeopleComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  loading = true;
  adminList = [];

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.loading = true;
    this.db.collection('users', ref => ref.where('account_type', '==', 'admin')).get().subscribe(res => {
      this.loading = false;
      if (!res.empty) {
        this.adminList = [];
        res.forEach(obj => {
          const d = { id: obj.id };
          Object.keys(obj.data()).forEach(k => { d[k] = obj.data()[k]; });
          this.adminList.push(d);
        });
      }
    });
  }

}
