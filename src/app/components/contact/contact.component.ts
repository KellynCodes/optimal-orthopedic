import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public contactForm!: FormGroup;
  public isSending: boolean = false;
  public errorMessage: string | null | unknown = null;
  public successMessage: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$'),
        ],
      ],
      date: [new Date().toDateString(), Validators.required],
      message: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.contactForm.valid) {
      this.errorMessage = 'Please fill all the fields';
      this.setMessageState(5000);
      return;
    }
    try {
      this.isSending = true;
      const response = await emailjs.send(
        'service_angzgfi',
        'template_em27ivs',
        {
          to_name: 'there',
          ...this.contactForm.value,
        },
        'qivBRNuQUCrknS0_k'
      );
      if (response.status != HttpStatusCode.Ok) {
        this.isSending = false;
        this.errorMessage =
          'Something unexpected happened while sending the message.Please try again.';
        this.setMessageState(5000);
        return;
      }
      if (response.status == HttpStatusCode.Ok) {
        this.isSending = false;
        this.successMessage = 'We have received your message.';
        this.setMessageState(5000);
        return;
      }
    } catch (error: any) {
      if (error?.status != HttpStatusCode.Ok) {
        this.isSending = false;
        this.errorMessage = 'Message not sent. Try again.';
        this.setMessageState(5000);
        return;
      }
    }
  }

  setMessageState(ms: number): void {
    setTimeout(() => {
      this.errorMessage = null;
      this.successMessage = null;
    }, ms);
    return;
  }
}
