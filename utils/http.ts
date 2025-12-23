import axios from 'axios';

interface ExpenseFormData {
  amount: number;
  date: Date;
  description: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function storeExpense(expenseData: ExpenseFormData) {
  return axios.post(
    `${API_URL}/expenses.json`,
    expenseData
  );
}
