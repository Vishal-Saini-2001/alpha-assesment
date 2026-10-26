import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const COLOR_PAIRS = [
  { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
  { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100' },
  { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100' },
  { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
  { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-100' },
];

function getInitials(name: string): string {
  if (!name.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getHashColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLOR_PAIRS.length;
  return COLOR_PAIRS[index];
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className = '' }) => {
  const initials = getInitials(name);
  const color = getHashColor(name);

  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px]',
    sm: 'w-6 h-6 text-xs',
    md: 'w-7 h-7 text-xs font-medium',
    lg: 'w-9 h-9 text-sm font-semibold',
    xl: 'w-11 h-11 text-base font-semibold',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full shrink-0 border select-none ${sizeClasses} ${color.bg} ${color.text} ${color.border} ${className}`}
      aria-hidden="true"
      title={name}
    >
      {initials}
    </div>
  );
};
