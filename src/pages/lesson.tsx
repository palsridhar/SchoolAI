import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import curriculum from "../../data/curriculum.json";
import Quiz from "../components/Quiz";

export default function LessonPage() {
  const router = useRouter();
  const { grade, subject } = router.query;
  const [lesson, setLesson] = useState("");
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const gradeKey = String(grade);
    const subjectKey = String(subject).charAt(0).toUpperCase() + String(subject).slice(1);
    if (
      curriculum.grades[gradeKey] &&
      curriculum.grades[gradeKey][subjectKey]
    ) {
      const lessonData = curriculum.grades[gradeKey][subjectKey];
      setLesson(lessonData.lesson);
      setQuiz(lessonData.quiz);
    }
  }, [grade, subject]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lesson</h1>
      <p>{lesson}</p>
      {quiz && <Quiz question={quiz.question} options={quiz.options} answer={quiz.answer} />}
    </div>
  );
}
