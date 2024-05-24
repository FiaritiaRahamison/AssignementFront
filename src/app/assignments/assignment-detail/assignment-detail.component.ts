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
import { TitleService } from '../../shared/title.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

}
