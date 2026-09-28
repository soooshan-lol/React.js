# Ledger — Expense Tracking Manager

A React-based expense tracker for logging, filtering, and understanding personal spending.
Built with functional components, hooks, and localStorage persistence — no backend required.

## Features

- Add, edit, and delete expenses (full CRUD)
- Search expenses by description
- Filter by category
- Sort by date or amount
- Live summary panel (entry count, total, average)
- Category-wise spending breakdown
- Monthly budget tracker with progress and over-budget warnings
- Live currency conversion of total spending (via a public exchange-rate API)
- Two-page navigation (Dashboard / Reports) with React Router
- Shared state via Context API
- Data persists locally across browser sessions
- Responsive layout (desktop and mobile)

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints in your terminal.

## Build for production

```bash
npm run build
```

## Project structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── NavBar.jsx
│   ├── ExpenseForm.jsx
│   ├── ExpenseFilters.jsx
│   ├── ExpenseList.jsx
│   ├── ExpenseItem.jsx
│   ├── SummaryPanel.jsx
│   ├── CategoryBreakdown.jsx
│   ├── BudgetTracker.jsx
│   ├── CurrencyConverter.jsx
│   └── EmptyState.jsx
├── pages/
│   ├── Dashboard.jsx
│   └── Reports.jsx
├── context/
│   └── ExpenseContext.jsx
├── services/
│   └── currencyService.js
├── utils/
│   ├── storage.js
│   └── helpers.js
├── App.jsx
├── main.jsx
└── index.css
```
