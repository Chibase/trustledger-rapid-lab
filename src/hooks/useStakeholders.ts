import { useCallback, useEffect, useState } from 'react';

export type StakeholderType = 'individual' | 'organization' | 'community' | 'government';
export type StakeholderStatus = 'active' | 'inactive' | 'pending';

export interface Stakeholder {
  id: string;
  name: string;
  type: StakeholderType;
  status: StakeholderStatus;
  organization?: string;
  contact?: string;
  location?: string;
  projects?: string[];
  notes?: string;
  createdAt: string;
}

const STORAGE_KEY = 'trustledger.p03.stakeholders';

const SEED_STAKEHOLDERS: Stakeholder[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    type: 'individual',
    status: 'active',
    organization: 'Community Development Council',
    contact: 'sarah@cdc.org',
    location: 'District 5',
    projects: ['P001', 'P002'],
    notes: 'Key community liaison',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Regional Development Authority',
    type: 'government',
    status: 'active',
    organization: 'Ministry of Infrastructure',
    location: 'Regional Office',
    projects: ['P001'],
    notes: 'Primary regulatory stakeholder',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Local Environmental Coalition',
    type: 'community',
    status: 'active',
    location: 'District 5',
    projects: ['P002'],
    notes: 'Environmental impact monitoring',
    createdAt: '2024-02-01',
  },
];

function readStoredStakeholders(): Stakeholder[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_STAKEHOLDERS));
    return SEED_STAKEHOLDERS;
  }
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error('Invalid stakeholder store');
  }
  return parsed as Stakeholder[];
}

export function useStakeholders() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      setStakeholders(readStoredStakeholders());
    } catch {
      setStakeholders([]);
      setError('Could not load stakeholders. Refresh the page or try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const persist = useCallback((next: Stakeholder[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setStakeholders(next);
  }, []);

  const addStakeholder = useCallback(
    (input: Omit<Stakeholder, 'id' | 'createdAt'>) => {
      try {
        const nextId =
          String(
            Math.max(0, ...stakeholders.map((s) => parseInt(s.id, 10) || 0)) + 1
          );
        const stakeholder: Stakeholder = {
          ...input,
          id: nextId,
          createdAt: new Date().toISOString().split('T')[0],
        };
        persist([...stakeholders, stakeholder]);
        return stakeholder;
      } catch {
        throw new Error('Failed to save stakeholder. Please try again.');
      }
    },
    [persist, stakeholders]
  );

  const updateStakeholder = useCallback(
    (updated: Stakeholder) => {
      try {
        persist(stakeholders.map((s) => (s.id === updated.id ? updated : s)));
        return updated;
      } catch {
        throw new Error('Failed to update stakeholder. Please try again.');
      }
    },
    [persist, stakeholders]
  );

  return {
    stakeholders,
    loading,
    error,
    reload: load,
    addStakeholder,
    updateStakeholder,
  };
}
