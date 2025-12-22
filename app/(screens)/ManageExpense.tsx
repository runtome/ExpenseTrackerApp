import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Text, View } from 'react-native';

type ManageExpenseParams = {
  expenseId?: string;
};

export default function ManageExpense() {
  const { expenseId } = useLocalSearchParams<ManageExpenseParams>();
  const navigation = useNavigation();

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>{isEditing ? 'Editing' : 'Adding'} Expense</Text>
    </View>
  );
}
