import * as XLSX from 'xlsx';
import type { Student } from '../types';

export function exportStudentsToExcel(
  students: Student[],
  filename = 'students.xlsx',
) {
  if (!students.length) return;

  const rows = students.map((s) => ({
    Name: s.name,
    Email: s.email,
    Age: s.age,
    CreatedAt:
      typeof s.createdAt === 'string'
        ? new Date(s.createdAt).toLocaleString()
        : s.createdAt.toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
  XLSX.writeFile(workbook, filename);
}

