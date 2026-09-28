import { formatCurrency } from '../utils/helpers';

export default function SummaryPanel({ expenses }) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const count = expenses.length;
  const average = count > 0 ? total / count : 0;

  return (
    <div className="summary-panel">
      <div className="summary-panel__stat">
        <span className="summary-panel__label">Entries</span>
        <span className="summary-panel__value">{count}</span>
      </div>
      <div className="summary-panel__stat">
        <span className="summary-panel__label">Total</span>
        <span className="summary-panel__value">{formatCurrency(total)}</span>
      </div>
      <div className="summary-panel__stat">
        <span className="summary-panel__label">Average</span>
        <span className="summary-panel__value">{formatCurrency(average)}</span>
      </div>
    </div>
  );
}
