import NavigationBar from "../components/NavigationBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const curriculum = {
  grades: {
    "1": {
      math: {
        lesson: "Learn to add numbers. Example: 2 + 3 = 5.",
        quiz: { question: "What is 2 + 3?", answer: "5" }
      }
    }
  }
};

export default function LessonPage() {
  const router = useRouter();
  const grade = Array.isArray(router.query.grade) ? router.query.grade[0] : router.query.grade;
  const subject = Array.isArray(router.query.subject) ? router.query.subject[0] : router.query.subject;

  const [lessonContent, setLessonContent] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [quizPassed, setQuizPassed] = useState(false);

  useEffect(() => {
    if (grade && subject) {
      const lessonData = curriculum.grades?.[grade]?.[subject];
      if (lessonData) {
        setLessonContent(lessonData.lesson);
        setQuizQuestion(lessonData.quiz.question);
        setCorrectAnswer(lessonData.quiz.answer);
      } else {
        setLessonContent("Lesson content not found.");
      }
    }
  }, [grade, subject]);

  const handleQuizSubmit = () => {
    if (answer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setFeedback("");
      setQuizPassed(true);
    } else {
      setFeedback("❌ Oops! Try again.");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="min-h-screen bg-yellow-50 p-6">
        <h1 className="text-2xl font-bold text-yellow-700 mb-4">
          Grade {grade} - {subject?.toString().toUpperCase()} Lesson
        </h1>

        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Lesson Content</h2>
          <p>{lessonContent}</p>
        </div>

        {!showQuiz && !quizPassed && (
          <button onClick={() => setShowQuiz(true)} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
            Take Quiz
          </button>
        )}

        {showQuiz && !quizPassed && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-md font-semibold mb-2">{quizQuestion}</h3>
            <input className="border p-2 rounded w-full mb-2" placeholder="Your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={handleQuizSubmit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Submit
            </button>
            {feedback && <p className="mt-2 font-medium">{feedback}</p>}
          </div>
        )}

        {quizPassed && (
          <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-2">🎉 You Passed!</h2>
            <p className="text-lg">Great job completing the quiz. You're ready for the next lesson!</p>
          </div>
        )}
      </div>
    </>
  );
}
