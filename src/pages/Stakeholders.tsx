import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Search, AlertCircle } from 'lucide-react';
import { AddStakeholderDialog } from '@/components/stakeholders/AddStakeholderDialog';
import { StakeholderDetail } from '@/components/stakeholders/StakeholderDetail';
import { useStakeholders } from '@/hooks/useStakeholders';

type SortField = 'name' | 'type' | 'organization';

interface Stakeholder {
  id: string;
  name: string;
  type: 'individual' | 'organization' | 'community' | 'government';
  status: 'active' | 'inactive' | 'pending';
  organization?: string;
  contact?: string;
  location?: string;
  projects?: string[];
  notes?: string;
  createdAt: string;
}

export default function Stakeholders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sample data - in production this would come from Supabase
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
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
  ]);

  // Filter and sort
  const filtered = useMemo(() => {
    let result = stakeholders.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.location?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'all' || s.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'type') {
        return a.type.localeCompare(b.type);
      } else if (sortBy === 'organization') {
        return (a.organization || '').localeCompare(b.organization || '');
      }
      return 0;
    });

    return result;
  }, [stakeholders, searchTerm, typeFilter, statusFilter, sortBy]);

  const handleAddStakeholder = (newStakeholder: Omit<Stakeholder, 'id' | 'createdAt'>) => {
    const stakeholder: Stakeholder = {
      ...newStakeholder,
      id: String(Math.max(...stakeholders.map((s) => parseInt(s.id) || 0)) + 1),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setStakeholders([...stakeholders, stakeholder]);
    setIsAddDialogOpen(false);
  };

  const handleUpdateStakeholder = (updated: Stakeholder) => {
    setStakeholders(stakeholders.map((s) => (s.id === updated.id ? updated : s)));
    setSelectedStakeholder(updated);
  };

  const openDetail = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      individual: 'Individual',
      organization: 'Organization',
      community: 'Community',
      government: 'Government',
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-foreground">Stakeholder Registry</h1>
            <p className="text-sm text-muted-foreground">
              Record and manage the people, organisations, and communities that this project affects or works with.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, organisation, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className="gap-2 whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Add stakeholder
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Type:</span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">Sort:</span>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortField)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A–Z</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="organization">Organization</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Registry */}
        {filtered.length === 0 ? (
          stakeholders.length === 0 ? (
            // Empty state
            <Card className="border-border bg-card p-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  No stakeholders yet
                </h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  The Stakeholder Registry records who your project affects or works with. Start by adding your first stakeholder.
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add your first stakeholder
                </Button>
              </div>
            </Card>
          ) : (
            // No results state
            <Card className="border-border bg-card p-12 text-center">
              <div className="mx-auto max-w-md">
                <div className="mb-4 flex justify-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">
                  No results
                </h2>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search or filters.
                </p>
              </div>
            </Card>
          )
        ) : (
          <Card className="border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border hover:bg-transparent">
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Type</TableHead>
                    <TableHead className="text-foreground">Organization</TableHead>
                    <TableHead className="text-foreground">Location</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Projects</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((stakeholder) => (
                    <TableRow
                      key={stakeholder.id}
                      onClick={() => openDetail(stakeholder)}
                      className="cursor-pointer border-b border-border hover:bg-muted/50"
                    >
                      <TableCell className="font-medium text-foreground">
                        {stakeholder.name}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {getTypeLabel(stakeholder.type)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {stakeholder.organization || '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {stakeholder.location || '—'}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(stakeholder.status)} border-0`}>
                          {stakeholder.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {stakeholder.projects?.length || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>

      {/* Dialogs */}
      <AddStakeholderDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddStakeholder}
      />

      {selectedStakeholder && (
        <StakeholderDetail
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          stakeholder={selectedStakeholder}
          onUpdate={handleUpdateStakeholder}
        />
      )}
    </div>
  );
}
