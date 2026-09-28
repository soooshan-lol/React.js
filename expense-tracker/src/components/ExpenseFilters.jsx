import { CATEGORIES } from '../utils/helpers';

export default function ExpenseFilters({ filters, onChange }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value });
  }

  return (
    <div className="expense-filters">
      <input
        type="text"
        className="expense-filters__search"
        placeholder="Search expenses..."
        value={filters.searchTerm}
        onChange={(e) => update('searchTerm', e.target.value)}
      />

      <select value={filters.category} onChange={(e) => update('category', e.target.value)}>
        <option value="All">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select value={filters.sortBy} onChange={(e) => update('sortBy', e.target.value)}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Amount: high to low</option>
        <option value="amount-asc">Amount: low to high</option>
      </select>
    </div>
  );
}
