import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExpenseProvider, useExpenses } from './context/ExpenseContext';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import { formatCurrency } from './utils/helpers';

// Split out so it can call useExpenses() — that hook only works
// inside components rendered below ExpenseProvider in the tree.
function AppShell() {
  const { totalSpent } = useExpenses();

  return (
    <div className="app">
      <Header totalSpent={totalSpent} formatCurrency={formatCurrency} />
      <NavBar />
      <main className="app__layout">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ExpenseProvider>
        <AppShell />
      </ExpenseProvider>
    </BrowserRouter>
  );
}
