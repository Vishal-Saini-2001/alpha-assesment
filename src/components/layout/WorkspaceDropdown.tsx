import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Check, Plus, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Workspace {
  id: string;
  name: string;
  type: string;
  initial: string;
  color: string;
}

const WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'Acme Studio', type: 'Primary workspace', initial: 'A', color: 'bg-slate-800' },
  { id: 'ws-2', name: 'Northstar Venture', type: '5 members', initial: 'N', color: 'bg-indigo-600' },
  { id: 'ws-3', name: 'Orbit Labs', type: '12 members', initial: 'O', color: 'bg-emerald-600' },
];

interface WorkspaceDropdownProps {
  isCollapsed: boolean;
}

export const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({ isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace>(WORKSPACES[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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

  const handleSelect = (ws: Workspace) => {
    setSelectedWorkspace(ws);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger Button */}
      {isCollapsed ? (
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex items-center justify-center p-2 rounded-lg border border-slate-200/60 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title={`${selectedWorkspace.name} (Switch workspace)`}
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <div
            className={`w-6 h-6 rounded ${selectedWorkspace.color} text-white flex items-center justify-center text-xs font-semibold shrink-0 shadow-subtle`}
          >
            {selectedWorkspace.initial}
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg border border-slate-200/60 hover:bg-slate-50 transition-colors text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          title="Switch Workspace"
          aria-haspopup="menu"
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div
              className={`w-5 h-5 rounded ${selectedWorkspace.color} text-white flex items-center justify-center text-[11px] font-semibold shrink-0 shadow-subtle`}
            >
              {selectedWorkspace.initial}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 truncate">
                {selectedWorkspace.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">Workspace</p>
            </div>
          </div>
          <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
        </button>
      )}

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            aria-label="Workspaces list"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className={`absolute z-50 mt-1.5 w-60 bg-white border border-slate-200/90 rounded-xl shadow-popover p-1.5 origin-top ${
              isCollapsed ? 'left-full ml-2 top-0' : 'left-0 right-0'
            }`}
          >
            <div className="px-2.5 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Workspaces
            </div>

            <div className="space-y-0.5 mt-0.5">
              {WORKSPACES.map(ws => {
                const isSelected = ws.id === selectedWorkspace.id;
                return (
                  <button
                    key={ws.id}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelect(ws)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                      isSelected
                        ? 'bg-indigo-50/70 text-indigo-950 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded ${ws.color} text-white flex items-center justify-center text-xs font-semibold shrink-0`}
                      >
                        {ws.initial}
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-slate-800 truncate">{ws.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{ws.type}</p>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="my-1 border-t border-slate-100" />

            {/* Quick Actions */}
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
              >
                <Plus className="w-3.5 h-3.5 text-slate-400" />
                <span>Create workspace</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Workspace settings</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
