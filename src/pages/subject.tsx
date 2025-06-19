import { useRouter } from "next/router";
import Link from "next/link";

const subjects = ["Math", "English", "Science", "Social Studies"];

export default function SubjectSelection() {
  const router = useRouter();
  const grade = router.query.grade;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Select Subject for Grade {grade}</h1>
      <div className="grid grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Link key={subject} href={`/lesson?grade=${grade}&subject=${subject.toLowerCase()}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center cursor-pointer border border-green-200 hover:bg-green-100 transition">
              <span className="text-xl font-medium text-green-600">{subject}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
