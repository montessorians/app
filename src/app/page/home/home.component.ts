import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  user: { first_name: null, middle_name: null, last_name: null, userId: null };

  feeds = [];
  feedLoading = true;
  feedError = false;

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getFeed();
  }

  getFeed() {
    this.feedLoading = true;
    this.db.collection('feeds').get().subscribe(res => {
      if (!res.empty) {
        res.forEach(obj => {
          const d = { id: null };
          const data = obj.data();
          Object.keys(data).forEach(k => { d[k] = data[k]; });
          d.id = obj.id;
          this.feeds.push(d);
        });
        this.checkLikes();
        localStorage.setItem('feeds', JSON.stringify(this.feeds));
      }
      this.feedLoading = false;
    }, e => {
      if (localStorage.getItem('feeds')) {
        this.feeds = JSON.parse(localStorage.getItem('feeds'));
      } else {
        this.feedError = true;
      }
    });
  }

  checkLikes() {
    this.feeds.forEach(obj => {
      this.db.collection('feeds').doc(obj.id).collection('likes').doc(this.user.userId).get().subscribe(res => {
        if (res.exists) {
          obj.liked = true;
        } else {
          obj.liked = false;
        }
      });
      return obj;
    });
    localStorage.setItem('feeds', JSON.stringify(this.feeds));
  }

  likeStatus(feed) {
    this.db.collection('feeds').doc(feed.id).collection('likes').doc(this.user.userId).set({ timestamp: new Date() }).then(() => {
      feed.liked = true;
    });
  }

  unlikeStatus(feed) {
    this.db.collection('feeds').doc(feed.id).collection('likes').doc(this.user.userId).delete().then(()=>{
      feed.liked = false;
    });
  }

}
