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
import { SubjectServiceService } from '../../shared/subject-service.service';
import { Subject } from '../../models/subject';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-subject',
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
    MatOption,
    MatSelectModule
  ],
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css'],
})
export class EditSubjectComponent implements OnInit {
  userConnected!: User;
  _id!:string;
  subjectForm: FormGroup;
  base64Image: string | null = null;
  name = '';
  firstname = '';
  login = '';
  role = 1;
  photo = '';
  subjectTransmis!:Subject;
  teachers: User[] = [];
  teacher!:string;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router:Router,
    private subjectsService:SubjectServiceService,
  ) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      image: [null],
      photo: [null],
    });
  }

  ngOnInit(): void {
    let data = window.localStorage.getItem('user');
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log('No user data found in localStorage.');
    }

    if (this.userConnected) {
      this.getTeachers(1,1000);
      this.titleService.changeTitle(`Edit subject`);
      const id = this.route.snapshot.params['id'];
      this.subjectsService.getDetailSubject(id)
      .subscribe(subject => {
        this.subjectTransmis = subject;
        this.subjectForm.patchValue({
          name: this.subjectTransmis?.name,
          photo: this.subjectTransmis?.photo,
          _id:this.subjectTransmis?._id,
          teacher:this.subjectTransmis.teacher._id,
        });
      });
    }
  }


  getTeachers(page: number, limit: number) {
    this.usersService.getTeachers(page, limit)
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
        if (this.subjectTransmis) {
          this.subjectTransmis.photo = reader.result as string;
          this.subjectForm.patchValue({
            photo: this.subjectTransmis.photo,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // onSubmit() {
  //   // console.log(this.subjectForm);
  //   if (this.subjectForm.valid) {
  //     this.subjectForm.value.name = this.name;
  //     this.subjectForm.value._id = this.subjectTransmis._id;
  //     this.subjectForm.value.teacher = this.teacher;
  //     this.base64Image = null;
  //     const newSubject = this.subjectForm.value;
  //     console.log(newSubject);
  //     this.subjectsService
  //     .updateService(newSubject)
  //       .subscribe(response => {
  //         this.subjectForm.reset();
  //         this.router.navigate(['/subjects']);
  //     });
  //   }
  // }

  onSubmit() {
    if (this.subjectForm.valid) {
      let newSubject = this.subjectForm.value;
      newSubject._id=this.subjectTransmis._id;
      delete newSubject.image;
      console.log(newSubject);
      this.subjectsService
      .updateService(newSubject)
        .subscribe(response => {
          this.subjectForm.reset();
          this.router.navigate(['/subjects']);
      });
    }
  }


}
