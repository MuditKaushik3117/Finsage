export function generatePortfolio(user) {

    const age = Number(user.age);

    let allocation = {};

    // Conservative
    if (user.risk === "Low") {

        allocation = {
            Stocks: 20,
            ETFs: 20,
            Bonds: 40,
            Gold: 15,
            Cash: 5,
            expectedReturn: "8%",
            riskLevel: "Low"
        };

    }

    // Moderate
    else if (user.risk === "Moderate") {

        allocation = {
            Stocks: 45,
            ETFs: 25,
            Bonds: 15,
            Gold: 10,
            Cash: 5,
            expectedReturn: "12%",
            riskLevel: "Moderate"
        };

    }

    // Aggressive
    else {

        allocation = {
            Stocks: 65,
            ETFs: 15,
            Bonds: 5,
            Gold: 10,
            Cash: 5,
            expectedReturn: "16%",
            riskLevel: "High"
        };

    }

    // Young investors

    if (age < 30) {

        allocation.Stocks += 5;
        allocation.Bonds -= 5;

    }

    // Older investors

    if (age > 55) {

        allocation.Bonds += 10;
        allocation.Stocks -= 10;

    }

    return allocation;

}

