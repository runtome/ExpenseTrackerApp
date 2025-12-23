import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Input from './Input';

type InputIdentifier = 'amount' | 'date' | 'description';

export default function ExpenseForm() {
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
});
