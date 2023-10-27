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
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
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
      department: ['', Validators.required],
      doctor: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.appointmentForm.valid) {
      return alert('Please fill all fields');
    }
    try {
      const response = await emailjs.send(
        'service_mf53oe8',
        'template_6zqdrcq',
        {
          to_name: 'KellynCodes',
          ...this.appointmentForm.value,
        },
        'qO-NrEIA8q8umfPy0'
      );
      if (response.status != HttpStatusCode.Ok) {
        return alert(
          'Something unexpected happened while sending the message.Please try again.'
        );
      }
      if (response.status == HttpStatusCode.Ok) {
        return alert('Your appointment was sent successfully.');
      }
    } catch (error) {
      return alert(error);
    }
  }
}
