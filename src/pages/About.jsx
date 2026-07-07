import Navbar from "../components/Navbar";

function About(){

return(

<>

<Navbar/>

<div className="max-w-6xl mx-auto py-16 px-6">

<h1 className="text-5xl font-bold">

About FinSage

</h1>

<div className="bg-white shadow-xl rounded-2xl mt-10 p-10">

<p>

This project recommends personalized investment portfolios using
risk profiling, Modern Portfolio Theory, and AI-inspired decision rules.

</p>

<h2 className="text-3xl font-bold mt-10">

Technologies Used

</h2>

<ul className="list-disc pl-8 mt-5 space-y-2">

<li>React</li>

<li>Tailwind CSS</li>

<li>Chart.js</li>

<li>React Router</li>

<li>Local Storage</li>

</ul>

</div>

</div>

</>

)

}

export default About;

