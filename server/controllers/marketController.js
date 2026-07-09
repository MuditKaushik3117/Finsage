const axios = require("axios");

const API_KEY = process.env.FINNHUB_API_KEY;

exports.getQuote = async (req, res) => {
    try {

        const symbol = req.params.symbol;

        const quote = await axios.get(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );

        const profile = await axios.get(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`
        );

        res.json({
            success: true,
            quote: quote.data,
            profile: profile.data
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success: false,
            message: "Unable to fetch market data"
        });

    }
};

