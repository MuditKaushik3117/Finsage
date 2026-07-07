import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-5xl font-bold">
          Ready to Build Wealth?
        </h2>

        <p className="mt-6 text-xl">
          Get personalized investment recommendations powered by AI.
        </p>

        <Link
          to="/assessment"
          className="inline-block mt-10 bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>

      </div>
    </section>
  );
}

export default CTA;

