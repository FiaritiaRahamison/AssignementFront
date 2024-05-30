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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-student',
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
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent implements OnInit {
  userConnected!: User;
  _id!:string;
  studentForm: FormGroup;
  base64Image: string | null = null;
  name = '';
  firstname = '';
  login = '';
  role = 1;
  photo = '';
  studentTransmis!:User;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      login: ['', Validators.required],
      image: [null],
      photo: [null],
    });
  }

  ngOnInit(): void {
    let data = window.localStorage.getItem('user');
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log('Aucune donnée utilisateur trouvée dans le localStorage.');
    }

    if (this.userConnected) {
      this.titleService.changeTitle(`Edit student`);
      const id = this.route.snapshot.params['id'];
      this.usersService.getDetailUser(id)
      .subscribe(teacher => {
        this.studentTransmis = teacher;
        console.log(this.studentTransmis._id);
        this.studentForm.patchValue({
          name: this.studentTransmis?.name,
          firstname: this.studentTransmis?.firstname,
          login: this.studentTransmis?.login,
          photo: this.studentTransmis?.photo,
          _id:this.studentTransmis?._id
        });
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log(input.files);
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (this.studentTransmis) {
          this.studentTransmis.photo = reader.result as string;
          this.studentForm.patchValue({
            photo: this.studentTransmis.photo,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // console.log(this.studentForm);
    if (this.studentForm.valid) {
      this.studentForm.value.role = this.role;
      this.studentForm.value._id = this.studentTransmis._id;
      this.base64Image = null;
      const newStudent = this.studentForm.value;
      console.log(newStudent);
      this.usersService
      .updateUser(newStudent)
        .subscribe(response => {
          this.studentForm.reset();
          this.snackBar.open("Student edited", "", {
            duration: 3000
          });
          this.router.navigate(['/students']);
      });
    }
  }

}
