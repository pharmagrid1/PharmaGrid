import { Component, OnInit } from '@angular/core'; // Core Angular features
import { CommonModule } from '@angular/common'; // Common directives
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'; // Reactive forms utilities
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HTTP client tools
import { AuthService } from '../../shared/services/auth.service'; // Auth service
import { ToastService } from '../../shared/services/toast.service'; // Toast notifications

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  form; // Reactive form instance
  loading = false; // Loading state flag
  private apiUrl = 'http://localhost:5000/api/auth'; // Auth API base URL

  constructor(
    private fb: FormBuilder, // Form builder service
    private auth: AuthService, // Auth service
    private http: HttpClient, // HTTP client
    private toast: ToastService // Toast messages
  ) {
    this.form = this.fb.group({ // Initialize form
      full_name: ['', Validators.required], // Name field required
      password: [''] // Optional password field
    });
  }

  ngOnInit(): void {
    const user = this.auth.getCurrentUser(); // Get logged-in user
    if (user) {
      this.form.patchValue({ full_name: user.full_name }); // Prefill name
    }
  }

  save(): void {
    if (this.form.invalid) return; // Stop if invalid form
    this.loading = true; // Enable loading state

    const token = this.auth.getToken(); // Get auth token
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` }); // Set auth header

    this.http.put(`${this.apiUrl}/profile`, this.form.value, { headers }).subscribe({
      next: (res: any) => {
        this.toast.show('Profile updated successfully', 'success'); // Success message
        this.loading = false; // Stop loading
      },
      error: () => {
        this.toast.show('Failed to update profile', 'error'); // Error message
        this.loading = false; // Stop loading
      }
    });
  }
}