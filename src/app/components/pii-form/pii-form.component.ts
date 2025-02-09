import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-pii-form',
  templateUrl: './pii-form.component.html',
  styleUrl: './pii-form.component.css',
})
export class PiiFormComponent {
  http = inject(HttpService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  today: Date = new Date(); // Set today’s date

  formData = {
    timestamp: new Date(),
    user_id: Number(''),
    action_count: 0,
    action_type: 'customer_data_view',
  };
  fraudId = 0;
  getData = async () => {
    let data = { ...this.formData };
    data['timestamp'] = moment(this.formData.timestamp).format(
      'YYYY-MM-DD'
    ) as unknown as Date;
    data.user_id = Number(data.user_id);
    data.action_count = Number(data.action_count);
    let response: { message: string, id: number } = await firstValueFrom(
      this.http.postByUrl(`${environment.API_URL}/v1/pii-detect/fraud`, data)
    );

    if (response['message'] === 'Legit') {
      this.toastr.success('This Shipment is Legit!');
      this.formData = {
        timestamp: new Date(),
        user_id: Number(''),
        action_count: 0,
        action_type: '',
      };
    } else {
      this.fraudId = response['id'];
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
  }
  markShipment = async (flag: boolean, data: any) => {
    let data1 = await firstValueFrom(
      this.http.postByUrl(`${environment.API_URL}/v1/pii-fraud/update`, {
        id: this.fraudId,
        is_fraud: flag,
        is_approved: !flag,
        approve_remarks: data,
      })
    );
    this.formData = {
      timestamp: new Date(),
      user_id: Number(''),
      action_count: 0,
      action_type: 'customer_data_view',
    };
  };
}
