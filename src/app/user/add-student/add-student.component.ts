import { Component, OnInit } from '@angular/core';
import { User } from '../../models/token';
import { TitleService } from '../../shared/title.service';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    NgIf,
  ],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {

  userConnected!: User;
  studentForm: FormGroup;
  base64Image: string | null = null;

  constructor(
    private titleService: TitleService,
    private fb: FormBuilder
  ){
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      image:[null],
      photo:[null]

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
      this.titleService.changeTitle(`Add a student`);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
console.log(input.files)
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
console.log(this.base64Image)
        this.studentForm.patchValue({
          photo: this.base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      this.studentForm.reset();
      this.base64Image = null;
    }
  }
}
