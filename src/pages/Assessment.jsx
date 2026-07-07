import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import questions from "../data/questions";

function Assessment() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    income: "",
    savings: "",
    goal: "",
    risk: "",
    horizon: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "portfolioUser",
      JSON.stringify(formData)
    );

    navigate("/recommendation");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto py-16">

        <h1 className="text-4xl font-bold mb-10 text-center">
          Investor Assessment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 space-y-6"
        >

          {questions.map((q) => (

            <div key={q.id}>

              <label className="block font-semibold mb-2">
                {q.label}
              </label>

              {q.type === "select" ? (

                <select
                  name={q.id}
                  value={formData[q.id]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                >

                  <option value="">Choose</option>

                  {q.options.map((option) => (

                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>

                  ))}

                </select>

              ) : (

                <input
                  type={q.type}
                  name={q.id}
                  value={formData[q.id]}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />

              )}

            </div>

          ))}

          <button
            className="w-full bg-blue-600 text-white py-4 rounded-xl text-lg hover:bg-blue-700 transition"
          >
            Generate Portfolio
          </button>

        </form>

      </div>

    </>
  );
}

export default Assessment;

