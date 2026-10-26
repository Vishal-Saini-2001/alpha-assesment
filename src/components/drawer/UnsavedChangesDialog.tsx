import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UnsavedChangesDialogProps {
  isOpen: boolean;
  onKeepEditing: () => void;
  onDiscard: () => void;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({
  isOpen,
  onKeepEditing,
  onDiscard,
}) => {
  const keepEditingBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        keepEditingBtnRef.current?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.stopPropagation();
          onKeepEditing();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onKeepEditing]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="unsaved-dialog-title"
          aria-describedby="unsaved-dialog-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="w-full max-w-sm bg-white rounded-xl shadow-popover border border-slate-200/90 p-5"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                <AlertTriangle className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3
                  id="unsaved-dialog-title"
                  className="text-sm font-semibold text-slate-900 tracking-tight"
                >
                  Unsaved changes
                </h3>
                <p
                  id="unsaved-dialog-desc"
                  className="text-xs text-slate-500 mt-1 leading-relaxed"
                >
                  You have unsaved edits in this contact. Do you want to keep editing or discard your changes?
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                ref={keepEditingBtnRef}
                onClick={onKeepEditing}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 rounded-md border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                Keep editing
              </button>
              <button
                type="button"
                onClick={onDiscard}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Discard changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
