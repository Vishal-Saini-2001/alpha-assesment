import React from 'react';
import { Contact } from '../../types/contact';
import { Avatar } from '../common/Avatar';
import { StageBadge } from '../common/StageBadge';
import { LabelChip } from '../common/LabelChip';
import { motion } from 'framer-motion';

interface ContactTableRowProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ContactTableRow: React.FC<ContactTableRowProps> = ({
  contact,
  isSelected,
  onSelect,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(contact.id);
    }
  };

  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      tabIndex={0}
      role="row"
      aria-selected={isSelected}
      onClick={() => onSelect(contact.id)}
      onKeyDown={handleKeyDown}
      className={`group cursor-pointer border-b border-slate-100 transition-colors focus:outline-none focus-visible:bg-indigo-50/50 ${
        isSelected
          ? 'bg-indigo-50/70 hover:bg-indigo-50/90'
          : 'hover:bg-slate-50/80 bg-white'
      }`}
    >
      {/* Name */}
      <td className="py-2.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-2.5">
          <Avatar name={contact.name} size="md" />
          <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {contact.name}
          </span>
        </div>
      </td>

      {/* Company */}
      <td className="py-2.5 px-4 whitespace-nowrap text-xs text-slate-700">
        {contact.company ? (
          <span className="font-medium text-slate-800">{contact.company}</span>
        ) : (
          <span className="text-slate-400 select-none" aria-label="Not provided">—</span>
        )}
      </td>

      {/* Email */}
      <td className="py-2.5 px-4 whitespace-nowrap text-xs text-slate-600 max-w-[200px] truncate">
        {contact.email ? (
          <span className="text-slate-600 hover:text-indigo-600 transition-colors">
            {contact.email}
          </span>
        ) : (
          <span className="text-slate-400 select-none" aria-label="Not provided">—</span>
        )}
      </td>

      {/* Role */}
      <td className="py-2.5 px-4 whitespace-nowrap text-xs text-slate-600">
        {contact.role || <span className="text-slate-400 select-none">—</span>}
      </td>

      {/* Owner */}
      <td className="py-2.5 px-4 whitespace-nowrap text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <Avatar name={contact.owner} size="xs" />
          <span>{contact.owner}</span>
        </div>
      </td>

      {/* Labels */}
      <td className="py-2.5 px-4 whitespace-nowrap">
        <div className="flex items-center gap-1 flex-wrap max-w-[220px]">
          {contact.labels && contact.labels.length > 0 ? (
            contact.labels.map(label => <LabelChip key={label} label={label} size="xs" />)
          ) : (
            <span className="text-slate-400 text-xs select-none">—</span>
          )}
        </div>
      </td>

      {/* Stage */}
      <td className="py-2.5 px-4 whitespace-nowrap">
        <StageBadge stage={contact.stage} size="sm" />
      </td>
    </motion.tr>
  );
};
