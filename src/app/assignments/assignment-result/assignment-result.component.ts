import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../models/assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import  {RouterLink} from '@angular/router';
import { User } from '../../models/token';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { TitleService } from '../../shared/title.service';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assignment-result',
  standalone: true,
  imports: [CommonModule, RouterLink,
    MatButtonModule, MatCardModule, MatCheckboxModule,
    MatIconModule, MatProgressSpinnerModule],
  templateUrl: './assignment-result.component.html',
  styleUrl: './assignment-result.component.css'
})
export class AssignmentResultComponent implements OnInit {

  userConnected!: User;

  assignmentTransmis!: Assignment|undefined;

  isEdit = false;
  isRemove = false;
  isMark = false;

  constructor(private assignmentsService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog: MatDialog,
              private titleService: TitleService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.titleService.changeTitle('Assignment detail');
      const id = this.route.snapshot.params['id'];
      this.assignmentsService.getResultsAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        this.getRoleButton(this.userConnected, this.assignmentTransmis);
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
        this.assignmentsService.deleteAssignment(result)
        .subscribe({
          next: data => {
            this.snackBar.open(data.message, "", {
              duration: 3000
            });
            this.router.navigate(['/home']);
          },
          error: (e) => {
            this.snackBar.open(e.message, "", {
              duration: 3000
            });
            this.router.navigate(['/home']);
          }
        })
      } else {
        console.log("not delete");
      }
    });
  }

  openAddNoteDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '30%',
      data: {assignment: assignment}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log('The note is:', result);
      }
    });
  }
}
