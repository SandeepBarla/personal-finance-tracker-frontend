import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsService } from '../../core/services/analytics.service';
import { TransactionService } from '../../core/services/transaction.service';
import { CategorySummary, MonthlySummary } from '../../models/analytics.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  categorySummary: CategorySummary[] = [];
  monthlySummary: MonthlySummary[] = [];

  income = 0;
  expense = 0;
  balance = 0;

  @ViewChild('expenseChart', { static: false, read: BaseChartDirective })
  expenseChart?: BaseChartDirective;

  @ViewChild('incomeChart', { static: false, read: BaseChartDirective })
  incomeChart?: BaseChartDirective;

  expenseChartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['#f87171', '#fbbf24', '#60a5fa', '#a78bfa'], // Adjust as needed
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  };

  incomeChartConfig: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: ['#34d399', '#60a5fa', '#818cf8', '#fcd34d'], // Adjust as needed
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    },
  };
  monthlyChartConfig: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: [], // e.g. ['2024-01', '2024-02', ...]
      datasets: [
        {
          label: 'Income',
          data: [],
          backgroundColor: '#34d399', // green
        },
        {
          label: 'Expense',
          data: [],
          backgroundColor: '#f87171', // red
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Monthly Income vs Expense',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => '$' + value,
          },
        },
      },
    },
  };

  constructor(
    private transactionService: TransactionService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategorySummary();
    this.loadMonthlySummary();
  }

  private loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (res) => {
        this.transactions = res;
        this.calculateTotals();
      },
      error: (err) => console.error('Failed to fetch transactions', err),
    });
  }
  activeTab: 'INCOME' | 'EXPENSE' = 'EXPENSE';
  private loadCategorySummary(): void {
    // Load EXPENSE categories
    this.analyticsService.getCategorySummary('EXPENSE').subscribe({
      next: (res) => {
        this.expenseChartConfig.data.labels = res.map((item) => item.category);
        this.expenseChartConfig.data.datasets[0].data = res.map(
          (item) => item.amount
        );
        this.expenseChart?.update();
      },
      error: (err) => console.error('Failed to fetch expense summary', err),
    });

    // Load INCOME categories
    this.analyticsService.getCategorySummary('INCOME').subscribe({
      next: (res) => {
        console.log('INCOME CATEGORY RESPONSE:', res);
        this.incomeChartConfig.data.labels = res.map((item) => item.category);
        this.incomeChartConfig.data.datasets[0].data = res.map(
          (item) => item.amount
        );
        this.incomeChart?.update();
      },
      error: (err) => console.error('Failed to fetch income summary', err),
    });
  }

  private loadMonthlySummary(): void {
    this.analyticsService.getMonthlySummary().subscribe({
      next: (res) => {
        this.monthlySummary = res;

        // Extract chart labels and dataset values
        this.monthlyChartConfig.data.labels = res.map((item) => item.yearMonth);
        this.monthlyChartConfig.data.datasets[0].data = res.map(
          (item) => item.totalIncome
        );
        this.monthlyChartConfig.data.datasets[1].data = res.map(
          (item) => item.totalExpense
        );
      },
      error: (err) => console.error('Failed to fetch monthly summary', err),
    });
  }

  private calculateTotals(): void {
    this.income = this.transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    this.expense = this.transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    this.balance = this.income - this.expense;
  }
}
