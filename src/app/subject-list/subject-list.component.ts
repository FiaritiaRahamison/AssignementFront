import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { SubjectServiceService } from '../shared/subject-service.service';
import { User } from '../models/token';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,
    MatIconModule, MatPaginatorModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {

  userConnected!: User;

  subjects: Subject[] = [];
  page = 1;
  limit = 8;
  totalDoc!: number;
  totalPage!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(
    private subjectService: SubjectServiceService
  ) {}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.getSubjects(this.page, this.limit);
    }
  }

  getSubjects(page: number, limit: number) {
    this.subjectService.getSubjects(page, limit)
    .subscribe((data) => {
      this.subjects = data.docs;
      this.totalDoc = data.totalDocs;
      this.totalPage = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    })
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getSubjects(this.page, this.limit);
  }

}
