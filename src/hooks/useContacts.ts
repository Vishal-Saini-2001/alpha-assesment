import { useState, useMemo, useCallback } from 'react';
import { Contact, ContactStage, ViewMode, STAGES_ORDER } from '../types/contact';
import { INITIAL_CONTACTS } from '../data/contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [activeView, setActiveView] = useState<ViewMode>('table');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stageFilter, setStageFilter] = useState<ContactStage | 'All'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger feedback toast with auto-dismiss
  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 2800);
  }, []);

  // Currently selected contact derived from single source of truth
  const selectedContact = useMemo(() => {
    if (!selectedContactId) return null;
    return contacts.find(c => c.id === selectedContactId) || null;
  }, [contacts, selectedContactId]);

  // Case-insensitive filtering across name, email, company, role
  const filteredContacts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return contacts.filter(contact => {
      // Check stage filter
      if (stageFilter !== 'All' && contact.stage !== stageFilter) {
        return false;
      }

      // If no search query, match all
      if (!query) return true;

      const nameMatch = contact.name.toLowerCase().includes(query);
      const emailMatch = contact.email ? contact.email.toLowerCase().includes(query) : false;
      const companyMatch = contact.company ? contact.company.toLowerCase().includes(query) : false;
      const roleMatch = contact.role.toLowerCase().includes(query);
      const labelMatch = contact.labels.some(l => l.toLowerCase().includes(query));

      return nameMatch || emailMatch || companyMatch || roleMatch || labelMatch;
    });
  }, [contacts, searchQuery, stageFilter]);

  // Group contacts by stage for Kanban board view
  const contactsByStage = useMemo(() => {
    const groups: Record<ContactStage, Contact[]> = {
      Lead: [],
      Prospect: [],
      Qualified: [],
      Customer: [],
    };

    filteredContacts.forEach(contact => {
      if (groups[contact.stage]) {
        groups[contact.stage].push(contact);
      }
    });

    return groups;
  }, [filteredContacts]);

  // Derived counts for each stage based on ALL contacts (reflecting total pipeline status)
  const stageCounts = useMemo(() => {
    const counts: Record<ContactStage, number> = {
      Lead: 0,
      Prospect: 0,
      Qualified: 0,
      Customer: 0,
    };

    contacts.forEach(contact => {
      if (counts[contact.stage] !== undefined) {
        counts[contact.stage] += 1;
      }
    });

    return counts;
  }, [contacts]);

  // Filtered stage counts for column headers when filtering is active
  const filteredStageCounts = useMemo(() => {
    const counts: Record<ContactStage, number> = {
      Lead: 0,
      Prospect: 0,
      Qualified: 0,
      Customer: 0,
    };

    filteredContacts.forEach(contact => {
      if (counts[contact.stage] !== undefined) {
        counts[contact.stage] += 1;
      }
    });

    return counts;
  }, [filteredContacts]);

  // Update contact immutably by ID
  const updateContact = useCallback(
    (id: string, updates: Partial<Pick<Contact, 'stage' | 'notes' | 'role' | 'owner'>>) => {
      setContacts(prev =>
        prev.map(c => {
          if (c.id === id) {
            return {
              ...c,
              ...updates,
            };
          }
          return c;
        })
      );
      showToast('Contact updated successfully');
    },
    [showToast]
  );

  // Select contact to open inspector
  const openContact = useCallback((id: string) => {
    setSelectedContactId(id);
  }, []);

  // Close inspector
  const closeContact = useCallback(() => {
    setSelectedContactId(null);
  }, []);

  // Reset to initial data for testing/demo purposes
  const resetToInitialData = useCallback(() => {
    setContacts(INITIAL_CONTACTS);
    setSearchQuery('');
    setStageFilter('All');
    setSelectedContactId(null);
    showToast('Reset to initial 10 contacts');
  }, [showToast]);

  return {
    contacts,
    filteredContacts,
    contactsByStage,
    stageCounts,
    filteredStageCounts,
    activeView,
    setActiveView,
    selectedContact,
    selectedContactId,
    openContact,
    closeContact,
    updateContact,
    searchQuery,
    setSearchQuery,
    stageFilter,
    setStageFilter,
    toastMessage,
    resetToInitialData,
    stagesOrder: STAGES_ORDER,
  };
}
