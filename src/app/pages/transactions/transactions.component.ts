import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TransactionService } from '../../core/services/transaction.service';

import { IconsModule } from '../../icon.module';
import { Category } from '../../models/category.model';
import { Transaction } from '../../models/transaction.model';

@Component({
  standalone: true,
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  imports: [CommonModule, ReactiveFormsModule, IconsModule],
})
export class TransactionsComponent implements OnInit {
  form: FormGroup;
  transactions: Transaction[] = [];
  categories: Category[] = [];

  // ✅ Used to track if we're editing an existing transaction
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: ['EXPENSE', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTransactions();
  }

  loadCategories(): void {
    this.transactionService.getCategories().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (res) => (this.transactions = res),
      error: (err) => console.error('Failed to load transactions', err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    if (this.editingId) {
      // ✅ Update flow
      this.transactionService
        .updateTransaction(this.editingId, formValue)
        .subscribe({
          next: () => {
            this.editingId = null;
            this.form.reset({ type: 'EXPENSE' });
            this.loadTransactions();
          },
          error: (err) => console.error('Failed to update transaction', err),
        });
    } else {
      // ✅ Create flow
      this.transactionService.createTransaction(formValue).subscribe({
        next: () => {
          this.form.reset({ type: 'EXPENSE' });
          this.loadTransactions();
        },
        error: (err) => console.error('Failed to create transaction', err),
      });
    }
  }

  editTransaction(txn: Transaction): void {
    this.editingId = txn.id;
    this.form.patchValue({
      title: txn.title,
      amount: txn.amount,
      type: txn.type,
      categoryId: txn.category.id,
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form.reset({ type: 'EXPENSE' });
  }

  deleteTransaction(id: string): void {
    if (!confirm('Are you sure you want to delete this transaction?')) return;

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => this.loadTransactions(),
      error: (err) => console.error('Failed to delete transaction', err),
    });
  }
}
