const db = require("../config/database");

exports.generatePortfolio = (req, res) => {

    const userId = req.params.userId;

    db.get(

        "SELECT * FROM assessments WHERE userId=? ORDER BY id DESC LIMIT 1",

        [userId],

        (err, assessment) => {

            if (err)
                return res.status(500).json(err);

            if (!assessment)
                return res.status(404).json({
                    success: false,
                    message: "Assessment not found"
                });

            let allocation;

            switch (assessment.risk) {

                case "High":

                    allocation = {

                        stocks: 70,
                        etf: 15,
                        bonds: 5,
                        gold: 5,
                        cash: 5

                    };

                    break;

                case "Medium":

                    allocation = {

                        stocks: 50,
                        etf: 20,
                        bonds: 15,
                        gold: 10,
                        cash: 5

                    };

                    break;

                default:

                    allocation = {

                        stocks: 25,
                        etf: 20,
                        bonds: 35,
                        gold: 10,
                        cash: 10

                    };

            }

            db.run(

                `INSERT INTO portfolios
                (userId,stocks,etf,bonds,gold,cash)
                VALUES(?,?,?,?,?,?)`,

                [

                    userId,

                    allocation.stocks,

                    allocation.etf,

                    allocation.bonds,

                    allocation.gold,

                    allocation.cash

                ],

                function(err){

                    if(err)
                        return res.status(500).json(err);

                    res.json({

                        success:true,

                        portfolio:allocation

                    });

                }

            );

        }

    );

};

exports.getPortfolio = (req,res)=>{

    db.get(

        "SELECT * FROM portfolios WHERE userId=? ORDER BY id DESC LIMIT 1",

        [req.params.userId],

        (err,row)=>{

            if(err)
                return res.status(500).json(err);

            res.json(row || {});

        }

    );

};

