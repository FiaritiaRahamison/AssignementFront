import { Routes } from '@angular/router';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AssignmentListComponent } from './assignments/assignment-list/assignment-list.component';
import { AssignmentListTeacherComponent } from './assignments/assignment-list-teacher/assignment-list-teacher.component';
import { AssignmentListAdminComponent } from './assignments/assignment-list-admin/assignment-list-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { StudentListComponent } from './user/student-list/student-list.component';
import { TeacherListComponent } from './user/teacher-list/teacher-list.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';
import { AddSubjectComponent } from './subject/add-subject/add-subject.component';
import { AddTeacherComponent } from './user/add-teacher/add-teacher.component';
import { AddStudentComponent } from './user/add-student/add-student.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: AuthenticationComponent },
  { path: "assignment/add", component: AddAssignmentComponent },
  { path: "assignment/:id", component: AssignmentDetailComponent},
  { path: "login", component: AuthenticationComponent},
  { path: "student/assignments", component: AssignmentListComponent},
  { path: "teacher/assignments", component: AssignmentListTeacherComponent},
  { path: "admin/assignments", component: AssignmentListAdminComponent},
  { path: "user/profile", component: ProfileComponent},
  { path: "students", component: StudentListComponent},
  { path: "teachers", component: TeacherListComponent},
  { path: "subjects", component: SubjectListComponent},
  { path: "subjects/add", component: AddSubjectComponent},
  { path: "teachers/add", component: AddTeacherComponent},
  { path: "students/add", component: AddStudentComponent},

  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  }
];
