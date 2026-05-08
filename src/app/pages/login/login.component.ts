import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;

  constructor(
    private supabase: SupabaseService
  ) {}

  // =========================
  // 🔐 LOGIN GOOGLE
  // =========================
  async loginGoogle() {

    this.loading = true;

    const { error } =
      await this.supabase.signInWithGoogle();

    if (error) {
      alert(error.message);
      console.error(error);
    }

    this.loading = false;
  }

}