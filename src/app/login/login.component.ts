import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _router: Router, private _snackBar: MatSnackBar, private _userService: UserService) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(3)])
  })
  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;

      // Kullanıcıyı kaydet
      this._userService.setCurrentUser(email);
      console.log("Login info==>", this.loginForm.value);
      this._router.navigate(['/home']);
    } else {
      this._snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
    }
  }
}

