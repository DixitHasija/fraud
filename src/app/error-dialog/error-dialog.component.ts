import { Component, inject, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      yesButtonText: string;
      noButtonText: string;
      title: string;
      info: string;
      onYesClick: () => void;
      onNoClick: () => void;
    }
  ) {}
  info: Record<string, string | boolean> = {
    topHeading: "You'r Data Maybe Effected",
    title: 'This looked like an anomaly. Do you want to Report this',
  };

  ngOnInit(): void {
    // Initialization logic here
    console.log('ErrorDialogComponent initialized with data:', this.data);
  }
  onYesClick(): void {
    // Call the external method here
    this.dialogRef.close(true);
  }
  // You'r Data Maybe Effected
  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
