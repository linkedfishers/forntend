import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/posts.interface';
import { User } from 'src/app/interfaces/users.interface';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

declare var app, loadSvg, initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader, loadSvg: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(
    private postService: PostService,
    private translate: TranslateService,
    private authService: AuthService,

  ) { }
  readonly API: string = environment.apiUrl + '/';

  @Input()
  comments: Comment[];
  @Input()
  post: Post;

  currentUser: User
  newComment: string;

  language: string;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
    loadSvg();
    initTooltips();
    initCharts();
    initPopups();
    initHeader();
    initContent();
    initLoader();
  }

  submitComment() {
    this.postService.addComment(this.newComment, this.post._id).subscribe(
      res => {
        console.log(res);
        this.newComment = "";
        this.post.comments++;
        res.data.author = this.currentUser;
        this.comments.push(res.data);
      },
      err => { console.log(err) }
    )
  }


}
