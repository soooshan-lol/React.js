import { useState } from 'react';
import { CATEGORIES } from '../utils/helpers';

const emptyForm = {
  description: '',
  amount: '',
  category: CATEGORIES[0],
  date: new Date().toISOString().slice(0, 10),
};

export default function ExpenseForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(initialData);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.description.trim()) {
      nextErrors.description = 'Enter a description.';
    }
    const amountNumber = Number(form.amount);
    if (!form.amount || Number.isNaN(amountNumber) || amountNumber <= 0) {
      nextErrors.amount = 'Enter an amount greater than zero.';
    }
    if (!form.date) {
      nextErrors.date = 'Pick a date.';
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit({
      ...form,
      amount: Number(form.amount),
    });
    if (!isEditing) {
      setForm(emptyForm);
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <h2 className="expense-form__title">{isEditing ? 'Edit expense' : 'Add an expense'}</h2>

      <div className="expense-form__row">
        <label className="expense-form__field">
          <span>Description</span>
          <input
            type="text"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Groceries, bus pass, textbook..."
          />
          {errors.description && <small className="expense-form__error">{errors.description}</small>}
        </label>

        <label className="expense-form__field expense-form__field--narrow">
          <span>Amount</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder="0.00"
          />
          {errors.amount && <small className="expense-form__error">{errors.amount}</small>}
        </label>
      </div>

      <div className="expense-form__row">
        <label className="expense-form__field expense-form__field--narrow">
          <span>Category</span>
          <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="expense-form__field expense-form__field--narrow">
          <span>Date</span>
          <input type="date" value={form.date} onChange={(e) => handleChange('date', e.target.value)} />
          {errors.date && <small className="expense-form__error">{errors.date}</small>}
        </label>
      </div>

      <div className="expense-form__actions">
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Save changes' : 'Add expense'}
        </button>
      </div>
    </form>
  );
}
