import React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-black text-lg font-extrabold text-white shadow-md shadow-slate-200">
              SM
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                Student Management System
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-200 font-medium ${isActive ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/5' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-200 font-medium ${isActive ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/5' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 min-h-[calc(100vh-200px)]">{children}</main>
      <footer className="bg-[#0b1120] py-12 text-sm text-slate-400 border-t border-slate-900 mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/20">
              SM
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Student Management System</span>
          </div>
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} Student Management System. All rights reserved.</span>
          </div>
          <div className="hidden text-slate-500 sm:inline-flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Service</span>
            <span>Built with React & Tailwind</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

