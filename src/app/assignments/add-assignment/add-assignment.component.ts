import { Component, OnInit } from '@angular/core';
import { FormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import { Assignment } from '../../models/assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { User } from '../../models/token';
import { TitleService } from '../../shared/title.service';
import { SubjectServiceService } from '../../shared/subject-service.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent implements OnInit{
  userConnected!: User;

  // champs du formulaire
  title = '';
  deadline = undefined;
  description ='';
  minDate = new Date();
  subject:any;

  constructor(
    private assignmentsService: AssignmentsService,
    private subjectService:SubjectServiceService,
    private router: Router,
    private titleService: TitleService
  ) {
    this.minDate = new Date();
  }

ngOnInit(): void {
  let data = window.localStorage.getItem("user");
  if (data) {
    this.userConnected = JSON.parse(data);
  } else {
    console.log("Aucune donnée utilisateur trouvée dans le localStorage.");
  }

  if(this.userConnected) {
    this.titleService.changeTitle(`Add an assignment`);
    this.subjectService.getRelatedTeacher(this.userConnected.id)
  .subscribe((data) => {
    this.subject = data;
  })
  }
}
  onSubmit(event: any) {
    if((this.title == '') || (this.deadline === undefined) || this.description === '') return;

    // on crée un nouvel assignment
    let nouvelAssignment = new Assignment();

    // on genere un id aléatoire (plus tard ce sera fait coté serveur par
    // une base de données)
    nouvelAssignment.title = this.title;
    nouvelAssignment.deadline = this.deadline;
    nouvelAssignment.description=this.description;
    nouvelAssignment.subject = this.subject;
    console.log(nouvelAssignment);

    // on utilise le service pour directement ajouter
    // le nouvel assignment dans le tableau
    this.assignmentsService
      .addAssignment(nouvelAssignment)
      .subscribe((reponse) => {
      console.log(nouvelAssignment);
        console.log(reponse);
       // On navigue pour afficher la liste des assignments
       // en utilisant le router de manière programmatique
        this.router.navigate(['/teacher/assignments']);
      });
  }

}
