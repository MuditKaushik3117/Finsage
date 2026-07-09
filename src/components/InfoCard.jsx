export default function InfoCard({ title, value }) {
  return (
    <div className="glass-panel p-6 border border-white/5 shadow-2xl relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <h3 className="text-gray-400 font-medium text-sm">
        {title}
      </h3>
      <h2 className="text-3xl font-black mt-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        {value}
      </h2>
    </div>
  );
}
