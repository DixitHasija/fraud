import { Component, inject } from '@angular/core'
import { HttpService } from '../services/http.service'
import { firstValueFrom } from 'rxjs'
import { MatDateFormats } from '@angular/material/core'
import { MatDialog } from '@angular/material/dialog'
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  http = inject(HttpService)
  dialog = inject(MatDialog)
  today: Date = new Date() // Set today’s date

  formData = {
    date: new Date(),
    seller_id: '',
    total_shipment: '',
    lost_shipment: '',
  }
  getData = async () => {
    // let data = await firstValueFrom(
    //   this.http.requestByUrl(
    //     'https://cfe4-14-194-36-134.ngrok-free.app/v1/fraud-approvals/list'
    //   )
    // )

    let data1 = await firstValueFrom(
      this.http.postByUrl(
        'https://cfe4-14-194-36-134.ngrok-free.app/v1/fraud-detection/shipment-lost',
        this.formData
      )
    )

    this.openErrorDialog()
    /**

     */
  }
  convertDate(inputDate: string): string {
    const [month, day, year] = inputDate.split('/') // Split MM/DD/YYYY
    return `${year}-${month}-${day}` // Reformat to YYYY/MM/DD
  }

  onLoad = () => {

    this.getData()
  }
  openErrorDialog() {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '600px',
      data: {
        yesButtonText: "",
        noButtonText: "",
        title: "",
        info: ""
      }
    })

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result) // true if Yes, false if No
    })
  }

}
