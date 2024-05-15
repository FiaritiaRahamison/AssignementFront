import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
            MatInputModule, MatIconModule,
            MatButtonModule, FormsModule,
            MatProgressSpinnerModule, CommonModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  hide = true;

  username = '';
  password = '';
  errorMessage!: string;
  authLoading = false;

  constructor(
    private authService: AuthService,
    private router : Router
  ){}

  onSubmit() {
    if((this.username == '') || (this.password == '')) {
      this.errorMessage = 'The username and the password are required';
    } else {
      this.authLoading = true;
      this.authService.logIn(this.username, this.password)
      .subscribe({
        next: data => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.authLoading = false;
          if(data.user.role == 1) this.router.navigate(['/student/assignments']);
          if(data.user.role == 2) this.router.navigate(['/teacher/assignments']);
        },
        error: (e) => {
          this.errorMessage = e?.error?.message;
          this.authLoading = false;
        }
      });
    }
  }
}
