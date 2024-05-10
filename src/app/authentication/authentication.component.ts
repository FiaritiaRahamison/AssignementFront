import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,
            MatInputModule, MatIconModule,
            MatButtonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  hide = true;

  username = '';
  password = '';
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router : Router
  ){}

  onSubmit() {
    if((this.username == '') || (this.password == '')) {
      this.errorMessage = 'The username and the password are required';
    } else {
      this.authService.logIn(this.username, this.password)
      .subscribe({
        next: data => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.router.navigate(['/home']);
        },
        error: (e) => {
          this.errorMessage = e?.error?.message;
        }
      });
    }
  }
}
