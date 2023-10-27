import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  public contactForm!: FormGroup;
  public isSending: boolean = false;
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
      return alert('Please fill all fields');
    }
    try {
      this.isSending = true;
      const response = await emailjs.send(
        'service_mf53oe8',
        'template_0cy51ed',
        {
          to_name: 'KellynCodes',
          ...this.contactForm.value,
        },
        'qO-NrEIA8q8umfPy0'
      );
      if (response.status != HttpStatusCode.Ok) {
        this.isSending = false;
        return alert(
          'Something unexpected happened while sending the message.Please try again.'
        );
      }
      if (response.status == HttpStatusCode.Ok) {
        this.isSending = false;
        return alert('We have received your message.');
      }
    } catch (error) {
        this.isSending = false;
      return alert(error);
    }
  }
}
