import React from 'react';
import {
  Users,
  Building2,
  Settings,
  LayoutDashboard,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar } from '../common/Avatar';
import { WorkspaceDropdown } from './WorkspaceDropdown';

interface AppSidebarProps {
  onResetData: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  onResetData,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, active: false },
    { id: 'contacts', label: 'Contacts', icon: Users, active: true },
    { id: 'companies', label: 'Companies', icon: Building2, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <aside
      className={`shrink-0 bg-white border-r border-slate-200/80 flex flex-col justify-between h-screen select-none sticky top-0 overflow-hidden transition-all duration-200 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}
      aria-label="Application sidebar"
    >
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Brand Header */}
        {isCollapsed ? (
          <div className="py-2.5 px-2 flex flex-col items-center gap-2 border-b border-slate-100">
            {/* Expand button at top of collapsed sidebar */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleCollapse}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Logo shown below the expand button */}
            <div
              className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20 shrink-0"
              title="Atlas"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="h-14 px-3.5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/20 shrink-0">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-slate-900 tracking-tight text-base truncate">
                  Atlas
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  v1.0
                </span>
              </div>
            </div>

            {/* Collapse toggle button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onToggleCollapse}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
          </div>
        )}

        {/* Workspace Selector Dropdown */}
        <div className={`pt-3 pb-2 ${isCollapsed ? 'px-2' : 'px-3'}`}>
          <WorkspaceDropdown isCollapsed={isCollapsed} />
        </div>

        {/* Navigation */}
        <nav
          className={`py-2 space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}
          aria-label="Main Navigation"
        >
          {!isCollapsed && (
            <div className="px-2 py-1 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Workspace
            </div>
          )}

          {navItems.map(item => {
            const Icon = item.icon;
            if (item.active) {
              return (
                <div
                  key={item.id}
                  className={`flex items-center rounded-md text-xs font-semibold bg-indigo-50/80 text-indigo-700 border border-indigo-100/60 shadow-subtle ${
                    isCollapsed ? 'justify-center p-2.5' : 'gap-2.5 px-2.5 py-1.5'
                  }`}
                  aria-current="page"
                  title={item.label}
                >
                  <Icon className="w-4 h-4 text-indigo-600 stroke-[2] shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="truncate whitespace-nowrap">{item.label}</span>
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                    </>
                  )}
                </div>
              );
            }
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ x: isCollapsed ? 0 : 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className={`w-full flex items-center rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left ${
                  isCollapsed ? 'justify-center p-2.5' : 'gap-2.5 px-2.5 py-1.5'
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4 text-slate-400 stroke-[1.75] shrink-0" />
                {!isCollapsed && (
                  <span className="truncate whitespace-nowrap">{item.label}</span>
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className={`border-t border-slate-100 space-y-2.5 ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {/* Reset Demo Data quick helper */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onResetData}
          className={`w-full flex items-center justify-center rounded-md text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 transition-colors border border-dashed border-slate-200 ${
            isCollapsed ? 'p-2' : 'gap-1.5 px-2.5 py-1.5'
          }`}
          title="Restore initial 10 contacts with empty Qualified column"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {!isCollapsed && (
            <span className="truncate whitespace-nowrap">Reset Demo Data</span>
          )}
        </motion.button>

        {/* Current User */}
        <div
          className={`flex items-center rounded-lg bg-slate-50 border border-slate-200/60 ${
            isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-2 py-1.5'
          }`}
          title="Alex Morgan (alex@acmestudio.example)"
        >
          <Avatar name="Alex Morgan" size="md" />
          {!isCollapsed && (
            <>
              <div className="truncate flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-900 truncate">Alex Morgan</p>
                <p className="text-[10px] text-slate-400 truncate">alex@acmestudio.example</p>
              </div>
              <span title="Owner" className="text-indigo-600 shrink-0">
                <Sparkles className="w-3 h-3 text-indigo-500" />
              </span>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
