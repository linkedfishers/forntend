import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  model: any = {};
  contactForm: FormGroup;
  disabledSubmiButton: boolean = true;
  optionsSelected: Array<any>;
  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmiButton = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private http: HttpClient
  ) {
    this.contactForm = fb.group({
      contactFormName: ['', Validators.required],
      contactFormEmail: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      contactFormSubjects: ['', Validators.required],
      contactFormMessage: ['', Validators.required],
      contactFormCopy: [''],
    });
  }

  ngOnInit(): void {}
  onSubmit(name, subject, email, message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .post(
        'https://formspree.io/f/xoqynbgk',
        { name: name, subject: subject, replyto: email, message: message },
        { headers: headers }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
