import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../../models/assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/token';
import { TitleService } from '../../shared/title.service';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardActions,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatProgressSpinnerModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {

  userConnected!: User;
  isLoading = false;

  _id!:string;
  title = '';
  description = '';
  deadline?: Date = undefined;
  assignmentTransmis!: Assignment;
  assignmentForm!: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  private requireIfEmpty(control: AbstractControl): ValidatorFn | null {
    return control.value ? null : Validators.required;
  }

  createForm() {
    this.assignmentForm = this.fb.group({
      title: ['', this.requireIfEmpty],
      description: [''],
      deadline: ['', this.requireIfEmpty],
    });
  }

  ngOnInit() {
    let data = window.localStorage.getItem('user');
    if (data) {
      this.userConnected = JSON.parse(data);
    } else {
      console.log('Aucune donnée utilisateur trouvée dans le localStorage.');
    }

    if (this.userConnected) {
      this.titleService.changeTitle(`Edit assignment`);
      this.isLoading = true;
      const id = this.route.snapshot.params['id'];
      this.assignmentsService.getDetailAssignment(id)
      .subscribe(assigment => {
        this.isLoading = false
        this.assignmentTransmis = assigment;
        this.assignmentForm.patchValue({
          title: this.assignmentTransmis.title,
          description: this.assignmentTransmis.description,
          deadline: this.assignmentTransmis.deadline,
          _id: this.assignmentTransmis._id
        })
      })
    }
  }

  onSubmit() {
    if(this.assignmentForm.valid) {
      this.assignmentForm.value._id = this.assignmentTransmis._id;
      const newAssignment = this.assignmentForm.value;
      console.log(newAssignment);
      this.assignmentsService.updateAssignment(newAssignment)
      .subscribe(response => {
        this.assignmentForm.reset();
        this.snackBar.open(response.message, "", {
          duration: 3000
        });
        this.router.navigate(['/home']);
      })
    }
  }

}
