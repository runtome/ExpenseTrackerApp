// components/expenses/ExpenseItem.tsx
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GlobalStyles } from '@/constants/styles';
import { Expense } from '@/models/expense';
import { formatDate } from '@/utils/date';



interface ExpenseItemProps {
  expense: Expense;
}
export default function ExpenseItem({ expense }: ExpenseItemProps) {
  function expensePressHandler() {
    router.push({
      pathname: '/ManageExpense',
      params: { expenseId: expense.id },
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.date}>
          {formatDate(expense.date)}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.75,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary50,
  },
  date: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
  },
  amountContainer: {
    backgroundColor: GlobalStyles.colors.primary50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    color: GlobalStyles.colors.primary800,
    fontWeight: 'bold',
  },
});