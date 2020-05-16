import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.styl']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

}
