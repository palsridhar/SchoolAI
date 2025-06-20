import { useRouter } from "next/router";
import Link from "next/link";
export default function SubjectSelection() {
  const router = useRouter();
  const { grade } = router.query;
  const subjects = ["Math"];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select Subject</h1>
      <ul className="space-y-2">
        {subjects.map((s) => (
          <li key={s}>
            <Link href={`/lesson?grade=${grade}&subject=${s.toLowerCase()}`} className="text-blue-600 hover:underline">
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
