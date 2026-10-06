const baseUrl = "https://api.frankfurter.dev/v1";

async function getRates(base = "SEK", symbols = "EUR,USD,GBP") {
  const url = new URL(`${baseUrl}/latest`);
  url.searchParams.set("base", base);
  url.searchParams.set("symbols", symbols);
  try {
    const response = await fetch(url);
    console.log(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return {
      base: data.base,
      date: data.date,
      rates: data.rates
    };
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
}

export default getRates;
