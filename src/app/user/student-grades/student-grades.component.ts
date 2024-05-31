import { Component } from '@angular/core';
import { TitleService } from '../../shared/title.service';
import { UsersService } from '../../shared/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/token';
import { MatCell, MatColumnDef, MatFooterCell, MatFooterCellDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [MatTableModule, MatRow, MatHeaderRow, MatCell, MatHeaderCell, MatTable, MatRowDef, MatHeaderRowDef, MatColumnDef, MatFooterCellDef, MatFooterCell, MatProgressSpinnerModule, CommonModule],
  templateUrl: './student-grades.component.html',
  styleUrl: './student-grades.component.css'
})
export class StudentGradesComponent {
  userConnected!: User;
  isLoading = false;

  moyenne:any;
  grades:any;

  displayedColumns: string[] = ['subject', 'note'];

  constructor(
    private titleService: TitleService,
    private usersService: UsersService,
    private route:ActivatedRoute,
    private router:Router,
  ) {
  }

  ngOnInit(): void {
    let data = window.localStorage.getItem('user');
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log('Aucune donnée utilisateur trouvée dans le localStorage.');
    }

    if (this.userConnected) {
      this.isLoading = true;
      this.titleService.changeTitle(`Edit student`);
      const id = this.route.snapshot.params['id'];
      this.usersService.getUserGrade(id)
      .subscribe(data => {
        this.isLoading = false;
        this.moyenne = data.moyenne;
        this.grades =data.notes;
        console.log(this.moyenne);
        console.log(this.grades);
      });
    }
  }

}
