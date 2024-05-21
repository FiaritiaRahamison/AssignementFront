import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AssignmentListComponent } from './assignments/assignment-list/assignment-list.component';
import { AssignmentListTeacherComponent } from './assignments/assignment-list-teacher/assignment-list-teacher.component';
import { AssignmentListAdminComponent } from './assignments/assignment-list-admin/assignment-list-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: "add", component: AddAssignmentComponent },
  { path: "assignment/:id", component: AssignmentDetailComponent},
  { path: "login", component: AuthenticationComponent},
  { path: "student/assignments", component: AssignmentListComponent},
  { path: "teacher/assignments", component: AssignmentListTeacherComponent},
  { path: "admin/assignments", component: AssignmentListAdminComponent},

  {
    path: "assignment/:id/edit",
    component: EditAssignmentComponent,
    canActivate: [authGuard]
  }
];
