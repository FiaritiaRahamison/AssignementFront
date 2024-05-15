import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { User } from '../../models/token';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { DatePipe } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-assignment-list-teacher',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatButtonModule],
  templateUrl: './assignment-list-teacher.component.html',
  styleUrl: './assignment-list-teacher.component.css'
})
export class AssignmentListTeacherComponent implements OnInit {

  userConnected!: User;

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
    private assignmentService: AssignmentsService
  ){}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }
    if(this.userConnected) {
      this.getAssignmentNotMarked(this.userConnected.name, this.userConnected.firstname, this.pageNotMarked, this.limitNotMarked);
      this.getAssignmentMarked(this.userConnected.name, this.userConnected.firstname, this.pageMarked, this.limitMarked);
    }

  }

  getAssignmentNotMarked(name: string, firstname: string, page: number, limit: number) {

    this.assignmentService.getAssignmentTeacherNotNoted(name, firstname, page, limit)
    .subscribe((data) => {
      this.assignmentNotMarked = data.docs;
      this.totalDocsNotMarked = data.totalDocs;
      this.totalPagesNotMarked = data.totalPages;
      this.nextPageNotMarked = data.nextPage;
      this.prevPageNotMarked = data.prevPage;
      this.hasNextPageNotMarked = data.hasNextPage;
      this.hasPrevPageNotMarked = data.hasPrevPage;
    })
  }

  getAssignmentMarked(name: string, firstname: string, page: number, limit: number) {

    this.assignmentService.getAssignmentTeacherNoted(name, firstname, page, limit)
    .subscribe((data) => {
      this.assignmentMarked = data.docs;
      this.totalDocsMarked = data.totalDocs;
      this.totalPagesMarked = data.totalPages;
      this.nextPageMarked = data.nextPage;
      this.prevPageMarked = data.prevPage;
      this.hasNextPageMarked = data.hasNextPage;
      this.hasPrevPageMarked = data.hasPrevPage;
    })
  }

}
