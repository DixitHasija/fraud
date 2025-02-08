import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      yesButtonText: string
      noButtonText: string
      title: string
      info: string
      onYesClick: (data: any) => void
      onNoClick: (data: any) => void
      comment: boolean
    }
  ) {}
  info: Record<string, string | boolean> = {
    topHeading: "You'r Data Maybe Effected",
    title: 'This looked like an anomaly. Do you want to Report this',
  }
  comment = ''

  ngOnInit(): void {
    // Initialization logic here
    console.log('ErrorDialogComponent initialized with data:', this.data)
  }
  onYesClick(): void {
    // Call the external method here
    if (this.data?.onYesClick) {
      this.data.onYesClick(this.comment)
    }
    this.dialogRef.close(true)
  }
  // You'r Data Maybe Effected
  onNoClick(): void {
    if (this.data?.onNoClick) {
      this.data.onNoClick(this.comment)
    }
    this.dialogRef.close(false)
  }
}
