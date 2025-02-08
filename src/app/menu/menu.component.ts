import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private router: Router) {

  }
  menus = [
    {
      title: 'Dashboard',
      key: 'dashboard',
    },
    {
      title: 'Shipment Lost Form',
      key: 'home',
    },
    {
      title: 'Shipment Lost List',
      key: 'shipment_lost_list',
    },
    {
      title: 'PII List',
      key: 'pii_list',
    },
    {
      title: 'PII Form',
      key: 'pii_form',
    },
  ]
  currentRoute: string = this.menus[0].key
  ngOnInit() {
    const currentRoute = this.router.url.split('/').pop();
    if (currentRoute) {
      this.currentRoute = currentRoute;
      this.currentRoute = this.menus[0].key
    } else {
      this.currentRoute = this.menus[0].key
    }
  }


  onMenuClick = (key: string) => {

    this.currentRoute = key
    this.router.navigate([`/${this.currentRoute}`])
  }
}
