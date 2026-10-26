# Atlas Contacts — Premium Contact Management Workspace

Atlas Contacts is a Notion-inspired contact relationship and pipeline management workspace designed for modern B2B teams. It provides synchronized, high-density **Table** and **Board** views backed by a single source of truth in React state.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```bash
# Clone or navigate to the project directory
cd alpha-assesment

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the Vite development server
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build & Type Checking
```bash
# Run strict TypeScript type check and build the production bundle
npm run build

# Preview the built production output
npm run preview
```

---

## ✨ Features

- **Single Source of Truth**: All contacts live in a unified React state (`useContacts` custom hook). Updates immediately synchronize across Table and Board views without race conditions or duplicated records.
- **Synchronized Table View**: A dense, spreadsheet-like data grid with column sorting (Name, Company, Role, Owner, Stage), hover row highlighting, avatar initials, and formatted status pills.
- **Synchronized Board View**: A Kanban pipeline board categorized by the 4 pipeline stages (`Lead`, `Prospect`, `Qualified`, `Customer`), with stage count badges and balanced card density.
- **Interactive Drag-and-Drop**: Drag any contact card between pipeline columns to instantly transition its stage. Powered by HTML5 DnD with visual drop indicators and Framer Motion layout gliding animations.
- **Designed Empty Group State**: In compliance with evaluation requirements, the `Qualified` column initially contains 0 contacts to showcase an intentional empty-state UI (`No contacts yet`, `Contacts will appear here when moved to this stage.`).
- **Contact Details Inspector Drawer**: Right-side drawer allowing users to inspect full contact metadata and edit **Stage** and **Notes**.
- **Draft Editing & Change Protection**:
  - Edits remain in a local draft state until explicitly saved.
  - Form detects dirty state (`isDirty`) and displays a subtle indicator.
  - Clicking **Save** immutably updates the contact and propagates changes instantly.
  - Clicking **Cancel** discards pending edits and closes the drawer.
  - Closing via `X`, the backdrop overlay, or `Escape` while changes are pending triggers an accessible **Unsaved Changes confirmation dialog** (`Keep editing` or `Discard changes`).
- **Missing Data Handling**: Gracefully renders an em dash (`—`) for missing emails or companies in table rows and muted `"Not provided"` in the details inspector (e.g., Oliver Scott record), avoiding broken links or empty chips.
- **Real-Time Search & Stage Filtering**: Case-insensitive filtering across name, email, company, and role, persistent when switching between Table and Board views.
- **Keyboard Accessibility**: Focus management, visible focus rings, keyboard row/card opening (`Enter`/`Space`), and `Escape` key panel handling with focus restoration to trigger elements.
- **Demo Data Reset**: Includes a "Reset Demo Data" action in the sidebar to conveniently restore the initial 10 contacts for repeatable assessment testing.

---

## 🛠️ Technology Stack

- **Framework**: React 18 / 19 with strict TypeScript
- **Build Tool**: Vite 6+
- **Styling**: Tailwind CSS with custom design system tokens (slate/indigo/emerald/violet/blue palettes, subtle shadows, custom scrollbars)
- **Icons**: Lucide React
- **Animations**: Framer Motion (subtle spring drawers, dropdown popovers, view transitions, layout animations)
- **State Architecture**: React Hooks (`useState`, `useMemo`, `useCallback`)

---

## 🏛️ Architecture & Component Structure

```
src/
├── types/
│   └── contact.ts              # Strongly typed models, stage configs & colors
├── data/
│   └── contacts.ts             # 10 fictional contact seed records
├── hooks/
│   └── useContacts.ts          # Central source of truth, filters, grouping & mutations
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx      # Acme Studio workspace sidebar & navigation
│   │   ├── WorkspaceHeader.tsx # Breadcrumbs, headline, team avatars & counters
│   │   └── ContactsToolbar.tsx # Table/Board view switch, search & stage filter
│   ├── table/
│   │   ├── ContactsTable.tsx   # Semantic data table with header sorting
│   │   └── ContactTableRow.tsx # Interactive table row with keyboard support
│   ├── board/
│   │   ├── ContactsBoard.tsx   # Kanban container with horizontal scroll
│   │   ├── BoardColumn.tsx     # Column header, stage pill & empty state
│   │   └── ContactCard.tsx     # Compact card with role, company & owner
│   ├── drawer/
│   │   ├── ContactDetailsPanel.tsx  # Inspector drawer with draft state & inputs
│   │   └── UnsavedChangesDialog.tsx # Discard confirmation modal
│   └── common/
│       ├── Avatar.tsx          # Deterministic pastel color initials avatar
│       ├── StageBadge.tsx      # Consistent status badge with dot indicator
│       ├── LabelChip.tsx       # Restrained tags
│       ├── EmptyState.tsx      # Reusable empty state for search & empty columns
│       └── Toast.tsx           # Subtle action feedback notification
├── App.tsx                     # Main layout coordinator
├── main.tsx                    # Application entry point
└── index.css                   # Tailwind directives & global styling
```

---

## 🎨 Design Decisions

1. **Why Table and Board Share One Dataset**:
   In enterprise tools like Notion or Linear, views are simply projections of the same underlying database entity. Maintaining a single state array prevents data divergence, state desynchronization, and phantom duplicates. Derived selectors (`useMemo`) compute grouped stages and counts on the fly.
2. **Why Notes are Edited in a Details Panel**:
   Tables and Kanban boards are meant for rapid scanning. Inlining multiline notes into table cells bloats row heights and disrupts alignment. Moving notes into the inspector drawer keeps the table compact while providing comfortable space for reading and updating relationship notes.
3. **How Stage Changes Propagate**:
   When a user updates a contact's stage in the drawer and clicks "Save", the root contact array is updated immutably using its stable ID. The derived `contactsByStage` and `stageCounts` immediately recompute, moving the card to the new column, updating column counts, and updating the table status pill.
4. **How Unsaved Changes are Handled**:
   Draft inputs are isolated from the application state until "Save" is confirmed. If a user tries to close the panel with pending edits (via Escape, clicking the backdrop, or clicking X), an accessible `UnsavedChangesDialog` intercepts the action, offering "Keep editing" (which maintains focus on the draft) or "Discard changes" (which rolls back the draft to saved values).
5. **View Context Preservation**:
   Switching between Table and Board views preserves the search query, stage filter, and selected contact. Closing the panel preserves whatever view was active, returning keyboard focus to the table row or board card that opened it.

---

## ⚖️ Trade-offs & Deliberate Decisions

- **No Backend Persistence**: As instructed, all data is stored in React memory. Reloading the page re-initializes the seed data. A "Reset Demo Data" button is also provided for testing.
- **Client-Side Drag and Drop**: Implemented using HTML5 drag-and-drop integrated with Framer Motion layout animations for lightweight performance with zero external DnD package overhead.

---

## 🔮 Future Improvements

- Add browser `localStorage` or IndexedDB persistence.
- Implement accessible HTML5 drag-and-drop for board cards.
- Add multi-criteria filtering (combining owner, label multi-select, and stage).
- Add bulk actions (batch stage update, export to CSV).
- Add end-to-end interaction tests using Playwright.
