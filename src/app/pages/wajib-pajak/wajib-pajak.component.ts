import { Component } from '@angular/core';
import { PajakService, WajibPajak } from '../../services/pajak.service';

@Component({
  selector: 'app-wajib-pajak',
  templateUrl: './wajib-pajak.component.html',
  styleUrls: ['./wajib-pajak.component.css'],
})
export class WajibPajakComponent {

  list: WajibPajak[] = [];

  // ⚠️ harus PUBLIC biar bisa dipakai di HTML
  constructor(public pajak: PajakService) {
    this.list = this.pajak.getAll();
  }

  add() {
    const form = this.pajak.form;
    if (!form.nama || !form.npwp || form.penghasilan <= 0) {
      alert('Isi data dengan benar!');
      return;
    }
    this.pajak.add(form);
    this.list = [...this.pajak.getAll()];
    this.pajak.form = {
      nama: '',
      npwp: '',
      penghasilan: 0
    };
  }

  editingId: number | null = null;
  editCache: any = {};

  startEdit(wp: WajibPajak) {
    this.editingId = wp.id;
    this.editCache = { ...wp };
  }
  cancelEdit() {
    this.editingId = null;
    this.editCache = {};
  }
  saveEdit() {
    const index = this.list.findIndex(x => x.id === this.editingId);
    if (index !== -1) {
      this.list[index] = { ...this.editCache };
    }
    this.editingId = null;
    this.editCache = {};
  }

delete(id: number) {
  const confirmDelete = confirm('Yakin mau hapus data ini?');

  if (!confirmDelete) return;

  this.list = this.list.filter(item => item.id !== id);
}


  get totalPenghasilan() {
    return this.list.reduce((a, b) => a + b.penghasilan, 0);
  }

  get totalPajak() {
    return this.totalPenghasilan * 0.1;
  }

  formatRupiah(v: number) {
    return this.pajak.formatRupiah(v);
  }

  hitungPajak(v: number) {
    return this.pajak.hitungPajak(v);
  }
}