import React from 'react';
import { Contact, ContactStage, STAGE_CONFIG } from '../../types/contact';
import { ContactCard } from './ContactCard';
import { EmptyState } from '../common/EmptyState';
import { FolderKanban } from 'lucide-react';

interface BoardColumnProps {
  stage: ContactStage;
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
  stage,
  contacts,
  selectedContactId,
  onSelectContact,
}) => {
  const config = STAGE_CONFIG[stage];

  return (
    <div
      className="flex-1 min-w-[270px] max-w-[340px] flex flex-col bg-slate-50/70 border border-slate-200/80 rounded-xl overflow-hidden shrink-0"
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
          className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/60"
          title={`${contacts.length} contacts in ${stage}`}
        >
          {contacts.length}
        </span>
      </div>

      {/* Column Content / Cards List */}
      <div className="p-2.5 flex-1 flex flex-col gap-2.5 overflow-y-auto min-h-[420px] max-h-[calc(100vh-230px)]">
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
