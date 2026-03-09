import axios from 'axios';
import type { Student } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
});

export interface StudentPayload {
  name: string;
  email: string;
  age: number;
}

export async function fetchStudents(): Promise<Student[]> {
  const res = await api.get<Student[]>('/students');
  return res.data;
}

export async function createStudent(payload: StudentPayload): Promise<Student> {
  const res = await api.post<Student>('/students', payload);
  return res.data;
}

export async function updateStudent(
  id: string,
  payload: StudentPayload,
): Promise<Student> {
  const res = await api.put<Student>(`/students/${id}`, payload);
  return res.data;
}

export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/students/${id}`);
}

