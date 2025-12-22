import { View } from 'react-native';

import ExpensesSummary from './ExpenseSummary';
import ExpensesList from './ExpensesList';


export default function ExpensesOutput() {
  return (
    <View>
      <ExpensesSummary />
      <ExpensesList />
    </View>
  );
}