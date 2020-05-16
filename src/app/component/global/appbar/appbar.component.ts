import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.styl']
})

export class AppbarComponent implements OnInit {

  @Input() active = 'home';

  sections = [
    {
      id: 'home',
      icon: 'home',
      link: '/home',
    },
    {
      id: 'assessment',
      icon: 'assessment',
      link: '/assessment'
    },
    {
      id: 'ecash',
      icon: 'account_balance_wallet',
      link: '#ecash'
    },
    {
      id: 'people',
      icon: 'group',
      link: '#people'
    },
    {
      id: 'me',
      icon: 'account_circle',
      link: '#me'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
