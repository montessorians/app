import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.styl']
})
export class PostComponent implements OnInit {

  commentsLoading = true;

  user = { userId: null, first_name: null, last_name: null };
  id = null;
  commentInput: null;

  feed = {
    title: null,
    content: null,
    preview_image: null,
    timestamp: null,
    liked: false,
    author: { first_name: null, last_name: null }
  };

  comments = [];

  constructor(private db: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.getFeed();
  }

  getFeed() {
    this.db.collection('feeds').doc(this.id).get().subscribe(res => {
      if (res.exists) {
        const data = res.data();
        Object.keys(data).forEach(k => { this.feed[k] = data[k]; });
        this.checkLiked();
        this.getComments();
      }
    }, e => {
      console.log(e);
    });
  }

  checkLiked() {
    this.db.collection('feeds').doc(this.id).collection('likes').doc(this.user.userId).get().subscribe(res => {
      if (res.exists) {
        this.feed.liked = true;
      } else {
        this.feed.liked = false;
      }
    }, e => {
      this.feed.liked = false;
    });
  }

  likeStatus() {
    this.db.collection('feeds').doc(this.id).collection('likes').doc(this.user.userId).set({ timestamp: new Date() }).then(() => {
      this.feed.liked = true;
    });
  }

  unlikeStatus() {
    this.db.collection('feeds').doc(this.id).collection('likes').doc(this.user.userId).delete().then(()=>{
      this.feed.liked = false;
    });
  }

  getComments() {
    this.commentsLoading = true;
    this.db.collection('feeds').doc(this.id).collection('comments').get().subscribe(res => {
      this.comments = [];
      if (!res.empty) {
        res.forEach(obj => {
          const data = obj.data();
          const d = { id: null };
          Object.keys(data).forEach(k => { d[k] = data[k]; });
          d.id = obj.id;
          this.comments.push(d);
        });
        this.comments = this.comments.reverse();
      }
      this.commentsLoading = false;
    }, e => {
      this.commentsLoading = false;
    });
  }

  postComment() {
    if (this.commentInput) {
      const obj = {
        message: this.commentInput,
        timestamp: new Date(),
        author: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          userId: this.user.userId
        }
      };
      this.db.collection('feeds').doc(this.id).collection('comments').add(obj).then(res => {
        this.commentInput = null;
        this.getComments();
      });
    }
  }

  deleteComment(obj) {
    this.db.collection('feeds').doc(this.id).collection('comments').doc(obj.id).delete().then(() => {
      this.getComments();
    });
  }

}
