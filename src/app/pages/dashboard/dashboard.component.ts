import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { WajibPajak } from '../../services/pajak.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  list: WajibPajak[] = [];

  constructor(public supabase: SupabaseService) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {

    const { data, error } = await this.supabase.getWajibPajak();

    if (error) {
      console.error(error);
      return;
    }

    this.list = data || [];
  }

  // =========================
  // 📊 TOTAL PENGHASILAN
  // =========================
  get totalPenghasilan(): number {
    return this.list.reduce(
      (a, b) => a + Number(b.penghasilan),
      0
    );
  }

  // =========================
  // 💰 TOTAL PAJAK
  // =========================
  get totalPajak(): number {
    return this.totalPenghasilan * 0.1;
  }

  // =========================
  // 💵 FORMAT RUPIAH
  // =========================
  formatRupiah(v: number): string {
    return 'Rp ' + Number(v).toLocaleString('id-ID');
  }

  // =========================
  // 🧮 HITUNG PAJAK
  // =========================
  hitungPajak(v: number): number {
    return Number(v) * 0.1;
  }

}