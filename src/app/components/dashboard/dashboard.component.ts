import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  approvedApiUrl =
    'https://cfe4-14-194-36-134.ngrok-free.app/date-wise-is-approved';
  notApprovedApiUrl = 'https://cfe4-14-194-36-134.ngrok-free.app/not-approved';
  fraudApprovalsApiUrl =
    'https://cfe4-14-194-36-134.ngrok-free.app/fraud-approvals-counts';
  topActionUsersApiUrl =
    'https://cfe4-14-194-36-134.ngrok-free.app/top-action-user'; // ✅ New API

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchApprovedChartData();
    this.fetchNotApprovedChartData();
    this.fetchFraudApprovalsChartData();
    this.fetchTopActionUsersChartData();
  }

  /** Fetch data for the "Approved" chart */
  fetchApprovedChartData() {
    this.requestByUrl<{
      [date: string]: { action_type: string; count: number }[];
    }>(this.approvedApiUrl).subscribe(
      (response) => {
        const labels: string[] = [];
        const datasets: any[] = [];
        const approvedChartColor: string[] = ['#1F77B4', '#6C757D', '#7C757D'];

        Object.entries(response).forEach(([date, actions]) => {
          actions.forEach((action, key) => {
            let dataset = datasets.find((d) => d.label === action.action_type);
            if (!dataset) {
              dataset = {
                label: action.action_type,
                data: [],
                backgroundColor: approvedChartColor[key],
              };
              datasets.push(dataset);
            }
            dataset.data.push(action.count);
          });

          labels.push(date);
        });

        const filteredDatasets = datasets;
        filteredDatasets.forEach((dataset) => {
          dataset.label = dataset.label.replace(/_/g, ' ');
          dataset.label = dataset.label.replace(/\b\w/g, (char: string) =>
            char.toUpperCase()
          );
        });

        this.createChart(
          'chart1',
          labels,
          filteredDatasets,
          'Approved Actions',
          'bar'
        );
      },
      (error) => {
        console.error('API Error (Approved):', error);
      }
    );
  }

  /** Fetch data for the "Not Approved" chart */
  fetchNotApprovedChartData() {
    this.requestByUrl<{ action_type: string; count: number }[]>(
      this.notApprovedApiUrl
    ).subscribe(
      (response) => {
        const labels = response.map((item) => item.action_type);
        const data = response.map((item) => item.count);
        const dataset = [
          {
            label: 'Not Approved Actions',
            data: data,
            backgroundColor: labels.map(
              (value, key) => ['#003366', '#0055A4', '#0099E5'][key]
            ),
          },
        ];
        this.createChart(
          'chart2',
          labels,
          dataset,
          'Not Approved Actions',
          'bar'
        );
      },
      (error) => {
        console.error('API Error (Not Approved):', error);
      }
    );
  }

  /** Fetch data for the "Fraud Approvals" chart */
  fetchFraudApprovalsChartData() {
    this.requestByUrl<{
      totalApprovedCount: number;
      totalUnapprovedCount: number;
    }>(this.fraudApprovalsApiUrl).subscribe(
      (response) => {
        const labels = ['Total Approved', 'Total Unapproved'];
        const data = [
          response.totalApprovedCount,
          response.totalUnapprovedCount,
        ];
        const dataset = [
          {
            label: 'Fraud Approvals',
            data: data,
            backgroundColor: ['#2E8B57', '#008080'],
          },
        ];

        this.createChart(
          'chart3',
          labels,
          dataset,
          'Fraud Approvals Distribution',
          'pie'
        );
      },
      (error) => {
        console.error('API Error (Fraud Approvals):', error);
      }
    );
  }

  /** ✅ Fetch "Top Action Users" chart data */
  fetchTopActionUsersChartData() {
    this.requestByUrl<{ user_id: number; count: number }[]>(
      this.topActionUsersApiUrl
    ).subscribe(
      (response) => {
        if (!response || response.length === 0) {
          console.warn('No data available for Top Action Users.');
          return;
        }

        const labels = response.map((user) => `User ${user.user_id}`);
        const data = response.map((user) => user.count);

        const dataset = [
          {
            label: 'Top Action Users',
            data: data,
            backgroundColor: labels.map(
              (value, key) => ['#27AE60', '#BDC3C7'][key]
            ),
          },
        ];

        console.log('Top Action Users:', response);

        this.createChart('chart4', labels, dataset, 'Top Action Users', 'bar');
      },
      (error) => {
        console.error('API Error (Top Action Users):', error);
      }
    );
  }

  /** API request method */
  requestByUrl<T>(
    url: string,
    params = {},
    headers?: HttpHeaders
  ): Observable<T> {
    params = this.getQueryParam(params);
    headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    });
    return this.http.get<T>(url, { params, headers });
  }

  getQueryParam(params: any) {
    return params;
  }

  /** Create Chart */
  createChart(
    elementId: string,
    labels: string[],
    datasets: any[],
    title: string,
    type: string
  ) {
    const canvas = document.getElementById(elementId) as HTMLCanvasElement;

    if (!canvas) {
      console.error(`Canvas with ID '${elementId}' not found.`);
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error(`Unable to get 2D context for '${elementId}'.`);
      return;
    }

    new Chart(ctx, {
      // ✅ Pass the correct context, NOT the element ID
      type: type as any, // Ensure type is valid
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: {
            display: true,
            text: title,
          },
        },
      },
    });
  }

  /** Generate random color */
  getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  }
}
