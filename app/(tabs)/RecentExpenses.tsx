// app/(tabs)/RecentExpenses.tsx
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/expenses-context';
import { useContext } from 'react';

const getDateMinusDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);

export default function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
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
