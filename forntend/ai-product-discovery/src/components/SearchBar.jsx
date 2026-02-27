import React from 'react';
import { Search, Sparkles } from 'lucide-react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-slate-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'best headphones for travel' or 'minimalist desk setup'..."
          className="w-full pl-12 pr-32 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl focus:border-indigo-500 outline-none transition-all shadow-lg"
        />
        <button
          onClick={onSearch}
          className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm"
        >
          <Sparkles size={16} />
          Ask AI
        </button>
      </div>
    </div>
  );
};

export default SearchBar;