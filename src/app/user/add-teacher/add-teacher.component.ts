import { Component, OnInit } from '@angular/core';
import { User } from '../../models/token';
import { TitleService } from '../../shared/title.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { UsersService } from '../../shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
    MatCardActions,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
  ],
  templateUrl: './add-teacher.component.html',
  styleUrl: './add-teacher.component.css'
})
export class AddTeacherComponent implements OnInit {

  userConnected!: User;
  teacherForm: FormGroup;
  base64Image: string | null = null;
  name = '';
  firstname = '';
  login = '';
  password = '';
  role = 2;
  photo = '';

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ){
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      image: [null],
      photo: [null],
    });
  }

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.titleService.changeTitle(`Add a teacher`);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files);
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        console.log(this.base64Image);
        this.teacherForm.patchValue({
          photo: this.base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      this.teacherForm.value.role = this.role;
      this.base64Image = null;
      const newTeacher = this.teacherForm.value;

      this.usersService
      .createUser(newTeacher)
        .subscribe(response => {
          this.teacherForm.reset();
          this.router.navigate(['/students']);
      });
    }
  }
}
