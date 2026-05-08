import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // =========================
  // 📋 MENU
  // =========================
  items: MenuItem[] = [

    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },

    {
      label: 'Wajib Pajak',
      icon: 'pi pi-users',
      routerLink: '/wajib-pajak'
    },

    {
      label: 'Laporan',
      icon: 'pi pi-chart-bar',
      routerLink: '/laporan'
    }

  ];

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  // =========================
  // 🔐 LOGOUT
  // =========================
  async logout() {

    // logout supabase
    await this.supabase.signOut();

    // hapus cache/session browser
    localStorage.clear();
    sessionStorage.clear();

    // redirect login + refresh app
    window.location.href = '/login';
  }

}