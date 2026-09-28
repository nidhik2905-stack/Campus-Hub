// src/pages/student/Search.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Clock, TrendingUp, ArrowRight, Tag, BookOpen } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import { searchMockDatabase } from '../../utils/mockData';

const popularKeywords = [
  'CSE 3rd year timetable',
  'Mid-Semester Exam Schedule',
  'AI Workshop',
  'Library Timings',
  'Campus Placement Drive',
  'DBMS Syllabus',
  'Admit Card',
];

const recentSearchesInit = [
  'CS-601 exam date',
  'Lab 3 schedule',
  'Academic Calendar 2024',
];

export default function SmartSearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryParam);
  const [recentSearches, setRecentSearches] = useState(recentSearchesInit);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches([query.trim(), ...recentSearches.slice(0, 4)]);
    }
  };

  const handleChipClick = (keyword) => {
    setQuery(keyword);
    if (!recentSearches.includes(keyword)) {
      setRecentSearches([keyword, ...recentSearches.slice(0, 4)]);
    }
  };

  const results = searchMockDatabase.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.snippet.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
            <SearchIcon className="h-5 w-5" />
          </span>
          Smart Search
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Instant multi-module search across notices, examinations, timetables, events, and college repositories
        </p>
      </div>

      {/* Hero Large Search Box */}
      <Card padding="p-6" className="bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/50 border-blue-100">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <SearchIcon className="h-5 w-5 text-blue-600" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notices, exams, timetable, events, documents..."
            className="w-full rounded-2xl border border-slate-200/90 bg-white py-4 pl-12 pr-28 text-sm sm:text-base text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <Button type="submit" size="sm">
              Search
            </Button>
          </div>
        </form>

        {/* Popular & Recent Chips */}
        <div className="mt-5 space-y-3">
          {/* Recent Searches */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-semibold text-slate-500">
              <Clock className="h-3.5 w-3.5" /> Recent:
            </span>
            {recentSearches.map((rec) => (
              <button
                key={rec}
                onClick={() => handleChipClick(rec)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
              >
                {rec}
              </button>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 font-semibold text-blue-600">
              <TrendingUp className="h-3.5 w-3.5" /> Popular:
            </span>
            {popularKeywords.map((pop) => (
              <button
                key={pop}
                onClick={() => handleChipClick(pop)}
                className="rounded-lg bg-blue-50 border border-blue-100 px-2.5 py-1 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                {pop}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {query.trim() ? `Search Results for "${query}"` : 'All Authoritative Campus Resources'}
          </h2>
          <span className="text-xs text-slate-500">
            {results.length} relevant results
          </span>
        </div>

        {results.length === 0 ? (
          <Card>
            <EmptyState
              title="No matching records found"
              description={`We couldn't find any campus records matching "${query}". Try searching for exam codes, notice subjects, or department names.`}
              actionLabel="Clear Search"
              onAction={() => setQuery('')}
            />
          </Card>
        ) : (
          <div className="space-y-3">
            {results.map((item) => (
              <Card
                key={item.id}
                hoverEffect
                padding="p-5"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
                onClick={() => navigate(item.url)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="cyan">{item.category}</Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.department} • {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {item.snippet}
                  </p>
                </div>

                <div className="shrink-0 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform self-end sm:self-center">
                  <span>Open Module</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
