import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full rounded-full border border-slate-700 bg-slate-900/80 px-9 py-2 text-sm text-slate-100 shadow-inner shadow-slate-950/40 placeholder:text-slate-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        🔍
      </span>
    </div>
  );
};

