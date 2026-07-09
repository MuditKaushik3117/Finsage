function Insights() {
  return (
    <div className="glass-panel p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
        AI Insights
      </h2>
      <ul className="mt-6 space-y-4 text-gray-300">
        <li className="flex items-center gap-3">
          <span className="text-emerald-400">✔</span>
          <span>Diversification is healthy across current assets.</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-emerald-400">✔</span>
          <span>Risk profile matches your calculated score.</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-emerald-400">✔</span>
          <span>Long-term compounding strategy is recommended.</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-emerald-400">✔</span>
          <span>Maintain a consistent monthly investment cycle.</span>
        </li>
        <li className="flex items-center gap-3">
          <span className="text-emerald-400">✔</span>
          <span>Consider rebalancing assets every 6 months.</span>
        </li>
      </ul>
    </div>
  );
}

export default Insights;
