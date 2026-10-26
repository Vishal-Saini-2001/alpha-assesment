import React, { useState } from 'react';
import { Contact, ContactStage, STAGE_CONFIG } from '../../types/contact';
import { ContactCard } from './ContactCard';
import { EmptyState } from '../common/EmptyState';
import { FolderKanban, ArrowDownToLine } from 'lucide-react';

interface BoardColumnProps {
  stage: ContactStage;
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
  onMoveStage: (contactId: string, newStage: ContactStage) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  stage,
  contacts,
  selectedContactId,
  onSelectContact,
  onMoveStage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const config = STAGE_CONFIG[stage];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const contactId = e.dataTransfer.getData('text/plain');
    if (contactId) {
      onMoveStage(contactId, stage);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-1 min-w-[270px] max-w-[340px] flex flex-col bg-slate-50/70 border rounded-xl overflow-hidden shrink-0 transition-all duration-150 ${
        isDragOver
          ? 'border-indigo-400 ring-2 ring-indigo-400/20 bg-indigo-50/30'
          : 'border-slate-200/80'
      }`}
      aria-label={`${stage} stage column, ${contacts.length} contacts`}
    >
      {/* Column Header */}
      <div className="p-3 bg-white border-b border-slate-200/70 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`}
            aria-hidden="true"
          />
          <h3 className="text-xs font-semibold text-slate-800 tracking-tight">
            {config.label}
          </h3>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
            isDragOver
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200/60'
          }`}
          title={`${contacts.length} contacts in ${stage}`}
        >
          {contacts.length}
        </span>
      </div>

      {/* Column Content / Cards List */}
      <div className="p-2.5 flex-1 flex flex-col gap-2.5 overflow-y-auto min-h-[420px] max-h-[calc(100vh-230px)] relative">
        {isDragOver && (
          <div className="absolute inset-2 border-2 border-dashed border-indigo-400 bg-indigo-50/60 rounded-lg flex items-center justify-center z-10 pointer-events-none animate-in fade-in duration-100">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white text-indigo-600 text-xs font-semibold shadow-sm border border-indigo-200">
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Drop to move to {config.label}</span>
            </div>
          </div>
        )}

        {contacts.length === 0 ? (
          <EmptyState
            compact
            icon={FolderKanban}
            title="No contacts yet"
            description="Contacts will appear here when moved to this stage."
            className="my-auto py-8"
          />
        ) : (
          contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onSelect={onSelectContact}
            />
          ))
        )}
      </div>
    </div>
  );
};
