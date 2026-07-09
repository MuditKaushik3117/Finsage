import Navbar from "../components/Navbar";
import Floating3DBackground from "../components/Floating3DBackground";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Navbar />
      <Floating3DBackground />

      <div className="min-h-screen text-white relative z-10 py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-gray-200 to-indigo-300 bg-clip-text text-transparent tracking-tight">
              About FinSage
            </h1>
            <a
              href="http://localhost:5000/api/report/presentation"
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow transition"
            >
              📄 Download Pitch PDF
            </a>
          </div>

          <div className="glass-panel p-10 border border-white/5 shadow-2xl rounded-2xl">
            <p className="text-lg text-gray-300 leading-relaxed">
              FinSage is a next-generation AI-powered investment portfolio advisor. 
              By aligning user-specific risk assessments, financial parameters, and investment goals 
              with modern financial principles and rule-based decision mechanisms, 
              FinSage assists users in structuring customized, diversified portfolios for long-term wealth creation.
            </p>

            <h2 className="text-3xl font-bold mt-10 mb-6 bg-gradient-to-r from-indigo-200 to-cyan-200 bg-clip-text text-transparent">
              Key Technologies
            </h2>

            <ul className="grid sm:grid-cols-2 gap-4 text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>React & Single Page Routing</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>Tailwind CSS Styling</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Chart.js Graphics Engine</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span>Framer Motion Spring Physics</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Express Node Backend API</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>SQLite Local Database Storage</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </>
  );
}
