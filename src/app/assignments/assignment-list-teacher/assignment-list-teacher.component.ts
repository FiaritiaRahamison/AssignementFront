import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/token';
import { Assignment } from '../../models/assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { DatePipe, CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import  {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { TitleService } from '../../shared/title.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assignment-list-teacher',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    CdkDropList,
    CdkDrag,
    MatPaginatorModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './assignment-list-teacher.component.html',
  styleUrl: './assignment-list-teacher.component.css'
})
export class AssignmentListTeacherComponent implements OnInit {

  userConnected!: User;
  isLoading = false;

  //Assignment not marked
  assignmentNotMarked: Assignment[] = [];
  pageNotMarked = 1;
  limitNotMarked = 10;
  totalDocsNotMarked!: number;
  totalPagesNotMarked!: number;
  nextPageNotMarked!: number;
  prevPageNotMarked!: number;
  hasNextPageNotMarked!: boolean;
  hasPrevPageNotMarked!: boolean;

  //Assignment marked
  assignmentMarked: Assignment[] = [];
  pageMarked = 1;
  limitMarked = 10;
  totalDocsMarked!: number;
  totalPagesMarked!: number;
  nextPageMarked!: number;
  prevPageMarked!: number;
  hasNextPageMarked!: boolean;
  hasPrevPageMarked!: boolean;

  displayedColumns: string[] = ['title', 'deadline', 'subject', 'student', 'option'];
  displayedColumns1: string[] = ['title', 'deadline', 'subject', 'student', 'option'];

  constructor(
    private assignmentService: AssignmentsService,
    private titleService: TitleService,
    public dialog: MatDialog
  ){}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }
    if(this.userConnected) {
      this.isLoading = true;
      this.titleService.changeTitle('List of assignments');
      this.getAssignmentNotMarked(this.pageNotMarked, this.limitNotMarked);
      this.getAssignmentMarked(this.pageMarked, this.limitMarked);
    }

  }

  getAssignmentNotMarked(page: number, limit: number) {

    this.assignmentService.getAssignmentTeacherNotNoted(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.assignmentNotMarked = data.docs;
      this.totalDocsNotMarked = data.totalDocs;
      this.totalPagesNotMarked = data.totalPages;
      this.nextPageNotMarked = data.nextPage;
      this.prevPageNotMarked = data.prevPage;
      this.hasNextPageNotMarked = data.hasNextPage;
      this.hasPrevPageNotMarked = data.hasPrevPage;
    })
  }

  onPageChangeNotMarked(event: PageEvent) {
    this.pageNotMarked = event.pageIndex + 1;
    this.limitNotMarked = event.pageSize;
    this.isLoading = true;
    this.getAssignmentNotMarked(this.pageNotMarked, this.limitNotMarked);
  }

  getAssignmentMarked(page: number, limit: number) {

    this.assignmentService.getAssignmentTeacherNoted(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.assignmentMarked = data.docs;
      this.totalDocsMarked = data.totalDocs;
      this.totalPagesMarked = data.totalPages;
      this.nextPageMarked = data.nextPage;
      this.prevPageMarked = data.prevPage;
      this.hasNextPageMarked = data.hasNextPage;
      this.hasPrevPageMarked = data.hasPrevPage;
    })
  }

  onPageChangeMarked(event: PageEvent) {
    this.pageMarked = event.pageIndex + 1;
    this.limitMarked = event.pageSize;
    this.isLoading = true;
    this.getAssignmentMarked(this.pageMarked, this.limitMarked);
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      var item = event.container.data[event.currentIndex];
      // item.isMark = event.container.data === this.assignmentMarked;
      // console.log('item', item);

      this.openAddNoteDialog(item);
    }
  }

  openAddNoteDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      width: '30%',
      data: {assignment: assignment}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log('The note is:', result);
        this.getAssignmentNotMarked(this.pageNotMarked, this.limitNotMarked);
        this.getAssignmentMarked(this.pageMarked, this.limitMarked);
      }
    });
  }
}
