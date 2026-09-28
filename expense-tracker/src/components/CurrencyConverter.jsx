import { useEffect, useState } from 'react';
import { fetchExchangeRates } from '../services/currencyService';
import { formatCurrency } from '../utils/helpers';

const DISPLAY_CURRENCIES = ['EUR', 'GBP', 'INR', 'NPR'];

export default function CurrencyConverter({ totalSpent }) {
  const [rates, setRates] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const data = await fetchExchangeRates();
        if (!cancelled) {
          setRates(data);
          setStatus('success');
        }
      } catch (err) {
        console.error('Could not fetch exchange rates:', err);
        if (!cancelled) {
          setStatus('error');
        }
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="currency-converter">
      <h3 className="currency-converter__title">Total spent, converted</h3>

      {status === 'loading' && <p className="currency-converter__status">Fetching live exchange rates...</p>}

      {status === 'error' && (
        <p className="currency-converter__status">
          Live rates unavailable right now. Showing {formatCurrency(totalSpent)} in USD only.
        </p>
      )}

      {status === 'success' && rates && (
        <ul className="currency-converter__list">
          <li className="currency-converter__row">
            <span>USD</span>
            <span>{formatCurrency(totalSpent)}</span>
          </li>
          {DISPLAY_CURRENCIES.map((code) => (
            <li className="currency-converter__row" key={code}>
              <span>{code}</span>
              <span>{(totalSpent * rates[code]).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
