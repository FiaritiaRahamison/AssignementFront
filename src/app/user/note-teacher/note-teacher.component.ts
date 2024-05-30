import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { User } from '../../models/token';
import { AssignmentsService } from '../../shared/assignments.service';
import { TitleService } from '../../shared/title.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-note-teacher',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './note-teacher.component.html',
  styleUrl: './note-teacher.component.css'
})
export class NoteTeacherComponent implements OnInit {

  userConnected!: User;
  isLoading = false;

  notes: Note[] = [];
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  displayedColumns: string[] = ['student', 'mark'];

  constructor(
    private assignmentService: AssignmentsService,
    private titleService: TitleService,
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
      this.titleService.changeTitle(`Students average marks`);
      this.getAverageMark();
    }

  }

  getAverageMark() {
    this.assignmentService.getAverageMarkTeacher(this.page, this.limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.notes = data.docs;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    })
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.isLoading = true;
    this.getAverageMark();
  }

}
