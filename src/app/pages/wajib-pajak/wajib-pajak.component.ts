import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { WajibPajak } from '../../services/pajak.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-wajib-pajak',
  templateUrl: './wajib-pajak.component.html',
  styleUrls: ['./wajib-pajak.component.css'],
})
export class WajibPajakComponent implements OnInit {

  list: WajibPajak[] = [];

  editingId: number | null = null;
  editCache: any = {};

  // ✅ FORM PINDAH KE COMPONENT
  form = {
    nama: '',
    npwp: '',
    penghasilan: 0
  };

  constructor(public supabase: SupabaseService, public appComponent: AppComponent) {}

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
  // ➕ ADD
  // =========================
  async add() {

    if (
      !this.form.nama ||
      !this.form.npwp ||
      this.form.penghasilan <= 0
    ) {
      alert('Isi data dengan benar!');
      return;
    }

    const { error } = await this.supabase.addWajibPajak(this.form);

    if (error) {
      console.error(error);
      return;
    }

    // reset form
    this.form = {
      nama: '',
      npwp: '',
      penghasilan: 0
    };

    await this.loadData();
  }

  // =========================
  // ✏️ EDIT
  // =========================
  startEdit(wp: WajibPajak) {
    this.editingId = wp.id;
    this.editCache = { ...wp };
  }

  cancelEdit() {
    this.editingId = null;
    this.editCache = {};
  }

  async saveEdit() {

    if (!this.editingId) return;

    const { error } = await this.supabase.updateWajibPajak(
      this.editingId,
      this.editCache
    );

    if (error) {
      console.error(error);
      return;
    }

    this.editingId = null;
    this.editCache = {};

    await this.loadData();
  }

  // =========================
  // 🗑 DELETE
  // =========================
  async delete(id: number) {

    const confirmDelete = confirm('Yakin mau hapus data ini?');

    if (!confirmDelete) return;

    const { error } = await this.supabase.deleteWajibPajak(id);

    if (error) {
      console.error(error);
      return;
    }

    await this.loadData();
  }

  // =========================
  // 📊 TOTAL
  // =========================
  get totalPenghasilan() {
    return this.list.reduce((a, b) => a + b.penghasilan, 0);
  }

  get totalPajak() {
    return this.totalPenghasilan * 0.1;
  }

  // =========================
  // 💰 FORMAT
  // =========================
  formatRupiah(v: number) {
    return 'Rp ' + v.toLocaleString('id-ID');
  }

  hitungPajak(v: number) {
    return v * 0.1;
  }
}