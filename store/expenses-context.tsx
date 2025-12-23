// store/expenses-context.tsx
import { DUMMY_EXPENSES } from '@/data/dummy-expenses';
import { Expense } from '@/models/expense';
import { createContext, ReactNode, useReducer } from 'react';

interface ExpenseData {
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expenseData: ExpenseData) => void;
  updateExpense: (id: string, expenseData: ExpenseData) => void;
  deleteExpense: (id: string) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

type Action =
  | { type: 'ADD'; payload: ExpenseData }
  | { type: 'UPDATE'; payload: { id: string; data: ExpenseData } }
  | { type: 'DELETE'; payload: string };

function expensesReducer(state: Expense[], action: Action): Expense[] {
  switch (action.type) {
    case 'ADD':
      const id = Math.random().toString();
      return [{ ...action.payload, id }, ...state];

    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id
          ? { ...expense, ...action.payload.data }
          : expense
      );

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }: { children: ReactNode }) {
  const [expensesState, dispatch] = useReducer(
    expensesReducer,
    DUMMY_EXPENSES
  );

  function addExpense(expenseData: ExpenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id: string, expenseData: ExpenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
