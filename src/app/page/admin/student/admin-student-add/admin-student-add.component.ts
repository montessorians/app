// tslint:disable: curly

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-student-add',
  templateUrl: './admin-student-add.component.html',
  styleUrls: ['./admin-student-add.component.styl']
})
export class AdminStudentAddComponent implements OnInit {

  loading = false;
  message = null;

  student = {
    first_name: null,
    middle_name: null,
    last_name: null,
    suffix_name: null,
    gender: null,
    birthdate: {
      month: null,
      day: null,
      year: null,
    },
    birthplace: {
      city: null,
      region: null,
      country: 'Philippines'
    },
    guardian: null,
    address: {
      street: null,
      barangay: null,
      city: null,
      region: null,
      country: 'Philippines'
    },
    student_number: null
  };

  count = 0;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.setStudentId();
  }

  reset() {
    this.student = {
      first_name: null,
      middle_name: null,
      last_name: null,
      suffix_name: null,
      gender: null,
      birthdate: {
        month: null,
        day: null,
        year: null,
      },
      birthplace: {
        city: null,
        region: null,
        country: 'Philippines'
      },
      guardian: null,
      address: {
        street: null,
        barangay: null,
        city: null,
        region: null,
        country: 'Philippines'
      },
      student_number: null
    };
  }


  setStudentId() {
    this.db.collection('school').doc('info').get().subscribe(res => {
      if (res.exists) {
        const data = res.data();
        this.count = +data.student_id_counter + 1;
        let num = (+data.student_id_counter + 1).toString();
        if (num.length === 1) num = `0000${num}`;
        if (num.length === 2) num = `000${num}`;
        if (num.length === 3) num = `00${num}`;
        if (num.length === 4) num = `0${num}`;

        this.student.student_number = `${new Date().getFullYear()}${num}`;
      }
    });
  }

  saveEntry() {
    this.loading = true;
    this.db.collection('students').add(this.student).then(() => {
      this.db.collection('school').doc('info').update({ student_id_counter: this.count }).then(() => {
        this.loading = false;
        this.message = `${this.student.first_name} ${this.student.last_name} (${this.student.student_number}) has been added successfully!`;
        this.reset();
        this.setStudentId();
      });

    }).catch(e => {
      this.loading = false;
      this.message = 'An error occurred';
    });
  }

}
