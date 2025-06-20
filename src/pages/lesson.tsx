
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LessonData {
  lesson: string;
  quiz: {
    question: string;
    options: string[];
    answer: string;
  };
}

export default function LessonPage() {
  const searchParams = useSearchParams();
  const grade = searchParams.get("grade") || "";
  const subject = searchParams.get("subject") || "";
  const chapter = searchParams.get("chapter") || "";

  const [data, setData] = useState<LessonData | null>(null);
  const [selected, setSelected] = useState<string>("");
  const [showPassed, setShowPassed] = useState(false);

  useEffect(() => {
    fetch("/data/curriculum.json")
      .then(res => res.json())
      .then(json => {
        const lessonData = json?.grades?.[grade]?.[subject]?.Chapters?.[chapter];
        if (lessonData) setData(lessonData);
      });
  }, [grade, subject, chapter]);

  const handleSubmit = () => {
    if (selected === data?.quiz.answer) {
      setShowPassed(true);
    } else {
      alert("Incorrect. Try again!");
    }
  };

  if (!data) return <div className="p-6">Loading lesson...</div>;

  if (showPassed) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">🎉 Lesson Passed!</h2>
        <p className="mt-4 text-lg">You answered the quiz correctly.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-2">{grade} - {subject}</h1>
      <h2 className="text-lg font-semibold mb-4">{chapter}</h2>
      <p className="bg-blue-50 p-4 rounded mb-6">{data.lesson}</p>

      <div className="bg-yellow-50 p-4 rounded mb-4">
        <p className="font-semibold mb-2">📝 {data.quiz.question}</p>
        {data.quiz.options.map((opt, idx) => (
          <label key={idx} className="block mb-2">
            <input
              type="radio"
              name="quiz"
              value={opt}
              checked={selected === opt}
              onChange={() => setSelected(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
        <button
          onClick={handleSubmit}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
}
