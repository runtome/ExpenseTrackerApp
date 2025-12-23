import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../ui/Button';
import Input from './Input';

type InputIdentifier = 'amount' | 'date' | 'description';

interface ExpenseFormProps {
  submitButtonLable: 'Update' | 'Add',
  onCancel: () => void,
  onSubmit: () => void,
}

export default function ExpenseForm({submitButtonLable, onCancel, onSubmit}:ExpenseFormProps) {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: '',
  });

  function inputChangedHandler(
    inputIdentifier: InputIdentifier,
    enteredValue: string
  ) {
    setInputValues((curInputValues) => ({
      ...curInputValues,
      [inputIdentifier]: enteredValue,
    }));
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>

      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            value: inputValues.amount,
            onChangeText: (value) =>
              inputChangedHandler('amount', value),
          }}
        />

        <Input
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            value: inputValues.date,
            onChangeText: (value) =>
              inputChangedHandler('date', value),
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputValues.description,
          onChangeText: (value) =>
            inputChangedHandler('description', value),
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={onSubmit}>
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
