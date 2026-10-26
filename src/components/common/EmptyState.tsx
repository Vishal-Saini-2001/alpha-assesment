import React from 'react';
import { LucideIcon, Users } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  compact?: boolean;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Users,
  title,
  description,
  action,
  compact = false,
  className = '',
}) => {
  if (compact) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center rounded-lg border border-dashed border-slate-200/90 bg-slate-50/50 ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
          <Icon className="w-4 h-4 stroke-[1.75]" />
        </div>
        <p className="text-xs font-medium text-slate-700">{title}</p>
        {description && <p className="text-[11px] text-slate-400 mt-0.5 max-w-[200px] leading-relaxed">{description}</p>}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="mt-3 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-center text-slate-400 mb-4 shadow-subtle">
        <Icon className="w-6 h-6 stroke-[1.75]" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 tracking-tight">{title}</h3>
      {description && (
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/60 rounded-md transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
