import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { X } from 'lucide-react';
import type { Student } from '../types';

export interface StudentFormValues {
  name: string;
  email: string;
  age: number;
}

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .integer('Age must be an integer')
    .min(1, 'Age must be positive'),
});

interface StudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => Promise<void> | void;
  initial?: Student | null;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  open,
  onClose,
  onSubmit,
  initial,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      age: 18,
    },
  });

  useEffect(() => {
    if (open) {
      if (initial) {
        reset({
          name: initial.name,
          email: initial.email,
          age: initial.age,
        });
      } else {
        reset({
          name: '',
          email: '',
          age: 18,
        });
      }
    }
  }, [open, initial, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5 bg-white">
          <h2 className="text-xl font-bold text-slate-900">
            {initial ? 'Edit Student' : 'Add Student'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 bg-slate-50/30">
        <form
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
            onClose();
          })}
          className="flex flex-col gap-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-colors shadow-sm"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-colors shadow-sm"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Age
            </label>
            <input
              type="number"
              min={1}
              placeholder="e.g. 21"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-colors shadow-sm"
              {...register('age')}
            />
            {errors.age && (
              <p className="mt-1.5 text-xs font-medium text-red-500 flex items-center gap-1">
                {errors.age.message}
              </p>
            )}
          </div>
          <div className="mt-4 pt-6 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-5 py-2.5 text-sm font-medium border-slate-200 hover:bg-white"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-70 shadow-blue-600/20"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? initial
                  ? 'Saving changes...'
                  : 'Adding student...'
                : initial
                  ? 'Save Changes'
                  : 'Add Student'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

