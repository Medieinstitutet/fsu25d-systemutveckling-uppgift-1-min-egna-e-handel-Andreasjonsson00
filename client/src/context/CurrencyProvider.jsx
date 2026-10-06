import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("SEK");
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/currency");

        if (!response.ok) {
          throw new Error("Failed to fetch currency rates");
        }

        const data = await response.json();

        setRates(data.rates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = (price) => {
    if (currency === "SEK") {
      return price;
    }

    if (!rates[currency]) {
      return price;
    }

    return price * rates[currency];
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        rates,
        loading,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
};