import React from 'react';

interface LabelChipProps {
  label: string;
  size?: 'xs' | 'sm';
  className?: string;
}

export const LabelChip: React.FC<LabelChipProps> = ({ label, size = 'sm', className = '' }) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[11px]',
    sm: 'px-2 py-0.5 text-xs',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md font-medium text-slate-600 bg-slate-100/90 border border-slate-200/80 whitespace-nowrap ${sizeClasses} ${className}`}
    >
      {label}
    </span>
  );
};
