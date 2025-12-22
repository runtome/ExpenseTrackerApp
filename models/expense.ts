// models/expense.ts (recommended place)
export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: Date;
}
