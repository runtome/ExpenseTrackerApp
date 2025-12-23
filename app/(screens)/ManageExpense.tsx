import { StyleSheet, View } from 'react-native';

import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import ErrorOverlay from '@/components/ui/ErrorOverlay';
import IconButton from '@/components/ui/IconButton';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '@/utils/http';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  async function deleteHandler() {
    if (expenseId) {
      try {
        setIsSubmitting(true);
        await deleteExpense(expenseId);
        expensesCtx.deleteExpense(expenseId);
        router.back();
      } catch (error) {
        setError('Could not delete expense - please try again later!');
        setIsSubmitting(false);
      }
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData: ExpenseFormData) {
    setIsSubmitting(true);

    try {
      if (isEditing) {
        expensesCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);

        expensesCtx.addExpenseWithId({
          id,
          ...expenseData,
        });
      }
      router.back();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }
  
  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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