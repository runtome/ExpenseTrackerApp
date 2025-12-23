// app/(tabs)/RecentExpenses.tsx
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { useEffect, useState } from 'react';

import { Expense } from '@/models/expense';
import { fetchExpenses } from '@/utils/http';

const getDateMinusDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

export default function RecentExpenses() {
  // const expensesCtx = useContext(ExpensesContext);
  const [fatchedExpense, setFatchedExpense] = useState<Expense[]>([]);

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      setFatchedExpense(expenses)    
    }

    getExpenses();
  },[])

  const recentExpenses = fatchedExpense.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 Days"
    />
  );
}
