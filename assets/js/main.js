document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const swapBtn = document.getElementById('swap-btn');
    const convertBtn = document.getElementById('convert-btn');
    const resultAmount = document.getElementById('result-amount');
    const rateInfo = document.getElementById('rate-info');
    const lastUpdated = document.getElementById('last-updated');
    
    const currencies = {
        USD: { name: 'US Dollar', symbol: '$' },
        EUR: { name: 'Euro', symbol: '€' },
        GBP: { name: 'British Pound', symbol: '£' },
        JPY: { name: 'Japanese Yen', symbol: '¥' },
        AUD: { name: 'Australian Dollar', symbol: 'A$' },
        CAD: { name: 'Canadian Dollar', symbol: 'C$' },
        CHF: { name: 'Swiss Franc', symbol: 'Fr' },
        CNY: { name: 'Chinese Yuan', symbol: '¥' },
        INR: { name: 'Indian Rupee', symbol: '₹' },
        MXN: { name: 'Mexican Peso', symbol: '$' },
        BRL: { name: 'Brazilian Real', symbol: 'R$' },
        RUB: { name: 'Russian Ruble', symbol: '₽' },
        KRW: { name: 'South Korean Won', symbol: '₩' },
        SGD: { name: 'Singapore Dollar', symbol: 'S$' },
        NZD: { name: 'New Zealand Dollar', symbol: 'NZ$' },
        ZAR: { name: 'South African Rand', symbol: 'R' },
        TRY: { name: 'Turkish Lira', symbol: '₺' },
        SEK: { name: 'Swedish Krona', symbol: 'kr' },
        NOK: { name: 'Norwegian Krone', symbol: 'kr' },
        DKK: { name: 'Danish Krone', symbol: 'kr' },
        PLN: { name: 'Polish Zloty', symbol: 'zł' },
        HUF: { name: 'Hungarian Forint', symbol: 'Ft' },
        CZK: { name: 'Czech Koruna', symbol: 'Kč' },
        ILS: { name: 'Israeli Shekel', symbol: '₪' },
        MYR: { name: 'Malaysian Ringgit', symbol: 'RM' },
        PHP: { name: 'Philippine Peso', symbol: '₱' },
        IDR: { name: 'Indonesian Rupiah', symbol: 'Rp' },
        THB: { name: 'Thai Baht', symbol: '฿' },
        VND: { name: 'Vietnamese Dong', symbol: '₫' },
        AED: { name: 'UAE Dirham', symbol: 'د.إ' },
        SAR: { name: 'Saudi Riyal', symbol: '﷼' },
        COP: { name: 'Colombian Peso', symbol: '$' },
        AZN: { name: 'Azerbaijani Manat', symbol: '₼' }
    };
    
    let exchangeRates = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.74,
        JPY: 110.42,
        AUD: 1.34,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.47,
        INR: 74.38,
        MXN: 20.05,
        BRL: 5.25,
        RUB: 73.96,
        KRW: 1136.50,
        SGD: 1.35,
        NZD: 1.41,
        ZAR: 14.78,
        TRY: 8.45,
        SEK: 8.62,
        NOK: 8.95,
        DKK: 6.32,
        PLN: 3.94,
        HUF: 295.3,
        CZK: 21.57,
        ILS: 3.28,
        MYR: 4.15,
        PHP: 50.12,
        IDR: 14200,
        THB: 33.3,
        VND: 23000,
        AED: 3.67,
        SAR: 3.75,
        COP: 3850,
        AZN: 1.7
    };
    
    function initializeCurrencyDropdowns() {
        for (const currency in currencies) {
            const fromOption = document.createElement('option');
            fromOption.value = currency;
            fromOption.textContent = `${currency} - ${currencies[currency].name}`;
            fromCurrency.appendChild(fromOption);
            
            const toOption = document.createElement('option');
            toOption.value = currency;
            toOption.textContent = `${currency} - ${currencies[currency].name}`;
            toCurrency.appendChild(toOption);
        }
        
        fromCurrency.value = 'USD';
        toCurrency.value = 'AZN';
    }
    
    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        
        if (amountInput.value === '' || isNaN(amount) || amount <= 0) {
            resultAmount.textContent = '';
            rateInfo.textContent = '';
            lastUpdated.textContent = '';
            return;
        }
        
        const from = fromCurrency.value;
        const to = toCurrency.value;
        
        if (!exchangeRates[from] || !exchangeRates[to]) {
            resultAmount.textContent = 'Conversion rate not available for selected currencies';
            rateInfo.textContent = '';
            lastUpdated.textContent = '';
            return;
        }
        
        const rate = exchangeRates[to] / exchangeRates[from];
        const convertedAmount = amount * rate;
        
        resultAmount.textContent = `${amount.toFixed(2)} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
        
        const now = new Date();
        lastUpdated.textContent = now.toLocaleTimeString();
    }
    
    function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        convertCurrency();
        
        swapBtn.classList.add('active');
        setTimeout(() => swapBtn.classList.remove('active'), 300);
    }
    
    amountInput.addEventListener('input', () => {
        if (amountInput.value === '') {
            resultAmount.textContent = '';
            rateInfo.textContent = '';
            lastUpdated.textContent = '';
            return;
        }
        if (parseFloat(amountInput.value) < 0) {
            alert('You cannot enter a negative value!');
            amountInput.value = 0;
            convertCurrency();
            return;
        }
        convertCurrency();
    });
    
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    
    amountInput.value = 0;
    initializeCurrencyDropdowns();
    convertCurrency();
});

const mediaQuery = window.matchMedia('(max-width: 768px)');

function handleMobileChange(e) {
  if (e.matches) {
    document.body.style.backgroundColor = '#f0f0f0'; 
  } else {
    document.body.style.backgroundColor = ''; 
  }
}

handleMobileChange(mediaQuery);

mediaQuery.addEventListener('change', handleMobileChange);
