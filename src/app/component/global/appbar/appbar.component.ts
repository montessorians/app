import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.styl']
})

export class AppbarComponent implements OnInit {

  @Input() active = 'home';

  user = { account_type: 'student' };

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
