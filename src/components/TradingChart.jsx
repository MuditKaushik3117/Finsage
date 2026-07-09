import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";

export default function TradingChart({ symbol }) {
  return (
    <div className="glass-panel p-5 border border-white/5 shadow-2xl rounded-2xl">
      <AdvancedRealTimeChart
        theme="dark"
        symbol={symbol}
        width="100%"
        height={550}
      />
    </div>
  );
}
