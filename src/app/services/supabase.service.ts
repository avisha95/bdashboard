import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // =========================
  // 🔌 CEK KONEKSI DATABASE
  // =========================
  async checkConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await this.supabase
        .from('wajibpajak')
        .select('*')
        .limit(1);

      if (error) throw error;

      return { success: true, message: 'Database wajibpajak terhubung!' };
    } catch (err: any) {
      return { success: false, message: `Gagal: ${err.message}` };
    }
  }

  // =========================
  // 🔐 AUTH
  // =========================

  getSession(): Session | null {
    return this.supabase.auth.session();
  }

  getUser(): User | null {
    return this.supabase.auth.user();
  }

  async signIn(email: string, password: string) {
    return await this.supabase.auth.signIn({
      email,
      password
    });
  }

  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({
      email,
      password
    });
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  // =========================
  // 📊 DATABASE WAJIB PAJAK
  // =========================

  // ambil semua data
  async getWajibPajak() {
    return await this.supabase
      .from('wajibpajak')
      .select('*');
  }

  // insert data
  async addWajibPajak(data: any) {
    return await this.supabase
      .from('wajibpajak')
      .insert([data]);
  }

  // update data
  async updateWajibPajak(id: number, data: any) {
    return await this.supabase
      .from('wajibpajak')
      .update(data)
      .eq('id', id);
  }

  // delete data
  async deleteWajibPajak(id: number) {
    return await this.supabase
      .from('wajibpajak')
      .delete()
      .eq('id', id);
  }

  // =========================
  // 🔐 LOGIN GOOGLE
  // =========================
  async signInWithGoogle() {

    return await this.supabase.auth.signIn(
      {
        provider: 'google'
      },
      {
        redirectTo: 'http://localhost:4200/dashboard'
      }
    );
  }

  async checkAllowedEmail(email: string) {

    return await this.supabase
      .from('allowed_users')
      .select('*')
      .eq('email', email)
      .single();
  }



}