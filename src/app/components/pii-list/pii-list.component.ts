import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '../../services/http.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../environment/environment';
import { ELEMENT_DATA, PeriodicElement, ReplaceUnderscorePipe } from './pii-list.model';

@Component({
  selector: 'app-pii-list',
  templateUrl: './pii-list.component.html',
  styleUrl: './pii-list.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
})
export class PiiListComponent {
  http = inject(HttpService);
  dialog = inject(MatDialog);
  displayedColumns: string[] = ['company_id', 'fraud_type', 'count', 'id'];
  selectedOrder: PeriodicElement = {
    id: 0,
    company_id: '',
    is_fraud: false,
    is_approved: false,
    fraud_type: '',
    count: '',
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getData();
  }
  getData = async () => {
    let dataSource: PeriodicElement[] = await firstValueFrom(
      this.http.requestByUrl(`${environment.API_URL}/v1/fraud-approvals/list`)
    );
    // this.dataSource = dataSource "is_approved"
    this.dataSource.data = dataSource.filter(
      (item: PeriodicElement) => item.is_approved !== null
    );
  };
  markShipment = async (flag: boolean, data: any) => {
    let data1 = await firstValueFrom(
      this.http.postByUrl(`${environment.API_URL}/v1/fraud-approvals/update`, {
        id: this.selectedOrder.id,
        is_fraud: flag,
        is_approved: !flag,
        approve_remarks: data,
      })
    );
    this.getData();
  };
  openErrorDialog(data: PeriodicElement) {
    this.selectedOrder = data;
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
  replaceUnderscorePipe(data: string) {
    return ReplaceUnderscorePipe(data);
  }
}
