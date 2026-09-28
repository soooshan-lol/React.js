import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadExpenses, saveExpenses, loadBudget, saveBudget } from '../utils/storage';
import { generateId, getCategoryTotals, getTotalSpent } from '../utils/helpers';

const ExpenseContext = createContext(null);

const defaultFilters = {
  searchTerm: '',
  category: 'All',
  sortBy: 'date-desc',
};

// Wraps the whole app and holds every piece of shared expense state.
// Dashboard.jsx and Reports.jsx both read from this context instead
// of receiving the same data as props passed down through App.jsx,
// which is what Context API is for: sharing state across routes/pages
// without threading props through components that don't need them.
export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => loadExpenses());
  const [budget, setBudget] = useState(() => loadBudget());
  const [filters, setFilters] = useState(defaultFilters);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    saveBudget(budget);
  }, [budget]);

  function addExpense(newExpense) {
    setExpenses((prev) => [...prev, { ...newExpense, id: generateId() }]);
  }

  function updateExpense(updatedExpense) {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
    );
    setEditingExpense(null);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null);
    }
  }

  function submitExpense(data) {
    if (editingExpense) {
      updateExpense({ ...data, id: editingExpense.id });
    } else {
      addExpense(data);
    }
  }

  const visibleExpenses = useMemo(() => {
    let result = [...expenses];

    if (filters.category !== 'All') {
      result = result.filter((expense) => expense.category === filters.category);
    }

    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.trim().toLowerCase();
      result = result.filter((expense) => expense.description.toLowerCase().includes(term));
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        case 'date-desc':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [expenses, filters]);

  const categoryTotals = useMemo(() => getCategoryTotals(expenses), [expenses]);
  const totalSpent = useMemo(() => getTotalSpent(expenses), [expenses]);

  const value = {
    expenses,
    visibleExpenses,
    budget,
    filters,
    editingExpense,
    categoryTotals,
    totalSpent,
    setFilters,
    setBudget,
    setEditingExpense,
    submitExpense,
    deleteExpense,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

// Custom hook so consuming components just call useExpenses() instead
// of importing useContext and ExpenseContext separately everywhere.
export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
