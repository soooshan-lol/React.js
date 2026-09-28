import axios from 'axios';

// Free, no-key public API that returns the latest exchange rates
// against a base currency. Used to show the user's total spending
// converted into a few other currencies.
const EXCHANGE_RATE_URL = 'https://open.er-api.com/v6/latest/USD';

export async function fetchExchangeRates() {
  const response = await axios.get(EXCHANGE_RATE_URL);
  return response.data.rates;
}
