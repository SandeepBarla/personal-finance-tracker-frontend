export interface CategorySummary {
  category: string;
  amount: number;
}

export interface MonthlySummary {
  year: number;
  month: number;
  yearMonth: string;
  totalIncome: number;
  totalExpense: number;
}
