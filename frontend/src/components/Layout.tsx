import React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-xl font-bold text-white shadow-lg shadow-primary-900/50">
              SH
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">
                StudentHub
              </div>
              <div className="text-xs text-slate-400">
                Student Management System
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition hover:text-white ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `transition hover:text-white ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-4 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <span>© {new Date().getFullYear()} StudentHub.</span>
          <span className="hidden sm:inline">
            Built with React, NestJS & MongoDB Atlas.
          </span>
        </div>
      </footer>
    </div>
  );
};

