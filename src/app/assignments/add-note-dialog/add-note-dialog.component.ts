import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  MatDialogTitle, MatDialogContent,MatDialogActions,MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { Assignment } from '../assignment.model';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  assignment: Assignment;
}

@Component({
  selector: 'app-add-note-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './add-note-dialog.component.html',
  styleUrl: './add-note-dialog.component.css'
})

export class AddNoteDialogComponent {
  mark = 0;
  remark='';

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(event: any) {
    if((this.mark == 0)) return;

    const updatedAssignment = { ...this.data.assignment, mark: this.mark, remark: this.remark, isMark: true };
    
    // TODO: Logique de modification d'assignment ici
    this.assignmentsService
      .updateAssignment(updatedAssignment)
      .subscribe(response => {
        console.log(response);
        this.dialogRef.close(updatedAssignment);
        this.router.navigate(['/teacher/assignments']);
    });
  }
}
