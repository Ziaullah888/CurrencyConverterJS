import {currencies} from './currencies.js'

const button = document.getElementById('btn');
const output = document.getElementById('output');
const input = document.getElementById('amountInput');
const fromCurrencySelect = document.getElementById('from');
const toCurrencySelect = document.getElementById('to');

const baseUrl = "https://v6.exchangerate-api.com/v6/c5ced50cc85740ddf995eed9/latest/USD";

document.addEventListener('DOMContentLoaded', () => {
    
// Populate the "from" and "to" dropdowns
currencies.forEach(currency => {
    // For "From" currency dropdown
    const optionFrom = document.createElement('option');
    optionFrom.value = currency;
    optionFrom.textContent = currency;

    // Set the default "From" currency to "USD" and update the flag
    if (currency === "USD") {
        optionFrom.selected = true;
    }
    fromCurrencySelect.appendChild(optionFrom);

    // For "To" currency dropdown
    const optionTo = document.createElement('option');
    optionTo.value = currency;
    optionTo.textContent = currency;

    // Set the default "To" currency to "PKR" and update the flag
    if (currency === "PKR") {
        optionTo.selected = true;
    }
    toCurrencySelect.appendChild(optionTo);
});


// Update flag images when selecting a currency
fromCurrencySelect.addEventListener('change', (event) => {
    const currencyCode = event.target.value.slice(0, 2);
    document.getElementById('firstImg').setAttribute('src', `https://flagsapi.com/${currencyCode}/flat/64.png`);
});

toCurrencySelect.addEventListener('change', (event) => {
    const currencyCode = event.target.value.slice(0, 2);
    document.getElementById('secondImg').setAttribute('src', `https://flagsapi.com/${currencyCode}/flat/64.png`);
});
});

// Handle conversion when the "Convert" button is clicked
button.addEventListener('click', (e) => {
e.preventDefault(); // Prevent form submission

const amount = parseFloat(input.value);
if (isNaN(amount) || amount <= 0) {
    output.textContent = "Please enter a valid amount.";
    return;
}

const fromCurrency = fromCurrencySelect.value;
const toCurrency = toCurrencySelect.value;

fetch(baseUrl)
    .then(response => response.json())
    .then(data => {
    if (!data.conversion_rates || !data.conversion_rates[fromCurrency] || !data.conversion_rates[toCurrency]) {
        output.textContent = "Conversion rate not available.";
        return;
    }

    // Convert the amount
    const fromRate = data.conversion_rates[fromCurrency];
    const toRate = data.conversion_rates[toCurrency];
    const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);

    output.textContent = `${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`;
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    output.textContent = "Error fetching data. Please try again.";
    });
});