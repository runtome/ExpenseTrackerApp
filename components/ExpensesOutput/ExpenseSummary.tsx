import { GlobalStyles } from '@/constants/styles';
import { Expense } from '@/models/expense';
import { StyleSheet, Text, View } from 'react-native';

interface ExpensesSummaryProps {
  periodName: string;
  expenses: Expense[];
}

export default function ExpensesSummary({
  periodName,
  expenses,
}: ExpensesSummaryProps) {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary50,
  },
  sum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GlobalStyles.colors.accent500,
  },
});