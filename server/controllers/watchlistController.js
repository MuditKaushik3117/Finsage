const db = require("../config/database");

exports.addWatchlist = (req, res) => {
    const { userId, symbol } = req.body;

    db.run(
        "INSERT INTO watchlist(userId,symbol) VALUES(?,?)",
        [userId, symbol],
        function (err) {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: "Added to Watchlist"
            });
        }
    );
};

exports.getWatchlist = (req, res) => {
    const userId = req.params.userId;

    db.all(
        "SELECT * FROM watchlist WHERE userId=?",
        [userId],
        (err, rows) => {
            if (err)
                return res.status(500).json(err);

            res.json(rows);
        }
    );
};

exports.deleteWatchlist = (req, res) => {

    db.run(
        "DELETE FROM watchlist WHERE id=?",
        [req.params.id],
        function(err){

            if(err)
                return res.status(500).json(err);

            res.json({
                success:true
            });

        }

    );

};

