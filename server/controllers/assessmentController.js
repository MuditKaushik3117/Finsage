const db = require("../config/database");

// Risk Calculation
function calculateRisk(age, income, horizon) {
  let score = 0;

  const numAge = Number(age);
  const numIncome = Number(income);
  const numHorizon = parseInt(horizon, 10) || 0;

  if (numAge < 30) score += 30;
  else if (numAge < 45) score += 20;
  else score += 10;

  if (numIncome > 1000000) score += 30;
  else if (numIncome > 500000) score += 20;
  else score += 10;

  if (numHorizon >= 10) score += 40;
  else if (numHorizon >= 5) score += 25;
  else score += 10;

  if (score >= 80) return "High";
  if (score >= 50) return "Medium";
  return "Low";
}

exports.saveAssessment = (req, res) => {
  const {
    userId,
    age,
    income,
    goal,
    horizon,
    monthlyInvestment,
  } = req.body;

  const risk = calculateRisk(age, income, horizon);

  db.run(
    `INSERT INTO assessments
    (userId, age, income, risk, goal, horizon, monthlyInvestment)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      age,
      income,
      risk,
      goal,
      horizon,
      monthlyInvestment,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        success: true,
        risk,
        assessmentId: this.lastID,
      });
    }
  );
};

exports.getAssessment = (req, res) => {
  const { userId } = req.params;

  db.get(
    "SELECT * FROM assessments WHERE userId=? ORDER BY id DESC LIMIT 1",
    [userId],
    (err, row) => {
      if (err) return res.status(500).json(err);

      res.json(row || {});
    }
  );
};

