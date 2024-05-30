import { Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Subject } from '../../models/subject';

interface subjectDialogData {
  subject: Subject;
}

@Component({
  selector: 'app-delete-subject-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions,
    MatDialogClose, CommonModule, MatButtonModule],
  templateUrl: './delete-subject-dialog.component.html',
  styleUrl: './delete-subject-dialog.component.css'
})
export class DeleteSubjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: subjectDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
