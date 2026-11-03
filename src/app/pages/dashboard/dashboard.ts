import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardData } from '../../core/model/Interfaces/user.model';
import { MasterService } from '../../core/Services/master-service';

@Component({
  imports: [DatePipe, DecimalPipe, MatIconModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly masterService = inject(MasterService);

  dashboardData = signal<DashboardData | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading.set(true);
    this.errorMessage.set(null);

    this.masterService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load dashboard data. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
