// components/expenses/ExpensesList.tsx
import { StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '@/constants/styles';
import { Expense } from '@/models/expense';
import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  if (expenses.length === 0) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          No expenses found.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpenseItem expense={item} />}
    />
  );
}

const styles = StyleSheet.create({
  fallback: {
    marginTop: 32,
    alignItems: 'center',
  },
  fallbackText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
  },
});

