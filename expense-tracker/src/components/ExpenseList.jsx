import ExpenseItem from './ExpenseItem';
import EmptyState from './EmptyState';

export default function ExpenseList({ expenses, hasExpenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return <EmptyState hasExpenses={hasExpenses} />;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
