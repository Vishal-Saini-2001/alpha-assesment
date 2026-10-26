export type ContactStage = 'Lead' | 'Prospect' | 'Qualified' | 'Customer';

export interface Contact {
  id: string;
  name: string;
  email: string | null;
  company: string | null;
  role: string;
  owner: string;
  labels: string[];
  stage: ContactStage;
  notes: string;
}

export type ViewMode = 'table' | 'board';

export interface ContactDraft {
  stage: ContactStage;
  notes: string;
}

export const STAGE_CONFIG: Record<
  ContactStage,
  {
    label: string;
    bg: string;
    text: string;
    border: string;
    dot: string;
    lightBg: string;
    description: string;
  }
> = {
  Lead: {
    label: 'Lead',
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-500',
    lightBg: 'bg-slate-50/70',
    description: 'Initial inquiries and inbound discovery',
  },
  Prospect: {
    label: 'Prospect',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    lightBg: 'bg-blue-50/40',
    description: 'Active conversations and evaluation underway',
  },
  Qualified: {
    label: 'Qualified',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    lightBg: 'bg-purple-50/40',
    description: 'Confirmed budget, authority, and timeline',
  },
  Customer: {
    label: 'Customer',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
    lightBg: 'bg-emerald-50/40',
    description: 'Active contract and onboarding complete',
  },
};

export const STAGES_ORDER: ContactStage[] = ['Lead', 'Prospect', 'Qualified', 'Customer'];
