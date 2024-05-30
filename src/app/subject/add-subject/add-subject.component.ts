import { Component, OnInit } from '@angular/core';
import { User } from '../../models/token';
import { TitleService } from '../../shared/title.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardActions, MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { Router } from '@angular/router';
import { UsersService } from '../../shared/users.service';
import {MatSelectModule} from '@angular/material/select';
import { SubjectServiceService } from '../../shared/subject-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-subject',
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
    MatSelectModule,
  ],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent implements OnInit {

  userConnected!: User;
  subjectForm: FormGroup;
  teachers:any;
  teacher!:string;
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
    private subjectService: SubjectServiceService,
    private router: Router,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ){
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      teacher:['', Validators.required],
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
      this.titleService.changeTitle(`Add a subject`);
      this.getTeachers(1,1000);

    }
  }

  getTeachers(page: number, limit: number) {
    this.userService.getTeachers(page, limit)
    .subscribe((data) => {
      this.teachers = data.docs;
      console.log(this.teachers);
    });
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
        this.subjectForm.patchValue({
          photo: this.base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      this.subjectForm.value.role = this.role;
      this.base64Image = null;
      const newTeacher = this.subjectForm.value;

      this.subjectService
      .createSubject(newTeacher)
        .subscribe(response => {
          this.subjectForm.reset();
          this.snackBar.open("Subject created", "", {
            duration: 3000
          });
          this.router.navigate(['/subjects']);
      });
    }
  }
}
