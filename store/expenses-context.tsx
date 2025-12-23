import { Expense } from '@/models/expense';
import { createContext, ReactNode, useReducer } from 'react';

interface ExpenseData {
  description: string;
  amount: number;
  date: Date;
}

interface ExpensesContextType {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expenseData: ExpenseData) => void;
  addExpenseWithId: (expense: Expense) => void; // ✅ NEW
  updateExpense: (id: string, expenseData: ExpenseData) => void;
  deleteExpense: (id: string) => void;
}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  setExpenses: () => {},
  addExpense: () => {},
  addExpenseWithId: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});

type Action =
  | { type: 'ADD'; payload: ExpenseData }
  | { type: 'SET'; payload: Expense[] }
  | { type: 'UPDATE'; payload: { id: string; data: ExpenseData } }
  | { type: 'DELETE'; payload: string };

function expensesReducer(state: Expense[], action: Action): Expense[] {
  switch (action.type) {
    case 'ADD':
      const id = Math.random().toString();
      return [{ ...action.payload, id }, ...state];

    case 'SET':
      const inverted = action.payload.reverse()
      return inverted;

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

export function ExpensesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function setExpenses(expenses: Expense[]) {
    dispatch({ type: 'SET', payload: expenses });
  }

  function addExpense(expenseData: ExpenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id: string, expenseData: ExpenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  }

  function deleteExpense(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function addExpenseWithId(expense: Expense) {
  dispatch({
    type: 'SET',
    payload: [expense, ...expensesState],
  });
}

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        setExpenses,
        addExpense,
        addExpenseWithId,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
