import { Doctors, Physicians } from '../../data/providers/providers';
import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent {
  public appointmentForm!: FormGroup;
  public isSending: boolean = false;
  public errorMessage: string | null | unknown = null;
  public successMessage: string | null = null;
  public _providers = [...Doctors, ...Physicians];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^\\+(?:[0-9] ?){6,14}[0-9]$')]],
      date: [new Date().toDateString(), Validators.required],
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.appointmentForm.valid) {
      this.errorMessage = 'Please fill all the fields';
      this.setMessageState(5000);
      return;
    }
    try {
      this.isSending = true;
      const response = await emailjs.send(
        'service_angzgfi',
        'template_m0ix7uc',
        {
          to_name: 'there',
          ...this.appointmentForm.value,
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
        this.errorMessage = 'Appointment not sent. Try again.';
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
