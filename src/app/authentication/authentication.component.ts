import { Component, OnInit } from '@angular/core';
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
import { User } from '../models/token';
import { UsersService } from '../shared/users.service';

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
export class AuthenticationComponent implements OnInit {
  hide = true;

  login = '';
  password = '';
  errorMessage!: string;
  authLoading = false;
  userConnected!: User;

  constructor(
    private authService: AuthService,
    private router : Router,
    private usersService: UsersService
  ){}

  ngOnInit(): void {
    let dataUser = window.localStorage.getItem("user");
    let dataToken = window.localStorage.getItem("token");
    if(dataUser && dataToken) {
      this.userConnected = JSON.parse(dataUser);
      if(this.userConnected.role == 1) this.router.navigate(['/student/assignments']);
      if(this.userConnected.role == 2) this.router.navigate(['/teacher/assignments']);
      if(this.userConnected.role == 3) this.router.navigate(['/admin/assignments']);
    }
  }

  onSubmit() {
    if((this.login == '') || (this.password == '')) {
      this.errorMessage = 'The username and the password are required';
    } else {
      this.authLoading = true;
      this.authService.logIn(this.login, this.password)
      .subscribe({
        next: response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.authLoading = false;
          if(response.data.user.role == 1) this.router.navigate(['/student/assignments']);
          if(response.data.user.role == 2) this.router.navigate(['/teacher/assignments']);
          if(response.data.user.role == 3) this.router.navigate(['/admin/assignments']);
        },
        error: (e) => {
          this.errorMessage = e?.error?.message;
          this.authLoading = false;
        }
      });
    }
  }
  genererDonneesUsers() {
    // VERSION AVEC Observable
    this.usersService.peuplerBDUsers()
    .subscribe(() => {
      console.log("Données générées pour users!");
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });
  }
}
