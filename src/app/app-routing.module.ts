import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShipmentLostListComponent } from './components/shipment-lost-list/shipment-lost-list.component';
import { PiiListComponent } from './components/pii-list/pii-list.component';
import { PiiFormComponent } from './components/pii-form/pii-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shipment_lost_list', component: ShipmentLostListComponent },
  { path: 'pii_list', component: PiiListComponent },
  { path: 'pii_form', component: PiiFormComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
