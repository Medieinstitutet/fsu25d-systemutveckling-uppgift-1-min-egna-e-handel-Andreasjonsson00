import getRates from "../integrations/currencyAdapter.js";

const getCurrency = async (req, res) => {
     try {
    const rates = await getRates();

    res.json(rates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default getCurrency;