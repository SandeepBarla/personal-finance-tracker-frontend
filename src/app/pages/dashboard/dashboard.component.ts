import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  income = 0;
  expense = 0;
  balance = 0;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.calculateSummary();
      },
      error: (err) => {
        console.error('Failed to load transactions:', err);
      },
    });
  }

  private calculateSummary(): void {
    this.income = this.transactions
      .filter((txn) => txn.type === 'INCOME')
      .reduce((sum, txn) => sum + txn.amount, 0);

    this.expense = this.transactions
      .filter((txn) => txn.type === 'EXPENSE')
      .reduce((sum, txn) => sum + txn.amount, 0);

    this.balance = this.income - this.expense;
  }
}
