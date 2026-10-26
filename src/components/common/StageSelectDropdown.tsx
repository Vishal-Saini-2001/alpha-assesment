import React, { useState, useRef, useEffect } from 'react';
import { ContactStage, STAGES_ORDER, STAGE_CONFIG } from '../../types/contact';
import { StageBadge } from './StageBadge';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageSelectDropdownProps {
  id?: string;
  value: ContactStage;
  onChange: (stage: ContactStage) => void;
  className?: string;
}

export const StageSelectDropdown: React.FC<StageSelectDropdownProps> = ({
  id,
  value,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation: Escape closes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown' && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  const handleSelect = (stage: ContactStage) => {
    onChange(stage);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        id={id}
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-slate-50/80 border border-slate-300 rounded-lg text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all text-left group"
      >
        <div className="flex items-center gap-2">
          <StageBadge stage={value} size="md" />
          <span className="text-xs text-slate-500 hidden sm:inline truncate max-w-[200px]">
            {STAGE_CONFIG[value]?.description}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-indigo-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Select pipeline stage"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute z-50 left-0 right-0 mt-1.5 bg-white border border-slate-200/90 rounded-xl shadow-popover p-1.5 origin-top divide-y divide-slate-100"
          >
            <div className="py-1">
              {STAGES_ORDER.map(stage => {
                const cfg = STAGE_CONFIG[stage];
                const isSelected = stage === value;

                return (
                  <button
                    key={stage}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(stage)}
                    className={`w-full flex items-start justify-between p-2 rounded-lg text-left transition-colors group/item ${
                      isSelected
                        ? 'bg-indigo-50/70 text-indigo-950 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 pr-2">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cfg.dot}`}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-800">
                            {cfg.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          {cfg.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
