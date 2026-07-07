const features = [
    {
      title: "AI Portfolio",
      desc: "Personalized investment recommendations.",
    },
    {
      title: "Risk Assessment",
      desc: "Evaluate your investment personality.",
    },
    {
      title: "Market Analysis",
      desc: "Understand market conditions.",
    },
    {
      title: "Portfolio Optimization",
      desc: "Diversified portfolios using MPT.",
    },
    {
      title: "Analytics",
      desc: "Interactive investment dashboards.",
    },
    {
      title: "Rebalancing",
      desc: "Automatic portfolio adjustments.",
    },
  ];
  
  function Features() {
    return (
      <section className="max-w-7xl mx-auto py-20">
  
        <h2 className="text-4xl font-bold text-center">
  
          Features
  
        </h2>
  
        <div className="grid grid-cols-3 gap-8 mt-16">
  
          {features.map((feature) => (
  
            <div
              key={feature.title}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold">
  
                {feature.title}
  
              </h3>
  
              <p className="mt-4 text-gray-600">
  
                {feature.desc}
  
              </p>
  
            </div>
  
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default Features;

  