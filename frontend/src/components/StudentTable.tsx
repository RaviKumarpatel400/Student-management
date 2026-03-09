import React from 'react';
import { Edit2, Trash2, UserPlus } from 'lucide-react';
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
    <div className="overflow-hidden rounded-2xl border-2 border-slate-100 bg-white shadow-sm">
      <table className="min-w-full divide-y-2 divide-slate-100">
        <thead className="bg-slate-50/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
              Email
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400">
              Age
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx}>
                <td className="px-4 py-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-4 w-10 animate-pulse rounded bg-slate-200" />
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="ml-auto h-8 w-32 animate-pulse rounded bg-slate-200" />
                </td>
              </tr>
            ))
          ) : students.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-12 text-center"
              >
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                    <UserPlus className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">No students found</p>
                  <p className="text-xs mt-1">Try adding a new student to get started.</p>
                </div>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {student.age}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(student)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                      title="Edit Student"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(student)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 border border-red-100 bg-red-50 hover:bg-red-100 transition-colors shadow-sm"
                      title="Delete Student"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
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

