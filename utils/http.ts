import axios from 'axios';


interface ExpenseFormData {
  amount: number;
  date: Date;
  description: string;
}

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function storeExpense(expenseData: ExpenseFormData) {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  const id =  response.data.name; // Firebase returns the generated id in 'name' field
  return id; 
}


export async function fetchExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);

  const expenses = [];

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

export  function updateExpense(id: string, expenseData: ExpenseFormData) {
  return axios.put(`${API_URL}/expenses/${id}.json`, expenseData);
}
export  function deleteExpense(id: string) {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
}

