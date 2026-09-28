import { formatCurrency, formatDate } from '../utils/helpers';

export default function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <div className="expense-item__main">
        <span className="expense-item__description">{expense.description}</span>
        <span className="expense-item__meta">
          <span className={`expense-item__category expense-item__category--${expense.category.toLowerCase()}`}>
            {expense.category}
          </span>
          <span className="expense-item__date">{formatDate(expense.date)}</span>
        </span>
      </div>
      <div className="expense-item__amount">{formatCurrency(expense.amount)}</div>
      <div className="expense-item__actions">
        <button className="btn btn--icon" onClick={() => onEdit(expense)} aria-label="Edit expense">
          Edit
        </button>
        <button className="btn btn--icon btn--danger" onClick={() => onDelete(expense.id)} aria-label="Delete expense">
          Delete
        </button>
      </div>
    </li>
  );
}
