import { Component, ElementRef, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post, Comment } from 'src/app/interfaces/posts.interface';
import { environment } from 'src/environments/environment';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { Report, User } from 'src/app/interfaces/users.interface';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var loadSvg, initTooltips,
  initCharts,
  initHexagons,
  initPopups,
  initHeader,
  initContent,
  initLoader, loadSvg: any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private authService: AuthService,
    private el: ElementRef,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) { }
  @Input()
  post: Post;
  comment: Comment

  @Output()
  postDeleted = new EventEmitter();
  commentDeleted = new EventEmitter();

  readonly API: string = environment.apiUrl + '/';
  //readonly API: string ="http://localhost:3000/posts/download/";
  groupedReactions: any[];
  reacted: boolean = false;
  currentUser: User
  profilePicture: HTMLInputElement;
  commentsVisible = false;
  newComment: string;
  formData: FormData;
  comments: Comment[];
  language: string;
  imageSrc: any;
  selectedPost = -1;
  reportBody: any;
  isGuest = true;
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.isGuest = false;
      this.reacted = this.post.reacts.some(
        reaction => {
          return reaction.author._id == this.currentUser._id
        });

    }
    if (this.post.attachmentType == 'youtube') {
      this.post.attachment = this.sanitizer
        .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.post.attachment}`) as string;
    }

    loadSvg();
    initTooltips();
    initCharts();
    initPopups();
    initHeader();
    initContent();
    initLoader();

    this.language = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.language = event.lang;
    });
  }

  reactToPost(reaction: string) {
    this.postService.reactToPost(this.post._id, reaction).subscribe(
      res => {
        this.post.reacts = res.data.reacts;
        this.reacted = !this.reacted;
        initTooltips();
        initPopups();
      },
      err => {
        console.log(err);
      }
    )
  }

  /* togglebtn(){
    let x = document.querySelector('.simple-dropdown');
    if(x.style.display ==='none')
  } */

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
    if (!this.commentsVisible) {
      return;
    }
    this.postService.getComments(this.post._id, 3).subscribe(
      res => {
        this.comments = res.data;
      },
      err => {
        console.log(err);
      }
    )
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
  // deletePOST

  deletePost() {
    Swal.fire({
      title: this.translate.instant('delete_post') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_post'),
      cancelButtonText: this.translate.instant('discard')
    }).then((result) => {
      if (result.value) {
        this.postService.deletePost(this.post._id).subscribe(
          res => {
            Swal.fire(
              {
                title: this.translate.instant('deleted_post'),
                icon: 'success'
              });
            this.postDeleted.emit(this.post._id);


          },
          err => {
            Swal.fire({
              title: this.translate.instant('delete_post_error'),
              icon: 'error'
            });
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    })
  }

  async updatePost() {
    const { value: result } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      inputValue: this.post.content,
      showCancelButton: true
    })

    if (result) {
      console.log(result);
      this.post.content = result;
      this.postService.updatePost(this.post, this.post._id).subscribe(
        res => {
          Swal.fire(
            {
              title: this.translate.instant('update_post'),
              icon: 'success'
            });

        },
        err => {
          Swal.fire({
            title: this.translate.instant('update_post_error'),
            icon: 'error'
          });
        }
      );

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return;
    }
  }



  // delete comentaire
  deleteComment(id, index) {
    Swal.fire({
      title: this.translate.instant('delete_comment') + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.translate.instant('delete_comment'),
      cancelButtonText: this.translate.instant('discard')
    }).then((result) => {
      if (result.value) {
        this.postService.deleteComment(id).subscribe(
          res => {
            Swal.fire(
              {
                title: this.translate.instant('deleted_comment'),
                icon: 'success'
              });
            this.post.comments--;
            this.comments.splice(index, 1);
          },
          err => {
            Swal.fire({
              title: this.translate.instant('delete_comment_error'),
              icon: 'error'
            });
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return;
      }
    })
  }
  //update commentaire
  async updateComment(com: Comment) {
    const { value: result } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      inputValue: com.content,
      showCancelButton: true
    })

    if (result) {
      console.log(result);
      com.content = result;
      this.postService.updateComment(com, com._id).subscribe(
        res => {
          Swal.fire(
            {
              title: this.translate.instant('update_comment'),
              icon: 'success'
            });

        },
        err => {
          Swal.fire({
            title: this.translate.instant('update_comment_error'),
            icon: 'error'
          });
        }
      );

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return;
    }

  }
  async reportCommentaire() {
    const { value: result } = await Swal.fire({
      input: 'text',
      icon: 'question',
      inputLabel: this.translate.instant('report_reason2'),
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      cancelButtonText: this.translate.instant('discard'),
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return this.translate.instant('report_reason_unvalid');
        }
      }
    })
    if (result) {
      console.log(result);
      const reportt: Report = new Report();
      reportt.author = this.currentUser._id;
      reportt.cause = result;
      reportt.type = "commentaire";
      reportt.target_id = this.post._id;
      console.log(this.reportBody);
      this.postService.createReport(reportt).subscribe(
        res => {
          Swal.fire(
            {
              title: this.translate.instant('reportedt'),
              icon: 'success'
            });

        },
        err => {
          Swal.fire({
            title: this.translate.instant('reported'),
            icon: 'error'
          });
        }
      );

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return;
    }

  }
  //  const swal: { isConfirmed: Boolean, value: string } = await Swal.fire({
  //     title: this.translate.instant('report') + ' ' + this.user.fullName + '?',
  //     input: 'text',
  //     icon: 'question',
  //     inputLabel: this.translate.instant('report_reason'),
  //     cancelButtonText: this.translate.instant('discard'),
  //     showCancelButton: true,
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return this.translate.instant('report_reason_unvalid');
  //       }
  //     }
  //   });


  async reportPost() {
    const { value: result } = await Swal.fire({
      input: 'text',
      icon: 'question',
      inputLabel: this.translate.instant('report_reason1'),
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      cancelButtonText: this.translate.instant('discard'),
      inputValue: "",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return this.translate.instant('report_reason_unvalid');
        }
      }
    })

    if (result) {
      console.log(result);
      const reportt: Report = new Report();
      reportt.author = this.currentUser._id;
      reportt.cause = result;
      reportt.type = "publication";
      reportt.target_id = this.post._id;
      console.log(this.reportBody);
      this.postService.createReport(reportt).subscribe(
        res => {
          Swal.fire(
            {
              title: this.translate.instant('reported'),
              icon: 'success'
            });

        },
        err => {
          Swal.fire({
            title: this.translate.instant('update_post_error'),
            icon: 'error'
          });
        }
      );

    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return;
    }

  }

}
