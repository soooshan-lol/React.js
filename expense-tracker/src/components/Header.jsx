export default function Header({ totalSpent, formatCurrency }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__mark">L</span>
        <div>
          <h1>Ledger</h1>
          <p className="app-header__tagline">Expense Tracking Manager</p>
        </div>
      </div>
      <div className="app-header__total">
        <span className="app-header__total-label">Total spent</span>
        <span className="app-header__total-value">{formatCurrency(totalSpent)}</span>
      </div>
    </header>
  );
}
