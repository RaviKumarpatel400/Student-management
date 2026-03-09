import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { StudentTable } from '../components/StudentTable';
import { StudentModal, StudentFormValues } from '../components/StudentModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';
import { useStudents } from '../hooks/useStudents';
import { exportStudentsToExcel } from '../utils/excel';
import type { Student } from '../types';

export const DashboardPage: React.FC = () => {
  const {
    paged,
    filtered,
    loading,
    search,
    page,
    totalPages,
    setSearch,
    setPage,
    resetPage,
    createStudent,
    updateStudent,
    deleteStudent,
  } = useStudents();

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Student | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentFilteredLabel = useMemo(
    () => (search.trim() ? 'Download filtered' : 'Download all'),
    [search],
  );

  const handleAddClick = () => {
    setSelected(null);
    setModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    setSelected(student);
    setModalOpen(true);
  };

  const handleDelete = (student: Student) => {
    setSelected(student);
    setConfirmOpen(true);
  };

  const handleSubmitModal = async (values: StudentFormValues) => {
    if (selected) {
      await updateStudent(selected.id, values);
    } else {
      await createStudent(values);
    }
    resetPage();
  };

  const handleConfirmDelete = async () => {
    if (selected) {
      await deleteStudent(selected.id);
      resetPage();
    }
    setConfirmOpen(false);
    setSelected(null);
  };

  const handleDownloadExcel = () => {
    const listToDownload = search.trim() ? filtered : paged;
    exportStudentsToExcel(listToDownload);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-slate-50">
              Student Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Manage student records, export to Excel and keep your data
              organized.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar
              value={search}
              onChange={(value) => {
                setSearch(value);
                resetPage();
              }}
            />
            <button
              type="button"
              className="btn-secondary px-4 py-2 text-xs"
              onClick={handleDownloadExcel}
              disabled={loading}
            >
              ⬇ Excel
              <span className="ml-1 text-slate-400">
                ({currentFilteredLabel})
              </span>
            </button>
            <button
              type="button"
              className="btn-primary px-4 py-2 text-xs"
              onClick={handleAddClick}
            >
              + Add Student
            </button>
          </div>
        </div>

        <StudentTable
          students={paged}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <StudentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmitModal}
          initial={selected}
        />

        <ConfirmDialog
          open={confirmOpen}
          title="Delete student"
          message={
            selected
              ? `Are you sure you want to delete ${selected.name}?`
              : 'Are you sure you want to delete this student?'
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </Layout>
  );
};

