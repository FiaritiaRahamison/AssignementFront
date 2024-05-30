import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { UsersService } from '../../shared/users.service';
import { User } from '../../models/token';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TitleService } from '../../shared/title.service';
import  {Router, RouterLink} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule,
    MatIconModule, MatPaginatorModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {
  userConnected!: User;
  isLoading = false;

  teachers: User[] = [];
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
      this.titleService.changeTitle(`List of teachers`);
      this.getTeachers(this.page, this.limit);
    }
  }

  getTeachers(page: number, limit: number) {
    this.userService.getTeachers(page, limit)
    .subscribe((data) => {
      this.isLoading = false;
      this.teachers = data.docs;
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
    this.getTeachers(this.page, this.limit);
  }

  openDeleteDialog(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {user: user}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.userService.deleteUser(result)
        .subscribe({
          next: data => {
            this.snackBar.open("Teacher deleted", "", {
              duration: 3000
            });
            this.getTeachers(this.page, this.limit);
          },
          error: (e) => {
            this.snackBar.open(e.message, "", {
              duration: 3000
            });
            this.getTeachers(this.page, this.limit);
          }
        })
      }
    })
  }
}
