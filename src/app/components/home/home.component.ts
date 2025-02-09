import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../environment/environment';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  http = inject(HttpService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  today: Date = new Date(); // Set today’s date

  formData = {
    details_date: new Date(),
    company_id: '',
    total_shipment: 0,
    lost_shipment: 0,
  };
  getData = async () => {
    let data = { ...this.formData, 'action_type': 'lost_shipments' };
    data['details_date'] = moment(this.formData.details_date).format(
      'YYYY-MM-DD'
    ) as unknown as Date;
    data.total_shipment = Number(data.total_shipment);
    data.lost_shipment = Number(data.lost_shipment);
    let response: { message: string } = await firstValueFrom(
      this.http.postByUrl(
        `${environment.API_URL}/v1/fraud-detection/shipment-lost`,
        data
      )
    );

    if (response['message'] === 'Legit') {
      this.toastr.success('This Shipment is Legit!');
      this.formData = {
        details_date: new Date(),
        company_id: '',
        total_shipment: 0,
        lost_shipment: 0,
      };
    } else {
      this.openErrorDialog();
    }
  };

  onLoad = () => {
    this.getData();
  };
  openErrorDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        noButtonText: '🚨 Report as Fraud',
        yesButtonText: '✅ Confirm as Normal ',
        title: 'Action Required: Anomaly Detection Alert?',
        info: 'An anomaly has been detected and requires your review. Please take the necessary action.',
        onYesClick: (data: any) => {
          this.markShipment(false, data);
        },
        onNoClick: (data: any) => {
          this.markShipment(true, data);
        },
        comment: true,
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('Dialog result:', result) // true if Yes, false if No
    // })
  }
  markShipment = async (flag: boolean, data: any) => {
    let data1 = await firstValueFrom(
      this.http.postByUrl(`${environment.API_URL}/v1/fraud-approvals/update`, {
        id: this.formData.company_id,
        is_fraud: flag,
        is_approved: !flag,
        approve_remarks: data,
      })
    );
    this.formData = {
      details_date: new Date(),
      company_id: '',
      total_shipment: 0,
      lost_shipment: 0,
    };
  };
}
