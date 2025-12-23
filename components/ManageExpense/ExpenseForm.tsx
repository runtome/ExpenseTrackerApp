import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { Expense } from '@/models/expense';
import Button from '../ui/Button';
import Input from './Input';

type InputIdentifier = 'amount' | 'date' | 'description';

interface ExpenseFormData {
  amount: number;
  date: Date;
  description: string;
}

interface ExpenseFormProps {
  submitButtonLable: 'Update' | 'Add';
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseFormData) => void;
  defultValues: Expense | undefined;
}

export default function ExpenseForm({
  submitButtonLable,
  onCancel,
  onSubmit,
  defultValues
}: ExpenseFormProps) {

  const [inputs, setInputs] = useState({
    amount: {
      value: defultValues ? defultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defultValues
        ? defultValues.date.toISOString().slice(0, 10)
        : '',
      isValid: true,
    },
    description: {
      value: defultValues ? defultValues.description : '',
      isValid: true,
    },
  });


  function inputChangedHandler(
    inputIdentifier: InputIdentifier,
    enteredValue: string
  ) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: {
        value: enteredValue,
        isValid: true, // reset error while typing
      },
    }));
  }


  function submitHandler() {
    const expenseData: ExpenseFormData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid =
      !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid =
      expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => ({
        amount: {
          value: curInputs.amount.value,
          isValid: amountIsValid,
        },
        date: {
          value: curInputs.date.value,
          isValid: dateIsValid,
        },
        description: {
          value: curInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }


  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputs.amount.value,
            onChangeText: (value) =>
              inputChangedHandler('amount', value),
          }}
        />

        <Input
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: (value) =>
              inputChangedHandler('date', value),
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: (value) =>
            inputChangedHandler('description', value),
        }}
      />

      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLable}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});
