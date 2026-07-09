const axios = require("axios");

const API = process.env.FINNHUB_API_KEY;

exports.getNews = async (req, res) => {

    try{

        const symbol=req.params.symbol;

        const today=new Date();

        const monthAgo=new Date();

        monthAgo.setDate(today.getDate()-30);

        const to=today.toISOString().split("T")[0];

        const from=monthAgo.toISOString().split("T")[0];

        const response=await axios.get(

`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${API}`

        );

        res.json(response.data);

    }

    catch(err){

        res.status(500).json(err);

    }

};

