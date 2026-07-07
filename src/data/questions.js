const questions = [
    {
      id: "name",
      label: "Full Name",
      type: "text"
    },
    {
      id: "age",
      label: "Age",
      type: "number"
    },
    {
      id: "income",
      label: "Annual Income (₹)",
      type: "number"
    },
    {
      id: "savings",
      label: "Current Savings (₹)",
      type: "number"
    },
    {
      id: "goal",
      label: "Investment Goal",
      type: "select",
      options: [
        "Wealth Creation",
        "Retirement",
        "Education",
        "Buying a House",
        "Emergency Fund"
      ]
    },
    {
      id: "risk",
      label: "Risk Appetite",
      type: "select",
      options: [
        "Low",
        "Moderate",
        "High"
      ]
    },
    {
      id: "horizon",
      label: "Investment Horizon",
      type: "select",
      options: [
        "1-3 Years",
        "3-5 Years",
        "5-10 Years",
        "10+ Years"
      ]
    }
  ];
  
  export default questions;
  

