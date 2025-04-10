import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // For navigation after login
import { AuthServiceService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel!: FormGroup;
  loading = false;
  errorMessage: string = '';

  get email() {
    return this.loginModel.get('email');
  }

  get password() {
    return this.loginModel.get('password');
  }

  constructor(
    private _authService: AuthServiceService,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this._authService.userData.getValue() !== null) {
      this.router.navigate(['/blank']);
    }
    this.createForm();
  }

  createForm() {
    this.loginModel = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(model: FormGroup) {
    if (model.invalid) {
      return; // Prevent submission if form is invalid
    }

    this.loading = true;
    this.errorMessage = '';

    // Call the AuthService to perform the login
    this._authService.login(model.value).subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        this._authService.setToken(response.token);
        this._authService.decodeUserData(response.token);
        this.router.navigate(['/blank']); // Update with the correct route after login
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Invalid email or password. Please try again.'; // Display error message
      },
    });
  }
}
