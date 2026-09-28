import { useState } from 'react';
import { formatCurrency } from '../utils/helpers';

export default function BudgetTracker({ budget, totalSpent, onSetBudget }) {
  const [draft, setDraft] = useState(budget || '');

  const percentUsed = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = budget > 0 && totalSpent > budget;
  const isNearLimit = budget > 0 && !isOverBudget && percentUsed >= 80;

  function handleSubmit(event) {
    event.preventDefault();
    const amount = Number(draft);
    if (!Number.isNaN(amount) && amount >= 0) {
      onSetBudget(amount);
    }
  }

  let statusClass = 'budget-tracker__fill';
  if (isOverBudget) statusClass += ' budget-tracker__fill--over';
  else if (isNearLimit) statusClass += ' budget-tracker__fill--near';

  return (
    <div className="budget-tracker">
      <div className="budget-tracker__header">
        <h3>Monthly budget</h3>
        <form onSubmit={handleSubmit} className="budget-tracker__form">
          <input
            type="number"
            min="0"
            step="0.01"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Set a budget"
          />
          <button type="submit" className="btn btn--ghost btn--small">
            Set
          </button>
        </form>
      </div>

      {budget > 0 ? (
        <>
          <div className="budget-tracker__track">
            <div className={statusClass} style={{ width: `${percentUsed}%` }} />
          </div>
          <p className="budget-tracker__status">
            {formatCurrency(totalSpent)} of {formatCurrency(budget)} spent
            {isOverBudget && ' — over budget'}
            {isNearLimit && ' — approaching limit'}
          </p>
        </>
      ) : (
        <p className="budget-tracker__status">Set a monthly budget to track your progress.</p>
      )}
    </div>
  );
}
