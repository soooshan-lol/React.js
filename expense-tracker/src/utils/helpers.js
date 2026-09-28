export const CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Other',
];

export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount) || 0);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Returns { Food: 120.5, Transport: 40, ... } across all categories,
// including categories with zero spending so the breakdown chart
// always shows a consistent set of bars.
export function getCategoryTotals(expenses) {
  const totals = {};
  for (const category of CATEGORIES) {
    totals[category] = 0;
  }
  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] || 0) + Number(expense.amount);
  }
  return totals;
}

export function getTotalSpent(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
}
