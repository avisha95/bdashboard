import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WajibPajakComponent } from './pages/wajib-pajak/wajib-pajak.component';
import { LaporanComponent } from './pages/laporan/laporan.component';

const routes: Routes = [
  { path: '',           redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard',   component: DashboardComponent },
  { path: 'wajib-pajak', component: WajibPajakComponent },
  { path: 'laporan',     component: LaporanComponent },
  { path: '**',          redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}