import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  
  public items : any = [];
  public eventExpanded: boolean = false;
  public usuarioExpanded: boolean = false;
  public ajudaExpanded: boolean = false;
  public outrosExpanded: boolean = false;
  public palestranteExpanded: boolean = false;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
