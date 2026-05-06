import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  items: MenuItem[] = [
    { label: 'Dashboard',   icon: 'pi pi-home',     routerLink: ['/dashboard'] },
    { label: 'Wajib Pajak', icon: 'pi pi-users',    routerLink: ['/wajib-pajak'] },
    { label: 'Laporan',     icon: 'pi pi-chart-bar', routerLink: ['/laporan'] },
  ];

  constructor(public router: Router) {}
}