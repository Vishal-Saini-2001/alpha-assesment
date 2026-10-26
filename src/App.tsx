import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSidebar } from './components/layout/AppSidebar';
import { WorkspaceHeader } from './components/layout/WorkspaceHeader';
import { ContactsToolbar } from './components/layout/ContactsToolbar';
import { ContactsTable } from './components/table/ContactsTable';
import { ContactsBoard } from './components/board/ContactsBoard';
import { ContactDetailsPanel } from './components/drawer/ContactDetailsPanel';
import { Toast } from './components/common/Toast';
import { useContacts } from './hooks/useContacts';

export function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    contacts,
    filteredContacts,
    contactsByStage,
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
  } = useContacts();

  const isFiltered = searchQuery.trim().length > 0 || stageFilter !== 'All';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-slate-900 font-sans">
      {/* Collapsible Sidebar */}
      <AppSidebar
        onResetData={resetToInitialData}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white">
        {/* Workspace Top Header */}
        <WorkspaceHeader
          totalCount={contacts.length}
          filteredCount={filteredContacts.length}
          isFiltered={isFiltered}
        />

        {/* View Switcher & Search Toolbar */}
        <ContactsToolbar
          activeView={activeView}
          onViewChange={setActiveView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          stageFilter={stageFilter}
          onStageFilterChange={setStageFilter}
          totalCount={contacts.length}
        />

        {/* Main View Area with Framer Motion View Transitions */}
        <div className="flex-1 overflow-y-auto bg-slate-50/40 relative">
          <AnimatePresence mode="wait">
            {activeView === 'table' ? (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.14, ease: 'easeOut' }}
                className="p-0 sm:p-6"
              >
                <div className="bg-white rounded-lg border border-slate-200/80 shadow-subtle overflow-hidden">
                  <ContactsTable
                    contacts={filteredContacts}
                    selectedContactId={selectedContactId}
                    onSelectContact={openContact}
                    onClearSearch={() => {
                      setSearchQuery('');
                      setStageFilter('All');
                    }}
                    isSearching={isFiltered}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="board-view"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.14, ease: 'easeOut' }}
                className="h-full"
              >
                <ContactsBoard
                  contactsByStage={contactsByStage}
                  totalFilteredContacts={filteredContacts.length}
                  selectedContactId={selectedContactId}
                  onSelectContact={openContact}
                  onClearSearch={() => {
                    setSearchQuery('');
                    setStageFilter('All');
                  }}
                  isSearching={isFiltered}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Contact Details Inspector Drawer */}
      <ContactDetailsPanel
        contact={selectedContact}
        isOpen={Boolean(selectedContactId)}
        onClose={closeContact}
        onSave={updateContact}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
