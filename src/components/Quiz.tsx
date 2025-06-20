import { useState } from "react";
import PassedScreen from "./PassedScreen";

export default function Quiz({ question, options, answer }: any) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [passed, setPassed] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === answer) {
      setPassed(true);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Quiz</h2>
      <p>{question}</p>
      <div className="mt-2 space-y-1">
        {options.map((opt: string) => (
          <label key={opt} className="block">
            <input
              type="radio"
              name="quiz"
              value={opt}
              onChange={() => setSelected(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {submitted && passed && <PassedScreen />}
      {submitted && !passed && <p className="text-red-600 mt-2">Try again!</p>}
    </div>
  );
}
