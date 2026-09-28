import { formatCurrency } from '../utils/helpers';

export default function CategoryBreakdown({ categoryTotals }) {
  const entries = Object.entries(categoryTotals).filter(([, amount]) => amount > 0);
  const maxAmount = Math.max(...entries.map(([, amount]) => amount), 1);

  if (entries.length === 0) {
    return (
      <div className="category-breakdown category-breakdown--empty">
        <p>No spending recorded yet. Category breakdown will appear here.</p>
      </div>
    );
  }

  return (
    <div className="category-breakdown">
      <h3 className="category-breakdown__title">Spending by category</h3>
      <div className="category-breakdown__bars">
        {entries
          .sort((a, b) => b[1] - a[1])
          .map(([category, amount]) => (
            <div className="category-breakdown__row" key={category}>
              <span className="category-breakdown__label">{category}</span>
              <div className="category-breakdown__track">
                <div
                  className={`category-breakdown__fill category-breakdown__fill--${category.toLowerCase()}`}
                  style={{ width: `${(amount / maxAmount) * 100}%` }}
                />
              </div>
              <span className="category-breakdown__amount">{formatCurrency(amount)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
