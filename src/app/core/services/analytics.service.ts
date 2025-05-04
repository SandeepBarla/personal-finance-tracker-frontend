import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CategorySummary, MonthlySummary } from '../../models/analytics.model';
import { apiUrl } from '../utils/api.utils';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private categorySummaryUrl = apiUrl('/api/analytics/category-summary');
  private monthlySummaryUrl = apiUrl('/api/analytics/monthly-summary');

  constructor(private http: HttpClient) {}

  getCategorySummary(
    type?: 'INCOME' | 'EXPENSE'
  ): Observable<CategorySummary[]> {
    const url = type
      ? `${this.categorySummaryUrl}?type=${type}`
      : this.categorySummaryUrl;

    return this.http.get<CategorySummary[]>(url);
  }

  getMonthlySummary(): Observable<MonthlySummary[]> {
    return this.http.get<MonthlySummary[]>(this.monthlySummaryUrl);
  }
}
