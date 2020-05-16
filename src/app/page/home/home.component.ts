import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  user: { first_name: null, middle_name: null, last_name: null };

  feeds = [
    {
      title: 'Sample Title',
      content: 'Sample Content',
      preview_image: 'https://data.whicdn.com/images/272258360/original.gif',
      author: [
        { first_name: 'Andresito', last_name: 'de Guzman' }
      ],
      timestamp: '2020-05-16T16:46:29.476Z'
    }
  ];

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
