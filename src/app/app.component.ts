import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd
} from '@angular/router';

import { filter } from 'rxjs/operators';

import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  // =========================
  // 🔌 STATUS DATABASE
  // =========================
  message: string = 'Checking connection...';

  isConnected: boolean = false;

  // =========================
  // 🔐 STATUS LOGIN
  // =========================
  isLoggedIn: boolean = false;

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) { }

  // =========================
  // 🚀 INIT
  // =========================
  async ngOnInit() {

    // =========================
    // 🔌 CHECK DATABASE
    // =========================
    const result =
      await this.supabase.checkConnection();

    this.message = result.message;

    this.isConnected = result.success;

    // =========================
    // 🔐 CHECK LOGIN
    // =========================
    this.checkAuth();

    // =========================
    // 🔄 CEK SAAT PINDAH PAGE
    // =========================
    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        this.checkAuth();
      });
  }

  // =========================
  // 🔐 AUTH CHECK
  // =========================

  userRole: string = '';

  async checkAuth() {

    const session =
      this.supabase.getSession();

    // belum login
    if (!session) {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
      return;
    }

    const email =
      session.user?.email || '';
    const { data } =
      await this.supabase
        .checkAllowedEmail(email);
    // tidak terdaftar
    if (!data) {

      alert('Tidak memiliki akses');
      await this.supabase.signOut();
      this.router.navigateByUrl('/login');
      return;
    }
    // simpan role
    this.userRole = data.role;
    this.isLoggedIn = true;


    // login valid
    this.isLoggedIn = true;

    if (this.router.url === '/login') {

      this.router.navigate(['/dashboard']);
    }
  }



}