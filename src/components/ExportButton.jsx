import { useState } from "react";

export default function ExportButton({ user }) {
  const [downloading, setDownloading] = useState(false);

  const downloadReport = async () => {
    if (!user || !user.id) {
      alert("User not logged in.");
      return;
    }

    try {
      setDownloading(true);
      const response = await fetch(`http://localhost:5000/api/report/${user.id}`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Failed to download PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FinSage_Report.pdf");
      document.body.appendChild(link);
      link.click();
      
      // Clean up DOM and memory
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Download error:", error);
      alert("Unable to download the report as a PDF file. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadReport}
      disabled={downloading}
      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-xl transition duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 hover:-translate-y-0.5 disabled:opacity-50"
    >
      {downloading ? "Generating PDF..." : "Download Report"}
    </button>
  );
}
