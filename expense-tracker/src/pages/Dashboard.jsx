import { useExpenses } from '../context/ExpenseContext';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseFilters from '../components/ExpenseFilters';
import SummaryPanel from '../components/SummaryPanel';
import ExpenseList from '../components/ExpenseList';

export default function Dashboard() {
  const {
    expenses,
    visibleExpenses,
    filters,
    setFilters,
    editingExpense,
    setEditingExpense,
    submitExpense,
    deleteExpense,
  } = useExpenses();

  return (
    <section className="app__primary">
      <ExpenseForm
        key={editingExpense ? editingExpense.id : 'new'}
        initialData={editingExpense}
        onSubmit={submitExpense}
        onCancel={() => setEditingExpense(null)}
      />

      <ExpenseFilters filters={filters} onChange={setFilters} />

      <SummaryPanel expenses={visibleExpenses} />

      <ExpenseList
        expenses={visibleExpenses}
        hasExpenses={expenses.length > 0}
        onEdit={setEditingExpense}
        onDelete={deleteExpense}
      />
    </section>
  );
}
