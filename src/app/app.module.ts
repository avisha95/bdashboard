import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button'; 
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';     // ← untuk modal
import { InputTextModule } from 'primeng/inputtext'; // ← untuk input field
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './layout/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WajibPajakComponent } from './pages/wajib-pajak/wajib-pajak.component';
import { LaporanComponent } from './pages/laporan/laporan.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    WajibPajakComponent,
    LaporanComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
