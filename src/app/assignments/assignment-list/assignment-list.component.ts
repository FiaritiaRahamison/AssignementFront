import { Component, OnInit  } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-assignment-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './assignment-list.component.html',
  styleUrl: './assignment-list.component.css'
})
export class AssignmentListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  ngOnInit(): void {
    let data = window.localStorage.getItem("user");
    if (data) {
      let userData = JSON.parse(data);
      console.log(userData);
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }
  }


}
