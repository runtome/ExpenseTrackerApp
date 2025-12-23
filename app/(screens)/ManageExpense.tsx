import { StyleSheet, View } from 'react-native';

import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import IconButton from '@/components/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useContext, useLayoutEffect, useState } from 'react';

type ManageExpenseParams = {
  expenseId?: string;
};

interface ExpenseFormData {
  amount: number;
  date: Date;
  description: string;
}

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

  // function confirmHandler(expenseData) {

  //   if (isEditing && expenseId) {
  //     expensesCtx.updateExpense(expenseId, expenseData);
  //   } else {
  //     expensesCtx.addExpense(expenseData);
  //   }

  //   router.back();
  // }

  function confirmHandler(expenseData: ExpenseFormData) {
  if (isEditing) {
    expensesCtx.updateExpense(expenseId!, expenseData);
  } else {
    expensesCtx.addExpense(expenseData);
  }
  router.back();
}



  return (
    <View style={styles.container}>
      <ExpenseForm 
        submitButtonLable={isEditing? 'Update' : 'Add'}
        onCancel={cancelHandler} 
        onSubmit={confirmHandler} 
      />
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});