import React, { useState, useMemo } from 'react';
import { Contact } from '../../types/contact';
import { ContactTableRow } from './ContactTableRow';
import { EmptyState } from '../common/EmptyState';
import { ArrowUpDown, Search } from 'lucide-react';

interface ContactsTableProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (id: string) => void;
  onClearSearch?: () => void;
  isSearching: boolean;
}

type SortField = 'name' | 'company' | 'role' | 'owner' | 'stage';
type SortOrder = 'asc' | 'desc';

export const ContactsTable: React.FC<ContactsTableProps> = ({
  contacts,
  selectedContactId,
  onSelectContact,
  onClearSearch,
  isSearching,
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      let valA = '';
      let valB = '';

      switch (sortField) {
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'company':
          valA = (a.company || '').toLowerCase();
          valB = (b.company || '').toLowerCase();
          break;
        case 'role':
          valA = a.role.toLowerCase();
          valB = b.role.toLowerCase();
          break;
        case 'owner':
          valA = a.owner.toLowerCase();
          valB = b.owner.toLowerCase();
          break;
        case 'stage':
          valA = a.stage.toLowerCase();
          valB = b.stage.toLowerCase();
          break;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [contacts, sortField, sortOrder]);

  if (contacts.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Search}
          title={isSearching ? 'No contacts found' : 'No contacts available'}
          description={
            isSearching
              ? 'Try another name, company, or email.'
              : 'Add contacts to populate your workspace.'
          }
          action={
            isSearching && onClearSearch
              ? { label: 'Clear search filters', onClick: onClearSearch }
              : undefined
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-none">
      <table className="w-full text-left border-collapse" aria-label="Contacts spreadsheet table">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none sticky top-0 z-10">
            <th scope="col" className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => handleSort('name')}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
                title="Sort by Name"
              >
                <span>Name</span>
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
              </button>
            </th>
            <th scope="col" className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => handleSort('company')}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
                title="Sort by Company"
              >
                <span>Company</span>
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
              </button>
            </th>
            <th scope="col" className="py-2.5 px-4">Email</th>
            <th scope="col" className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => handleSort('role')}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
                title="Sort by Role"
              >
                <span>Role</span>
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
              </button>
            </th>
            <th scope="col" className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => handleSort('owner')}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
                title="Sort by Owner"
              >
                <span>Owner</span>
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
              </button>
            </th>
            <th scope="col" className="py-2.5 px-4">Labels</th>
            <th scope="col" className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => handleSort('stage')}
                className="inline-flex items-center gap-1 hover:text-slate-800 transition-colors"
                title="Sort by Stage"
              >
                <span>Stage</span>
                <ArrowUpDown className="w-3 h-3 text-slate-400" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sortedContacts.map(contact => (
            <ContactTableRow
              key={contact.id}
              contact={contact}
              isSelected={contact.id === selectedContactId}
              onSelect={onSelectContact}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
