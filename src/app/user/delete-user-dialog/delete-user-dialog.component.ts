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
import { User } from '../../models/token';

interface userDialogData {
  user: User;
}

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions,
    MatDialogClose, CommonModule, MatButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.css'
})
export class DeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
