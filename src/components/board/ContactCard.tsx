import React from 'react';
import { Contact } from '../../types/contact';
import { Avatar } from '../common/Avatar';
import { LabelChip } from '../common/LabelChip';
import { Building2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const ContactCard: React.FC<ContactCardProps> = ({
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={() => onSelect(contact.id)}
      onKeyDown={handleKeyDown}
      className={`group relative p-3.5 bg-white rounded-lg border text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 select-none ${
        isSelected
          ? 'border-indigo-500 shadow-sm ring-1 ring-indigo-500/30'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-subtle'
      }`}
    >
      {/* Top Header: Avatar + Name */}
      <div className="flex items-start gap-2.5">
        <Avatar name={contact.name} size="md" />
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {contact.name}
          </h4>
          {contact.role && (
            <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
              <Briefcase className="w-2.5 h-2.5 text-slate-400 shrink-0" />
              <span>{contact.role}</span>
            </p>
          )}
        </div>
      </div>

      {/* Company if provided */}
      {contact.company && (
        <div className="mt-2 text-xs text-slate-700 font-medium flex items-center gap-1.5 pl-0.5">
          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{contact.company}</span>
        </div>
      )}

      {/* Label Chips */}
      {contact.labels && contact.labels.length > 0 && (
        <div className="mt-2.5 flex items-center gap-1 flex-wrap">
          {contact.labels.slice(0, 3).map(label => (
            <LabelChip key={label} label={label} size="xs" />
          ))}
          {contact.labels.length > 3 && (
            <span className="text-[10px] text-slate-400 font-medium">
              +{contact.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer: Owner */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span className="text-slate-400 text-[10px] uppercase tracking-wider font-medium">
          Owner
        </span>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Avatar name={contact.owner} size="xs" />
          <span className="font-medium truncate max-w-[110px]">{contact.owner}</span>
        </div>
      </div>
    </motion.div>
  );
};
