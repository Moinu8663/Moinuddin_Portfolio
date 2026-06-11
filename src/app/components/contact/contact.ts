import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environment/environment';

// ─── EmailJS Configuration ───────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create an Email Service (Gmail recommended) → copy Service ID
// 3. Create an Email Template with these variables:
//      {{from_name}}  {{from_email}}  {{subject}}  {{message}}  {{to_name}}
//    → copy Template ID
// 4. Go to Account → API Keys → copy Public Key
// Replace the three values below with your own:
const EMAILJS_SERVICE_ID  = environment.EMAILJS_SERVICE_ID;   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = environment.EMAILJS_TEMPLATE_ID;  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = environment.EMAILJS_PUBLIC_KEY;   // e.g. 'abcDEFghiJKL'
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatSnackBarModule, RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  form: FormGroup;
  sending = signal(false);
  

  contactInfo = [
    { icon: '📧', label: 'Email', value: 'moinuddin8663@gmail.com' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/moinuddin-shaikh-235aa61b2/' },
    { icon: '🕐', label: 'Response Time', value: 'Within 24 hours' },
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      name:    ['', Validators.required],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  async onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sending.set(true);

    const { name, email, subject, message } = this.form.value;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: name,
          email: email,
          title: subject,
          message: message,
        },
        EMAILJS_PUBLIC_KEY
      );

      this.form.reset();
      this.snackBar.open('✅ Message sent! I\'ll get back to you within 24 hours.', 'Close', {
        duration: 5000,
        panelClass: 'snack-success',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      this.snackBar.open('❌ Failed to send message. Please try again or email directly.', 'Close', {
        duration: 6000,
        panelClass: 'snack-error',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } finally {
      this.sending.set(false);
    }
  }
}
