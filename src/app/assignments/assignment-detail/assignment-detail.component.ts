import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import  {RouterLink} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../models/token';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatIconModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {

  userConnected!: User;

  assignmentTransmis!: Assignment|undefined;

  isEdit = false;
  isRemove = false;
  isMark = false;

  constructor(private assignmentsService:AssignmentsService,
              private authService:AuthService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog: MatDialog) { }

  ngOnInit() {

    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      const id = this.route.snapshot.params['id'];
      this.assignmentsService.getDetailAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        this.getRoleButton(this.userConnected, this.assignmentTransmis)
      });
    }

  }

  getRoleButton(userConnected: User, assignment: Assignment|undefined) {
    if(assignment) {
      if(userConnected.role == 3) {
        this.isEdit = true;
        this.isRemove = true;
      } if(userConnected.role == 2) {
        if(assignment?.subject.teacher._id == userConnected.id) {
          this.isEdit = true;
          this.isRemove = true;
          if(!assignment?.isMark) {
            this.isMark = true;
          }
        }
      }
    }
  }

  openDeleteDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {assignment: assignment},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        console.log("delete");
      } else {
        console.log("not delete");
      }
    });
  }

  onAssignmentRendu() {
    // on a cliqué sur la checkbox, on change le statut de l'assignment
    // if(this.assignmentTransmis) {
    //   this.assignmentTransmis.rendu = true;
    //   this.assignmentsService.updateAssignment(this.assignmentTransmis)
    //   .subscribe(message => {
    //     console.log(message);
    //     // on navigue vers la liste des assignments
    //     this.router.navigate(['/home']);
    //   });
    // }
  }

  onDelete() {
    // on va directement utiliser le service
    // if(this.assignmentTransmis) {
    //   this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    //   .subscribe(message => {
    //     console.log(message);
    //     // on va cacher la vue de detail en mettant assignmentTransmis à undefined
    //     this.assignmentTransmis = undefined;
    //     // on navigue vers la liste des assignments
    //     this.router.navigate(['/home']);
    //   });
    // }
  }

  // isAdmin() {
  //   return this.authService.loggedIn;
  // }
}
