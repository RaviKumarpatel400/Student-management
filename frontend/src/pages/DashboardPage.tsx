import React, { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { StudentTable } from '../components/StudentTable';
import { StudentModal, StudentFormValues } from '../components/StudentModal';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';
import { useStudents } from '../hooks/useStudents';
import { exportStudentsToExcel } from '../utils/excel';
import { Download, Plus } from 'lucide-react';
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
      <div className="flex flex-col gap-8 mt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Student Directory
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-sm">
              Manage student records, perform quick searches, and keep your entire data organized.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex-1 sm:w-72">
               <SearchBar
                 value={search}
                 onChange={(value) => {
                   setSearch(value);
                   resetPage();
                 }}
               />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="btn-secondary px-5 py-2.5 text-sm h-[42px]"
                onClick={handleDownloadExcel}
                disabled={loading}
              >
                <Download className="w-4 h-4 text-slate-500" /> 
                <span>Excel</span>
                <span className="hidden lg:inline ml-1 text-slate-400 font-normal">
                  ({currentFilteredLabel})
                </span>
              </button>
              <button
                type="button"
                className="btn-primary px-5 py-2.5 text-sm h-[42px] bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
                onClick={handleAddClick}
              >
                <Plus className="w-5 h-5" /> Add Student
              </button>
            </div>
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

