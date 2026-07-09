export default function InvestmentCard({ title, type, risk, returns }) {
  const riskColor = risk === "High" 
    ? "text-rose-400" 
    : risk === "Moderate" || risk === "Medium"
      ? "text-amber-400" 
      : "text-emerald-400";

  return (
    <div className="glass-panel p-6 border border-white/5 shadow-2xl relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="mt-4 space-y-2 text-sm text-gray-300">
        <p><span className="text-gray-500">Type:</span> <span className="font-semibold text-white">{type}</span></p>
        <p><span className="text-gray-500">Risk:</span> <span className={`font-semibold ${riskColor}`}>{risk}</span></p>
        <p><span className="text-gray-500">Expected Return:</span> <span className="font-bold text-indigo-400">{returns}</span></p>
      </div>
    </div>
  );
}
