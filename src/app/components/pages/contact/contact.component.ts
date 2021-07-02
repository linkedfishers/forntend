import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  disabledSubmiButton: boolean = true;
  optionsSelected: Array<any>;
  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmiButton = false;
    }
  }

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
  onSubmit() {
    this.contactService.sendMessage(this.contactForm.value).subscribe(
      () => {
        alert('Your message Has been sent');
        this.contactForm.reset();
        this.disabledSubmiButton = true;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
