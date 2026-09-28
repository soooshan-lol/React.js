import { useExpenses } from '../context/ExpenseContext';
import BudgetTracker from '../components/BudgetTracker';
import CategoryBreakdown from '../components/CategoryBreakdown';
import CurrencyConverter from '../components/CurrencyConverter';

export default function Reports() {
  const { categoryTotals, budget, totalSpent, setBudget } = useExpenses();

  return (
    <section className="app__reports">
      <BudgetTracker budget={budget} totalSpent={totalSpent} onSetBudget={setBudget} />
      <CategoryBreakdown categoryTotals={categoryTotals} />
      <CurrencyConverter totalSpent={totalSpent} />
    </section>
  );
}
