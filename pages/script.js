document.addEventListener('DOMContentLoaded', function() {
    
    async function convertCurrency() {
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');
        const amountInput = document.getElementById('amount');
        const resultElement = document.getElementById('result');

        if (!fromCurrencySelect || !toCurrencySelect || !amountInput || !resultElement) {
            console.error('One or more required DOM elements were not found.');
            return;
        }

        try {
        
            const fromCurrency = fromCurrencySelect.value;
            const toCurrency = toCurrencySelect.value;
            const amount = parseFloat(amountInput.value);

            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount.');
                return;
            }

            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const data = await response.json();


            if (data && data.rates) {
                const rates = data.rates;

                const convertedAmount = amount * rates[toCurrency];

                resultElement.textContent = `${amount.toFixed(2)} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}`;
            } else {
                console.error('No rates data found in API response.');
            }
        } catch (error) {
            console.error('Error converting currency:', error);
        }
    }

    const convertBtn = document.getElementById('convertBtn');
    if (convertBtn) {
        convertBtn.addEventListener('click', convertCurrency);
    } else {
        console.error('Convert button element not found.');
    }

    async function fetchAndPopulateCurrencies() {
        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        if (!fromCurrencySelect || !toCurrencySelect) {
            console.error('Currency select elements not found.');
            return;
        }

        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();

            if (data && data.rates) {
                const rates = data.rates;
                const currencies = Object.keys(rates);

                currencies.forEach(currency => {
                    const fromOption = document.createElement('option');
                    fromOption.value = currency;
                    fromOption.textContent = currency;
                    fromCurrencySelect.appendChild(fromOption);

                    const toOption = document.createElement('option');
                    toOption.value = currency;
                    toOption.textContent = currency;
                    toCurrencySelect.appendChild(toOption);
                });

                fromCurrencySelect.value = 'USD';
                toCurrencySelect.value = 'INR';
            } else {
                console.error('No rates data found in API response.');
            }
        } catch (error) {
            console.error('Error fetching and populating currencies:', error);
        }
    }

    fetchAndPopulateCurrencies();
});
