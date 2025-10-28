import { useEffect, useState } from "react";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  // Fetch exchange rates
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const convert = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const usdAmount = amount / rates[fromCurrency];
    const converted = usdAmount * rates[toCurrency];
    setResult(converted.toFixed(2));
  };

  const currencyOptions = Object.keys(rates);

  return (
    <div>
      <h1>Currency Converter</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencyOptions.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <span> ➡ </span>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencyOptions.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button onClick={convert}>Convert</button>

      {result && (
        <h2>
          {amount} {fromCurrency} = {result} {toCurrency}
        </h2>
      )}
    </div>
  );
}

export default App;
