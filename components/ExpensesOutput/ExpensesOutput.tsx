// components/ExpensesOutput/ExpensesOutput.tsx
import { StyleSheet, View } from 'react-native';

import { GlobalStyles } from '@/constants/styles';
import { Expense } from '@/models/expense';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpenseSummary';

interface ExpensesOutputProps {
  expenses: Expense[];
  expensePeriod: string;
}

export default function ExpensesOutput({
  expenses,
  expensePeriod,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary
        periodName={expensePeriod}
        expenses={expenses}
      />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingTop: 8,
  },
});