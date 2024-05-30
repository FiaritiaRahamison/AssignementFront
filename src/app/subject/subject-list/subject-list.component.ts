import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { SubjectServiceService } from '../../shared/subject-service.service';
import { User } from '../../models/token';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from '../../models/subject';
import  {RouterLink} from '@angular/router';
import { TitleService } from '../../shared/title.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSubjectDialogComponent } from '../delete-subject-dialog/delete-subject-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,
    MatIconModule, MatPaginatorModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent implements OnInit {

  userConnected!: User;
  isLoading = false;

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
    private subjectService: SubjectServiceService,
    private titleService: TitleService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }

    if(this.userConnected) {
      this.isLoading = true;
      this.titleService.changeTitle(`List of subjects`);
      this.getSubjects(this.page, this.limit);
    }
  }

  getSubjects(page: number, limit: number) {
    this.subjectService.getSubjects(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
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

  openDeleteDialog(subject: Subject): void {
    const dialogRef = this.dialog.open(DeleteSubjectDialogComponent, {
      data: {subject: subject}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.subjectService.deleteService(result)
        .subscribe({
          next: data => {
            this.snackBar.open("Subject deleted", "", {
              duration: 3000
            });
            this.getSubjects(this.page, this.limit);
          },
          error: (e) => {
            this.snackBar.open(e.message, "", {
              duration: 3000
            });
            this.getSubjects(this.page, this.limit);
          }
        })
      }
    })
  }

}
