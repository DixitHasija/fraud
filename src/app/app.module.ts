import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // ✅ Import this
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NumberOnlyDirective } from './number-only.directive';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { ToastrModule } from 'ngx-toastr';
import { PiiFormComponent } from './pii-form/pii-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    ErrorDialogComponent,
    DashboardComponent,
    NumberOnlyDirective,
    ConfirmationDialogComponent,
    PiiFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    SweetAlert2Module.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
