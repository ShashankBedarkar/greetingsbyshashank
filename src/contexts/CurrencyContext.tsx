import { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'INR' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'SGD';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => number;
  getSymbol: (curr?: Currency) => string;
  exchangeRates: ExchangeRates;
}

const exchangeRates: ExchangeRates = {
  USD: 1,
  INR: 83.12,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.51,
  JPY: 149.50,
  SGD: 1.35,
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  SGD: 'S$',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currency') as Currency;
      if (stored && (Object.keys(exchangeRates).includes(stored))) {
        return stored;
      }
    }
    return 'USD';
  });

  const convertPrice = (priceUSD: number): number => {
    return parseFloat((priceUSD * exchangeRates[currency]).toFixed(2));
  };

  const getSymbol = (curr?: Currency): string => {
    const selectedCurrency = curr || currency;
    return currencySymbols[selectedCurrency as Currency];
  };

  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        convertPrice,
        getSymbol,
        exchangeRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
