// models/expense.ts (recommended place)
export interface Expense {
  id: string;
  amount: number;
  date: Date;
  description: string;
}
