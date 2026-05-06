import { Component } from '@angular/core';
import { PajakService } from '../../services/pajak.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(public pajak: PajakService) {}
}