import React from 'react';
import { ChevronRight, Clock } from 'lucide-react';
import { Avatar } from '../common/Avatar';

interface WorkspaceHeaderProps {
  totalCount: number;
  filteredCount: number;
  isFiltered: boolean;
}

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  totalCount,
  filteredCount,
  isFiltered,
}) => {
  return (
    <header className="px-6 pt-5 pb-4 bg-white border-b border-slate-200/80">
      {/* Breadcrumb & Meta */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
          <span className="text-slate-500 hover:text-slate-700 transition-colors">Workspace</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-medium text-slate-800" aria-current="page">
            Contacts
          </span>
        </nav>

        {/* Team Avatar Group & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1.5" title="Team members on this pipeline">
            <Avatar name="Alex Morgan" size="xs" className="ring-2 ring-white" />
            <Avatar name="Priya Shah" size="xs" className="ring-2 ring-white" />
            <Avatar name="Jordan Lee" size="xs" className="ring-2 ring-white" />
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Updated just now</span>
          </div>
        </div>
      </div>

      {/* Main Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Contacts
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/80">
              {isFiltered ? `${filteredCount} of ${totalCount} contacts` : `${totalCount} contacts`}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage relationships and keep your pipeline moving.
          </p>
        </div>
      </div>
    </header>
  );
};
