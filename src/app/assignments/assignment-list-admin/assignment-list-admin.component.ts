import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { User } from '../../models/token';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import  { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { TitleService } from '../../shared/title.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignment-list-admin',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, DatePipe, RouterLink,
    MatButtonModule, CommonModule, MatIconModule
  ],
  templateUrl: './assignment-list-admin.component.html',
  styleUrl: './assignment-list-admin.component.css'
})
export class AssignmentListAdminComponent implements OnInit {

  userConnected!: User;

  assignments: Assignment[] = [];
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  displayedColumns: string[] = ['title', 'deadline', 'subject', 'teacher', 'mark', 'remark', 'option'];


  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog,
    private titleService: TitleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.titleService.changeTitle('Assignments list');
      this.getAssignments(this.page, this.limit);
    }
  }

  getAssignments(page: number, limit: number) {
    this.assignmentService.getAssignments(page, limit)
    .subscribe((data) => {
      this.assignments = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    })
  }

  openDeleteDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {assignment: assignment},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.assignmentService.deleteAssignment(result)
        .subscribe({
          next: data => {
            this.snackBar.open(data.message, "", {
              duration: 3000
            });
            this.getAssignments(this.page, this.limit);
          },
          error: (e) => {
            this.snackBar.open(e.message, "", {
              duration: 3000
            });
            this.getAssignments(this.page, this.limit);
          }
        })
      } else {
        console.log("not delete");
      }
    });
  }
}
