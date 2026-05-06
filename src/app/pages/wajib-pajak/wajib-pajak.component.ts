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
    const f = this.pajak.form;

    if (!f.nama || !f.npwp || f.penghasilan <= 0) {
      alert('Isi data dengan benar!');
      return;
    }

    this.pajak.add(f);

    // refresh tabel
    this.list = [...this.pajak.getAll()];

    // reset form
    this.pajak.form = {
      nama: '',
      npwp: '',
      penghasilan: 0
    };
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