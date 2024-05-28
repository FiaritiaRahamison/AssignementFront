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
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { SubjectListComponent } from './subject-list/subject-list.component';

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

  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  }
];
