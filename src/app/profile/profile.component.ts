import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../models/token';
import { TitleService } from '../shared/title.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  userConnected!: User;
  role!: string;

  constructor(
    private titleService: TitleService
  ){}

  ngOnInit() {
    let data = window.localStorage.getItem("user");
    if (data) {
      this.userConnected = JSON.parse(data);
      if(this.userConnected.role == 1) this.role = "Student"
      if(this.userConnected.role == 2) this.role = "Teacher"
      if(this.userConnected.role == 1) this.role = "Administrator"
    } else {
      console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
    }
    this.titleService.changeTitle('My profile');
  }
}
