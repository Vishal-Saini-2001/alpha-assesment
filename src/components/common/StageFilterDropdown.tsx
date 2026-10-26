import React, { useState, useRef, useEffect } from 'react';
import { ContactStage, STAGES_ORDER, STAGE_CONFIG } from '../../types/contact';
import { ChevronDown, Check, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageFilterDropdownProps {
  value: ContactStage | 'All';
  onChange: (stage: ContactStage | 'All') => void;
  className?: string;
}

export const StageFilterDropdown: React.FC<StageFilterDropdownProps> = ({
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleSelect = (stage: ContactStage | 'All') => {
    onChange(stage);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} onKeyDown={handleKeyDown}>
      <div className="inline-flex items-center rounded-lg border border-slate-200/90 bg-white shadow-subtle hover:border-slate-300 transition-colors">
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(prev => !prev)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-l-lg"
          title="Filter contacts by pipeline stage"
        >
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">Stage:</span>
          {value === 'All' ? (
            <span className="font-semibold text-slate-800">All Stages</span>
          ) : (
            <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
              <span
                className={`w-1.5 h-1.5 rounded-full ${STAGE_CONFIG[value]?.dot || 'bg-slate-400'}`}
              />
              {STAGE_CONFIG[value]?.label}
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ml-0.5 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </button>

        {/* Quick Reset button if filter is active */}
        {value !== 'All' && (
          <button
            type="button"
            onClick={() => handleSelect('All')}
            className="p-1.5 border-l border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors rounded-r-lg"
            title="Reset stage filter"
            aria-label="Clear stage filter"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-label="Filter stages list"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="absolute z-50 left-0 mt-1.5 w-52 bg-white border border-slate-200/90 rounded-xl shadow-popover p-1.5 origin-top"
          >
            <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Filter by Stage
            </div>

            <div className="space-y-0.5 mt-0.5">
              {/* All Stages Option */}
              <button
                type="button"
                role="option"
                aria-selected={value === 'All'}
                onClick={() => handleSelect('All')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                  value === 'All'
                    ? 'bg-indigo-50/80 text-indigo-700 font-semibold'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full border border-slate-400 bg-white" />
                  <span>All Stages</span>
                </div>
                {value === 'All' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
              </button>

              <div className="my-1 border-t border-slate-100" />

              {/* Individual Stages */}
              {STAGES_ORDER.map(stage => {
                const cfg = STAGE_CONFIG[stage];
                const isSelected = value === stage;

                return (
                  <button
                    key={stage}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(stage)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/80 text-indigo-700 font-semibold'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                      <span>{cfg.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
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
