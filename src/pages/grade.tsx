import Link from "next/link";

const grades = [1, 2, 3, 4, 5, 6];

export default function GradeSelection() {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Select Your Grade</h1>
      <div className="grid grid-cols-3 gap-4">
        {grades.map((grade) => (
          <Link key={grade} href={`/subject?grade=${grade}`}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg p-6 text-center cursor-pointer border border-blue-200 hover:bg-blue-100 transition">
              <span className="text-xl font-medium text-blue-600">Grade {grade}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
