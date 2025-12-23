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

export async function fetchExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses = [];

  console.log(response.data)

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}