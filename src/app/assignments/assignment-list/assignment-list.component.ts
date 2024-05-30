import { Component, OnInit  } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Assignment } from '../../models/assignment.model';
import { User } from '../../models/token';
import { AssignmentsService } from '../../shared/assignments.service';
import { CommonModule, DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TitleService } from '../../shared/title.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import  {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatButtonModule, MatPaginatorModule,
    CdkDropList, CdkDrag, RouterLink, MatIconModule, MatProgressSpinnerModule, CommonModule
  ],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {

  userConnected!: User;
  isLoading = false;

  //Assignment not done
  assignmentNotDone: Assignment[] = [];
  pageNotDone = 1;
  limitNotDone = 10;
  totalDocsNotDone!: number;
  totalPagesNotDone!: number;
  nextPageNotDone!: number;
  prevPageNotDone!: number;
  hasNextPageNotDone!: boolean;
  hasPrevPageNotDone!: boolean;

  //Assignment done but not marked
  assignmentDone: Assignment[] = [];
  pageDone = 1;
  limitDone = 10;
  totalDocsDone!: number;
  totalPagesDone!: number;
  nextPageDone!: number;
  prevPageDone!: number;
  hasNextPageDone!: boolean;
  hasPrevPageDone!: boolean;

  //Assignment is marked
  assignmentMarked: Assignment[] = [];
  pageMarked = 1;
  limitMarked = 10;
  totalDocsMarked!: number;
  totalPagesMarked!: number;
  nextPageMarked!: number;
  prevPageMarked!: number;
  hasNextPageMarked!: boolean;
  hasPrevPageMarked!: boolean;

  displayedColumns: string[] = ['title', 'deadline', 'subject', 'teacher', 'option'];
  displayedColumns1: string[] = ['title', 'deadline', 'subject', 'teacher', 'option'];
  displayedColumns2: string[] = ['title', 'deadline', 'subject', 'teacher', 'option'];

  constructor(
    private assignmentService: AssignmentsService,
    private titleService: TitleService
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
      this.titleService.changeTitle(`List of ${this.userConnected.name} ${this.userConnected.firstname}'s assignments`);
      this.getAssignmentNotDone(this.pageNotDone, this.limitNotDone);
      this.getAssignmentDone(this.pageDone, this.limitDone);
      this.getAssignmentMarked(this.pageMarked, this.limitMarked);
    }
  }


  getAssignmentNotDone(page: number, limit: number) {

    this.assignmentService.getAssignmentAuthorWhereIsNotDone(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.assignmentNotDone = data.docs;
      this.totalDocsNotDone = data.totalDocs;
      this.totalPagesNotDone = data.totalPages;
      this.nextPageNotDone = data.nextPage;
      this.prevPageNotDone = data.prevPage;
      this.hasNextPageNotDone = data.hasNextPage;
      this.hasPrevPageNotDone = data.hasPrevPage;
    })
  }

  onPageChangeNotDone(event: PageEvent) {
    this.pageNotDone = event.pageIndex + 1;
    this.limitNotDone = event.pageSize;
    this.isLoading = true;
    this.getAssignmentNotDone(this.pageNotDone, this.limitNotDone);
  }

  getAssignmentDone(page: number, limit: number) {

    this.assignmentService.getAssignmentAuthorWhereIsDone(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.assignmentDone = data.docs;
      this.totalDocsDone = data.totalDocs;
      this.totalPagesDone = data.totalPages;
      this.nextPageDone = data.nextPage;
      this.prevPageDone = data.prevPage;
      this.hasNextPageDone = data.hasNextPage;
      this.hasPrevPageDone = data.hasPrevPage;
    })
  }

  onPageChangeDone(event: PageEvent) {
    this.pageDone = event.pageIndex + 1;
    this.limitDone = event.pageSize;
    this.isLoading = true;
    this.getAssignmentDone(this.pageDone, this.limitDone);
  }

  getAssignmentMarked(page: number, limit: number) {

    this.assignmentService.getAssignmentAuthorWhereIsMarked(page, limit)
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
      item.isDone = event.container.data === this.assignmentDone;
      console.log('item', item);
      this.isLoading = true;

      this.assignmentService.addAssignmentResult(item._id)
      .subscribe({
        next: data => {
          this.getAssignmentNotDone(this.pageNotDone, this.limitNotDone);
          this.getAssignmentDone(this.pageDone, this.limitDone);
          this.getAssignmentMarked(this.pageMarked, this.limitMarked);
        },
        error: (e) => {
          this.getAssignmentNotDone(this.pageNotDone, this.limitNotDone);
          this.getAssignmentDone(this.pageDone, this.limitDone);
          this.getAssignmentMarked(this.pageMarked, this.limitMarked);
        }
      })
    }
  }
}
