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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-teacher',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  userConnected!: User;
  isLoading = false;

  _id!:string;
  teacherForm: FormGroup;
  base64Image: string | null = null;
  name = '';
  firstname = '';
  login = '';
  role = 2;
  photo = '';
  teacherTransmis!:User;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router:Router,
    private snackBar: MatSnackBar
  ) {
    this.teacherForm = this.fb.group({
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
      this.isLoading = true;
      this.titleService.changeTitle(`Edit teacher`);
      const id = this.route.snapshot.params['id'];
      this.usersService.getDetailUser(id)
      .subscribe(teacher => {
        this.isLoading = false;
        this.teacherTransmis = teacher;
        console.log(this.teacherTransmis._id);
        this.teacherForm.patchValue({
          name: this.teacherTransmis?.name,
          firstname: this.teacherTransmis?.firstname,
          login: this.teacherTransmis?.login,
          photo: this.teacherTransmis?.photo,
          _id:this.teacherTransmis?._id
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
        if (this.teacherTransmis) {
          this.teacherTransmis.photo = reader.result as string;
          this.teacherForm.patchValue({
            photo: this.teacherTransmis.photo,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // console.log(this.teacherForm);
    if (this.teacherForm.valid) {
      this.teacherForm.value.role = this.role;
      this.teacherForm.value._id = this.teacherTransmis._id;
      this.base64Image = null;
      const newStudent = this.teacherForm.value;
      // console.log(newStudent);
      this.usersService
      .updateUser(newStudent)
        .subscribe(response => {
          this.teacherForm.reset();
          this.snackBar.open("Teacher edited", "", {
            duration: 3000
          });
          this.router.navigate(['/teachers']);
      });
    }
  }

}
