// app/(tabs)/AllExpenses.tsx
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/expenses-context';
import { useContext } from 'react';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensePeriod="Total"
    />
  );
}
