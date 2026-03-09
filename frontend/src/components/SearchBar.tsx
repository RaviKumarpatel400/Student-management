import React from 'react';
import { Search } from 'lucide-react';

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
        className="w-full rounded-xl border border-slate-300 bg-white px-10 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 h-[42px]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Search className="w-4 h-4" />
      </div>
    </div>
  );
};

