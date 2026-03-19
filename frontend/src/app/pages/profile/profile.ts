import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  form;
  loading = false;
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private toast: ToastService
  ) {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.form.patchValue({ full_name: user.full_name });
    }
  }

  save(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const token = this.auth.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.put(`${this.apiUrl}/profile`, this.form.value, { headers }).subscribe({
      next: (res: any) => {
        this.toast.show('Profile updated successfully', 'success');
        this.loading = false;
      },
      error: () => {
        this.toast.show('Failed to update profile', 'error');
        this.loading = false;
      }
    });
  }
}