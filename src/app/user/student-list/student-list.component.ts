import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { UsersService } from '../../shared/users.service';
import { User } from '../../models/token';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TitleService } from '../../shared/title.service';
import  {RouterLink} from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,
    MatIconModule, MatPaginatorModule, RouterLink
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  userConnected!: User;

  students: User[] = [];
  page = 1;
  limit = 8;
  totalDoc!: number;
  totalPage!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(
    private userService: UsersService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.titleService.changeTitle(`List of students`);
      this.getStudents(this.page, this.limit);
    }
  }

  getStudents(page: number, limit: number) {
    this.userService.getUsers(page, limit)
    .subscribe((data) => {
      this.students = data.docs;
      this.totalDoc = data.totalDocs;
      this.totalPage = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.hasPrevPage = data.hasPrevPage;
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getStudents(this.page, this.limit);
  }

  // get startIndex(): number {
  //   return this.currentPageIndex * this.pageSize;
  // }

  // get endIndex(): number {
  //   return this.startIndex + this.pageSize;
  // }
}
