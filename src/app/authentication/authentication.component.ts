import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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
  errorMessage = '';

  onSubmit(event: any) {
    if((this.username == '') || (this.password == '')) {
      this.errorMessage = 'The username and the password are required';
    } else {
      console.log("Hey ");
    }
  }
}
