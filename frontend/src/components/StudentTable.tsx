import React from 'react';
import type { Student } from '../types';

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl shadow-slate-950/40">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-900/80">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Age
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 bg-slate-950/60">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-800" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-10 animate-pulse rounded bg-slate-800" />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="ml-auto h-8 w-32 animate-pulse rounded bg-slate-800" />
                </td>
              </tr>
            ))
          ) : students.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-8 text-center text-sm text-slate-400"
              >
                No students found. Try adding a new one.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td className="px-4 py-3 text-sm font-medium text-slate-100">
                  {student.name}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {student.email}
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">
                  {student.age}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(student)}
                      className="btn-secondary px-3 py-1 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(student)}
                      className="btn-primary px-3 py-1 text-xs bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

