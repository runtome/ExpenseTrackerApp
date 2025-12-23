import { StyleSheet, View } from 'react-native';

import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import IconButton from '@/components/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { storeExpense } from '@/utils/http';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useContext, useLayoutEffect } from 'react';

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


  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  )

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

  function confirmHandler(expenseData: ExpenseFormData) {
  if (isEditing) {
    expensesCtx.updateExpense(expenseId!, expenseData);
  } else {
    storeExpense(expenseData);
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
        defultValues={selectedExpense}
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