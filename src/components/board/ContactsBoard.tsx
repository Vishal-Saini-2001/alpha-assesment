import React from 'react';
import { Contact, ContactStage, STAGES_ORDER } from '../../types/contact';
import { BoardColumn } from './BoardColumn';
import { EmptyState } from '../common/EmptyState';
import { Search } from 'lucide-react';

interface ContactsBoardProps {
  contactsByStage: Record<ContactStage, Contact[]>;
  totalFilteredContacts: number;
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
  onClearSearch?: () => void;
  isSearching: boolean;
}

export const ContactsBoard: React.FC<ContactsBoardProps> = ({
  contactsByStage,
  totalFilteredContacts,
  selectedContactId,
  onSelectContact,
  onClearSearch,
  isSearching,
}) => {
  if (totalFilteredContacts === 0 && isSearching) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Search}
          title="No contacts found"
          description="Try another name, company, or email to find what you're looking for."
          action={
            onClearSearch
              ? { label: 'Clear search filters', onClick: onClearSearch }
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-x-auto p-6">
      <div className="flex items-start gap-4 min-w-[1140px] pb-4">
        {STAGES_ORDER.map(stage => (
          <BoardColumn
            key={stage}
            stage={stage}
            contacts={contactsByStage[stage]}
            selectedContactId={selectedContactId}
            onSelectContact={onSelectContact}
          />
        ))}
      </div>
    </div>
  );
};
