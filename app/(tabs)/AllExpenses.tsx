// app/(tabs)/AllExpenses.tsx
import ExpensesOutput from '@/components/ExpensesOutput/ExpensesOutput';
import { DUMMY_EXPENSES } from '@/data/dummy-expenses';

export default function AllExpenses() {
  return (
    <ExpensesOutput
      expenses={DUMMY_EXPENSES}
      expensePeriod="Total"
    />
  );
}
