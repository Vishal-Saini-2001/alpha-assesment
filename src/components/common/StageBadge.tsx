import React from 'react';
import { ContactStage, STAGE_CONFIG } from '../../types/contact';

interface StageBadgeProps {
  stage: ContactStage;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

export const StageBadge: React.FC<StageBadgeProps> = ({
  stage,
  size = 'sm',
  showDot = true,
  className = '',
}) => {
  const config = STAGE_CONFIG[stage] || STAGE_CONFIG.Lead;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-medium',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`}
          aria-hidden="true"
        />
      )}
      <span>{config.label}</span>
    </span>
  );
};
