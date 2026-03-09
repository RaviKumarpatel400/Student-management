import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import type { Student } from '../types';
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  StudentPayload,
  updateStudent,
} from '../services/studentService';

const PAGE_SIZE = 5;

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStudents();
      setStudents(data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      setError('Failed to load students');
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        s.email.toLowerCase().includes(term),
    );
  }, [students, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  async function handleCreate(payload: StudentPayload) {
    const promise = createStudent(payload);
    toast.promise(promise, {
      loading: 'Creating student...',
      success: 'Student created',
      error: 'Failed to create student',
    });
    const created = await promise;
    setStudents((prev) => [created, ...prev]);
  }

  async function handleUpdate(id: string, payload: StudentPayload) {
    const promise = updateStudent(id, payload);
    toast.promise(promise, {
      loading: 'Updating student...',
      success: 'Student updated',
      error: 'Failed to update student',
    });
    const updated = await promise;
    setStudents((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }

  async function handleDelete(id: string) {
    const promise = deleteStudent(id);
    toast.promise(promise, {
      loading: 'Deleting student...',
      success: 'Student deleted',
      error: 'Failed to delete student',
    });
    await promise;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  function resetPage() {
    setPage(1);
  }

  return {
    students,
    paged,
    filtered,
    loading,
    error,
    search,
    page: currentPage,
    totalPages,
    setSearch,
    setPage,
    resetPage,
    reload: load,
    createStudent: handleCreate,
    updateStudent: handleUpdate,
    deleteStudent: handleDelete,
  };
}

