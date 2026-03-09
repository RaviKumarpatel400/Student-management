import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initial ? 'Edit Student' : 'Add Student'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          >
            ✕
          </button>
        </div>
        <form
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
            onClose();
          })}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Name
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-slate-950/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-slate-950/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300">
              Age
            </label>
            <input
              type="number"
              min={1}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 shadow-inner shadow-slate-950/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              {...register('age')}
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-400">
                {errors.age.message}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary px-4 py-2"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? initial
                  ? 'Saving...'
                  : 'Creating...'
                : initial
                  ? 'Save changes'
                  : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

