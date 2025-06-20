
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ChapterRoute {
  grade: string;
  subject: string;
  chapter: string;
  path: string;
}

export default function LessonNav() {
  const [routes, setRoutes] = useState<ChapterRoute[]>([]);
  const [expandedGrade, setExpandedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  useEffect(() => {
    fetch("/data/lessonRoutes.json")
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  const subjects = Array.from(new Set(routes.map(r => r.subject)));

  const completedLessons = new Set<string>([
    "Grade 1:Math:Chapter 1: Counting Numbers", // sample completed lesson
  ]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-3">📚 Lesson Navigation</h2>

      <div className="mb-4">
        <label className="text-sm mr-2">Filter by Subject:</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">All</option>
          {subjects.map((subject, i) => (
            <option key={i} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      {Array.from(new Set(routes.map(r => r.grade))).map((grade, idx) => (
        <div key={idx} className="mb-3">
          <button
            onClick={() => setExpandedGrade(expandedGrade === grade ? null : grade)}
            className="w-full text-left font-semibold text-blue-700"
          >
            {expandedGrade === grade ? "▼" : "▶"} {grade}
          </button>
          {expandedGrade === grade && (
            <ul className="pl-4 mt-2 space-y-1">
              {routes
                .filter(r => r.grade === grade && (!selectedSubject || r.subject === selectedSubject))
                .map((route, i) => {
                  const lessonKey = `${route.grade}:${route.subject}:${route.chapter}`;
                  return (
                    <li key={i}>
                      <Link href={route.path}>
                        <span className="text-blue-600 hover:underline flex items-center">
                          {completedLessons.has(lessonKey) && (
                            <span className="text-green-500 mr-1">✔</span>
                          )}
                          {route.subject} → {route.chapter}
                        </span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
