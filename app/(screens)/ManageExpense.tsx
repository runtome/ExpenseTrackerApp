import { StyleSheet, View } from 'react-native';

import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useContext, useLayoutEffect, useState } from 'react';

type ManageExpenseParams = {
  expenseId?: string;
};

export default function ManageExpense() {
  const { expenseId } = useLocalSearchParams<ManageExpenseParams>();
  const navigation = useNavigation();
  const expensesCtx = useContext(ExpensesContext);
  const router = useRouter();

  const [description, setDescription] = useState('Test !!!!');
  const [amount, setAmount] = useState('29.00');
  const [date, setDate] = useState('');


  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteHandler() {
    if (expenseId) {
      expensesCtx.deleteExpense(expenseId);
      router.back();
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    const expenseData = {
      description: description,
      amount: +amount,
      date: new Date(),
    };

    if (isEditing && expenseId) {
      expensesCtx.updateExpense(expenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }

    router.back();
  }


  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});