// Handles all reads and writes to the browser's localStorage.
// Keeping this logic in one place means the rest of the app never
// touches localStorage directly, so the storage format can change
// later without editing every component.

const EXPENSES_KEY = 'ledger.expenses';
const BUDGET_KEY = 'ledger.monthlyBudget';

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Could not read expenses from storage:', err);
    return [];
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error('Could not save expenses to storage:', err);
  }
}

export function loadBudget() {
  try {
    const raw = localStorage.getItem(BUDGET_KEY);
    return raw ? Number(raw) : 0;
  } catch (err) {
    console.error('Could not read budget from storage:', err);
    return 0;
  }
}

export function saveBudget(amount) {
  try {
    localStorage.setItem(BUDGET_KEY, String(amount));
  } catch (err) {
    console.error('Could not save budget to storage:', err);
  }
}
