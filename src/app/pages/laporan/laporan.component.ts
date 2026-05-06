import { Component } from '@angular/core';
import { PajakService, WajibPajak } from '../../services/pajak.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.css'],
})
export class LaporanComponent {
  list: WajibPajak[] = [];

  constructor(private pajak: PajakService) {
    this.list = this.pajak.getAll();
  }

  get totalPenghasilan() { return this.list.reduce((a, b) => a + b.penghasilan, 0); }
  get totalPajak()       { return this.totalPenghasilan * 0.1; }

  formatRupiah(v: number) { return this.pajak.formatRupiah(v); }
  hitungPajak(v: number)  { return this.pajak.hitungPajak(v); }

  getPersen(penghasilan: number): string {
    return ((penghasilan / this.totalPenghasilan) * 100).toFixed(1) + '%';
  }
}