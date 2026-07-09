export default function Floating3DBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#060813] overflow-hidden">
      {/* Sleek Grid Overlay (Indigo-500 tint) */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      
      {/* Tiny subtle grid dots overlay for tech/stocks texture */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Static premium ambient glows to add depth and color range */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute top-[40%] left-[30%] w-[800px] h-[800px] rounded-full bg-purple-500/3 blur-[200px]" />
    </div>
  );
}
