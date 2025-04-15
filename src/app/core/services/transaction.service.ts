import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../models/category.model';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionUrl = 'http://localhost:8080/api/transactions';
  private categoryUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  // ✅ GET all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl);
  }

  // ✅ GET all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  // ✅ POST create transaction
  createTransaction(payload: {
    title: string;
    amount: number;
    type: string;
    categoryId: string;
  }): Observable<void> {
    return this.http.post<void>(this.transactionUrl, payload);
  }

  // ✅ PUT update transaction
  updateTransaction(
    id: string,
    payload: {
      title: string;
      amount: number;
      type: string;
      categoryId: string;
    }
  ): Observable<void> {
    return this.http.put<void>(`${this.transactionUrl}/${id}`, payload);
  }

  // ✅ DELETE a transaction
  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.transactionUrl}/${id}`);
  }
}
