export default function PerformanceCard({ title, value, color }) {
  const displayColor = color.includes('green') 
    ? 'text-emerald-400' 
    : color.includes('blue') 
      ? 'text-indigo-400' 
      : color.includes('purple') 
        ? 'text-fuchsia-400' 
        : color;

  return (
    <div className="glass-panel p-8 border border-white/5 shadow-2xl relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <h3 className="text-gray-400 font-medium text-sm">
        {title}
      </h3>
      <h2 className={`text-4xl font-black mt-4 ${displayColor}`}>
        {value}
      </h2>
    </div>
  );
}
