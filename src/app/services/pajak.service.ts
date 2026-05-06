import { Injectable } from '@angular/core';

export interface WajibPajak {
  id: number;
  nama: string;
  npwp: string;
  penghasilan: number;
}

@Injectable({ providedIn: 'root' })
export class PajakService {
  
  private data: WajibPajak[] = [
    { id: 1, nama: 'PT Maju Jaya', npwp: '01.234.567.8-001.000', penghasilan: 10_000_000 },
    { id: 2, nama: 'CV Sukses', npwp: '01.234.567.8-002.000', penghasilan: 5_000_000 },
    { id: 3, nama: 'Budi Santoso', npwp: '01.234.567.8-003.000', penghasilan: 3_000_000 },
    { id: 4, nama: 'Siti Rahayu', npwp: '01.234.567.8-004.000', penghasilan: 12_000_000 },
    { id: 5, nama: 'Ahmad Fauzi', npwp: '01.234.567.8-005.000', penghasilan: 6_750_000 },
  ];

  // ✅ data untuk form input
  form = {
    nama: '',
    npwp: '',
    penghasilan: 0
  };

    // ✅ diperbaiki (tidak pakai this.form di dalam)
  add(data: { nama: string; npwp: string; penghasilan: number }) {
    const newId = this.data.length
      ? Math.max(...this.data.map(d => d.id)) + 1
      : 1;

    const newData: WajibPajak = {
      id: newId,
      ...data
    };

    this.data.push(newData);
  }

  getAll(): WajibPajak[] {
    return this.data;
  }

  getTotalPenghasilan(): number {
    return this.data.reduce((a, b) => a + b.penghasilan, 0);
  }

  getTotalPajak(): number {
    return this.getTotalPenghasilan() * 0.1;
  }

  hitungPajak(penghasilan: number): number {
    return penghasilan * 0.1;
  }

  formatRupiah(value: number): string {
    return 'Rp ' + value.toLocaleString('id-ID');
  }

}