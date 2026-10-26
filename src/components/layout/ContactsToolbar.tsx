import React from 'react';
import {
  Table as TableIcon,
  Kanban,
  Search,
  X,
} from 'lucide-react';
import { ViewMode, ContactStage } from '../../types/contact';
import { StageFilterDropdown } from '../common/StageFilterDropdown';

interface ContactsToolbarProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stageFilter: ContactStage | 'All';
  onStageFilterChange: (stage: ContactStage | 'All') => void;
  totalCount: number;
}

export const ContactsToolbar: React.FC<ContactsToolbarProps> = ({
  activeView,
  onViewChange,
  searchQuery,
  onSearchChange,
  stageFilter,
  onStageFilterChange,
}) => {
  return (
    <div className="px-6 py-2.5 bg-white border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
      {/* Left: View Switcher & Custom Stage Filter Popover */}
      <div className="flex items-center gap-3">
        {/* View Switcher */}
        <div
          role="group"
          aria-label="View switch"
          className="inline-flex items-center p-0.5 rounded-lg bg-slate-100/90 border border-slate-200/70"
        >
          <button
            type="button"
            onClick={() => onViewChange('table')}
            aria-pressed={activeView === 'table'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeView === 'table'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange('board')}
            aria-pressed={activeView === 'board'}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              activeView === 'board'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Board</span>
          </button>
        </div>

        <div className="h-4 w-px bg-slate-200" />

        {/* Custom Stage Filter Dropdown */}
        <StageFilterDropdown
          value={stageFilter}
          onChange={onStageFilterChange}
        />
      </div>

      {/* Right: Search Input */}
      <div className="flex items-center gap-2">
        <div className="relative w-56 sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search contacts…"
            aria-label="Search contacts"
            className="w-full text-xs pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
