import React, { useState, useEffect, useRef } from 'react';
import { Contact, ContactStage } from '../../types/contact';
import { Avatar } from '../common/Avatar';
import { LabelChip } from '../common/LabelChip';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';
import { StageSelectDropdown } from '../common/StageSelectDropdown';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Building2,
  Briefcase,
  UserCheck,
  Tag,
  FileText,
  Workflow,
  ExternalLink,
  Info,
} from 'lucide-react';

interface ContactDetailsPanelProps {
  contact: Contact | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: { stage: ContactStage; notes: string }) => void;
}

export const ContactDetailsPanel: React.FC<ContactDetailsPanelProps> = ({
  contact,
  isOpen,
  onClose,
  onSave,
}) => {
  const [draftStage, setDraftStage] = useState<ContactStage>('Lead');
  const [draftNotes, setDraftNotes] = useState<string>('');
  const [showDiscardDialog, setShowDiscardDialog] = useState<boolean>(false);

  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync draft state whenever a contact is opened or changed
  useEffect(() => {
    if (contact && isOpen) {
      setDraftStage(contact.stage);
      setDraftNotes(contact.notes);
      setShowDiscardDialog(false);

      // Save the trigger element to restore focus later
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      // Focus the first editable field (Stage select) smoothly
      setTimeout(() => {
        document.getElementById('edit-stage-select')?.focus();
      }, 100);
    }
  }, [contact?.id, isOpen]);

  // Determine if there are unsaved changes
  const isDirty =
    Boolean(contact) &&
    (draftStage !== contact?.stage || draftNotes.trim() !== (contact?.notes || '').trim());

  // Attempt to close safely
  const handleAttemptClose = () => {
    if (isDirty) {
      setShowDiscardDialog(true);
    } else {
      executeClose();
    }
  };

  const executeClose = () => {
    setShowDiscardDialog(false);
    onClose();
    // Return focus to the trigger element
    if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
    }
  };

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape' && !showDiscardDialog) {
        e.preventDefault();
        handleAttemptClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDirty, showDiscardDialog]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    onSave(contact.id, {
      stage: draftStage,
      notes: draftNotes,
    });

    executeClose();
  };

  const handleDiscardChanges = () => {
    if (contact) {
      setDraftStage(contact.stage);
      setDraftNotes(contact.notes);
    }
    executeClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && contact && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-slate-900/25 backdrop-blur-[1px] z-40"
              onClick={handleAttemptClose}
              aria-hidden="true"
            />

            {/* Slide-over Inspector Panel */}
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-panel-title"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md sm:max-w-lg bg-white shadow-drawer border-l border-slate-200/90 flex flex-col justify-between"
            >
        {/* Top Header */}
        <div>
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Contact details
              </span>
              {isDirty && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 animate-pulse">
                  Unsaved changes
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleAttemptClose}
              aria-label="Close contact details"
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Identity Summary */}
          <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-start gap-4">
            <Avatar name={contact.name} size="xl" className="shadow-sm ring-2 ring-white" />
            <div className="flex-1 min-w-0">
              <h2
                id="contact-panel-title"
                className="text-lg font-bold text-slate-900 tracking-tight truncate"
              >
                {contact.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                {contact.role && (
                  <span className="font-medium text-slate-700">{contact.role}</span>
                )}
                {contact.role && contact.company && (
                  <span className="text-slate-300">•</span>
                )}
                {contact.company && (
                  <span className="text-slate-600">{contact.company}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Fields Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Read-Only Info Group */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Profile & Ownership
            </h3>

            {/* Email */}
            <div className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Email
              </span>
              <div className="col-span-2">
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 truncate max-w-full"
                  >
                    <span>{contact.email}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Not provided</span>
                )}
              </div>
            </div>

            {/* Company */}
            <div className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Company
              </span>
              <div className="col-span-2 text-slate-800 font-medium">
                {contact.company || <span className="text-slate-400 italic">Not provided</span>}
              </div>
            </div>

            {/* Role */}
            <div className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Role
              </span>
              <div className="col-span-2 text-slate-800 font-medium">
                {contact.role || <span className="text-slate-400 italic">Not provided</span>}
              </div>
            </div>

            {/* Owner */}
            <div className="grid grid-cols-3 gap-2 items-center text-xs">
              <span className="text-slate-500 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                Owner
              </span>
              <div className="col-span-2 flex items-center gap-2">
                <Avatar name={contact.owner} size="xs" />
                <span className="text-slate-800 font-medium">{contact.owner}</span>
              </div>
            </div>

            {/* Labels */}
            <div className="grid grid-cols-3 gap-2 items-start text-xs pt-1">
              <span className="text-slate-500 flex items-center gap-1.5 pt-0.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                Labels
              </span>
              <div className="col-span-2 flex items-center gap-1.5 flex-wrap">
                {contact.labels && contact.labels.length > 0 ? (
                  contact.labels.map(label => (
                    <LabelChip key={label} label={label} size="sm" />
                  ))
                ) : (
                  <span className="text-slate-400 italic">No labels assigned</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Editable Fields Group */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Pipeline & Notes (Editable)
              </h3>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-400" />
                Auto-syncs across views
              </span>
            </div>

            {/* Stage Select Field */}
            <div>
              <label
                htmlFor="edit-stage-select"
                className="block text-xs font-medium text-slate-700 mb-1.5 flex items-center gap-1.5"
              >
                <Workflow className="w-3.5 h-3.5 text-indigo-500" />
                Pipeline Stage
              </label>
              <StageSelectDropdown
                id="edit-stage-select"
                value={draftStage}
                onChange={setDraftStage}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Changing stage moves this contact to the corresponding board column.
              </p>
            </div>

            {/* Notes Textarea Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="edit-notes-textarea"
                  className="text-xs font-medium text-slate-700 flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500" />
                  Relationship Notes
                </label>
                <span className="text-[11px] text-slate-400">
                  {draftNotes.length} characters
                </span>
              </div>
              <textarea
                id="edit-notes-textarea"
                rows={4}
                value={draftNotes}
                onChange={e => setDraftNotes(e.target.value)}
                placeholder="Add conversation summary, next actions, or requirements..."
                className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors resize-y leading-relaxed"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between">
          <div>
            {isDirty && (
              <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                • Changes pending
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleDiscardChanges}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-md transition-colors border border-slate-300/80 bg-white shadow-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-md shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
            >
              Save changes
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

      {/* Discard Confirmation Dialog */}
      <UnsavedChangesDialog
        isOpen={showDiscardDialog}
        onKeepEditing={() => setShowDiscardDialog(false)}
        onDiscard={handleDiscardChanges}
      />
    </>
  );
};
