import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ShipmentLostListComponent } from './shipment-lost-list/shipment-lost-list.component'
import { PiiListComponent } from './pii-list/pii-list.component'

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shipment_lost_list', component: ShipmentLostListComponent },
  { path: 'pii_list', component: PiiListComponent },
  { path: 'pii_form', component: PiiListComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
