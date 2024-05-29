import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatListModule, MatNavList} from '@angular/material/list';
import { Router } from '@angular/router';
import { User } from '../../models/token';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatNavList,
    MatListModule,
    CommonModule
  ],
  templateUrl: 'sidebar.component.html',
  styleUrl: 'sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  userConnected!: User;

  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
  ) {}

  ngOnInit(): void {
    let dataUser = window.localStorage.getItem("user");
    let dataToken = window.localStorage.getItem("token");
    if(dataUser && dataToken) {
      this.userConnected = JSON.parse(dataUser);
    }
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  goToAssignmentList() {
    if(this.userConnected.role == 1) this.router.navigate(['/student/assignments']);
    if(this.userConnected.role == 2) this.router.navigate(['/teacher/assignments']);
    if(this.userConnected.role == 3) this.router.navigate(['/admin/assignments']);
  }

  goToStudentList() {
    this.router.navigate(['/students']);
  }

  goToTeacherList() {
    this.router.navigate(['/teachers']);
  }

  goToSubjectList() {
    this.router.navigate(['/subjects']);
  }

  goToStudentNote() {
    this.router.navigate(['/assignments/student/average']);
  }

  goToTeacherNote() {
    this.router.navigate(['/assignments/teacher/average']);
  }
}
