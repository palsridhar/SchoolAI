import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { FiUser, FiLogOut, FiBookOpen, FiList, FiHome } from "react-icons/fi";

export default function NavigationBar() {
  const router = useRouter();
  const grade = Array.isArray(router.query.grade) ? router.query.grade[0] : router.query.grade;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-b border-blue-200 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="SchoolAI Logo" width={40} height={40} />
          <span className="text-xl font-bold text-blue-800">SchoolAI</span>
        </div>
        <button
          className="sm:hidden text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <div className="hidden sm:flex items-center gap-4 text-sm sm:text-base text-blue-700">
          <Link href="/grade" className="hover:text-blue-900 flex items-center gap-1">
            <FiHome /> Grade
          </Link>
          {grade && (
            <>
              <Link href={`/subject?grade=${grade}`} className="hover:text-blue-900 flex items-center gap-1">
                <FiList /> Subject
              </Link>
              <Link href={`/lesson?grade=${grade}&subject=math`} className="hover:text-blue-900 flex items-center gap-1">
                <FiBookOpen /> Lesson
              </Link>
            </>
          )}
          <Link href="/profile" className="hover:text-blue-900 flex items-center gap-1">
            <FiUser /> Profile
          </Link>
          <Link href="/logout" className="hover:text-red-600 text-red-500 flex items-center gap-1">
            <FiLogOut /> Logout
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col sm:hidden mt-2 gap-2 text-blue-700 text-sm">
          <Link href="/grade" className="hover:text-blue-900 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
            <FiHome /> Grade
          </Link>
          {grade && (
            <>
              <Link href={`/subject?grade=${grade}`} className="hover:text-blue-900 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
                <FiList /> Subject
              </Link>
              <Link href={`/lesson?grade=${grade}&subject=math`} className="hover:text-blue-900 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
                <FiBookOpen /> Lesson
              </Link>
            </>
          )}
          <Link href="/profile" className="hover:text-blue-900 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
            <FiUser /> Profile
          </Link>
          <Link href="/logout" className="hover:text-red-600 text-red-500 flex items-center gap-1" onClick={() => setMenuOpen(false)}>
            <FiLogOut /> Logout
          </Link>
        </div>
      )}
    </nav>
  );
}
