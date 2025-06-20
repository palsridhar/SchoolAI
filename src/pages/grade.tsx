import Link from "next/link";
export default function GradeSelection() {
  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Your Grade</h1>
      <ul className="space-y-2">
        {grades.map((g) => (
          <li key={g}>
            <Link href={`/subject?grade=${encodeURIComponent(g)}`} className="text-blue-600 hover:underline">
              {g}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
