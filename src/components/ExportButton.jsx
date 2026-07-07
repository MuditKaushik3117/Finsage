import jsPDF from "jspdf";

function ExportButton(){

const exportPDF=()=>{

const user=JSON.parse(localStorage.getItem("portfolioUser"));

const portfolio=JSON.parse(localStorage.getItem("portfolio"));

const pdf=new jsPDF();

pdf.setFontSize(20);

pdf.text("AI Portfolio Report",20,20);

pdf.setFontSize(12);

pdf.text(`Name : ${user.name}`,20,40);

pdf.text(`Goal : ${user.goal}`,20,50);

pdf.text(`Risk : ${portfolio.riskLevel}`,20,60);

pdf.text(`Expected Return : ${portfolio.expectedReturn}`,20,70);

pdf.text(`Stocks : ${portfolio.Stocks}%`,20,90);

pdf.text(`ETF : ${portfolio.ETFs}%`,20,100);

pdf.text(`Bonds : ${portfolio.Bonds}%`,20,110);

pdf.text(`Gold : ${portfolio.Gold}%`,20,120);

pdf.text(`Cash : ${portfolio.Cash}%`,20,130);

pdf.save("Portfolio_Report.pdf");

}

return(

<button
onClick={exportPDF}
className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
>

Download PDF

</button>

)

}

export default ExportButton;

