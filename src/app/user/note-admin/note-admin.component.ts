import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { User } from '../../models/token';
import { AssignmentsService } from '../../shared/assignments.service';
import { TitleService } from '../../shared/title.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-note-admin',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule],
  templateUrl: './note-admin.component.html',
  styleUrl: './note-admin.component.css'
})
export class NoteAdminComponent implements OnInit {

  userConnected!: User;

  notes: Note[] = [];
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  displayedColumns: string[] = ['subject', 'teacher', 'mark'];

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
      this.titleService.changeTitle(`Subjects average marks`);
      this.getAverageMark();
    }

  }

  getAverageMark() {
    this.assignmentService.getAverageMarkAdmin(this.page, this.limit)
    .subscribe((data) => {
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
    this.getAverageMark();
  }

}
