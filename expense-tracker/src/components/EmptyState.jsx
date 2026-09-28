export default function EmptyState({ hasExpenses }) {
  return (
    <div className="empty-state">
      {hasExpenses ? (
        <>
          <p className="empty-state__title">No expenses match your filters.</p>
          <p className="empty-state__body">Try a different search term or clear the category filter.</p>
        </>
      ) : (
        <>
          <p className="empty-state__title">No expenses yet.</p>
          <p className="empty-state__body">Add your first expense above to start tracking.</p>
        </>
      )}
    </div>
  );
}
