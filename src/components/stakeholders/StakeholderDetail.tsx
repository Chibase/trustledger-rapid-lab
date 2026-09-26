import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Edit2 } from 'lucide-react';
import type { Stakeholder } from '@/hooks/useStakeholders';

const stakeholderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['individual', 'organization', 'community', 'government']),
  status: z.enum(['active', 'inactive', 'pending']),
  organization: z.string().optional(),
  contact: z.string().optional(),
  location: z.string().optional(),
  projectsText: z.string().optional(),
  notes: z.string().optional(),
});

type StakeholderFormData = z.infer<typeof stakeholderSchema>;

function parseProjects(value?: string): string[] {
  if (!value?.trim()) return [];
  return value
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
}

interface StakeholderDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stakeholder: Stakeholder;
  onUpdate: (stakeholder: Stakeholder) => void;
}

export function StakeholderDetail({
  open,
  onOpenChange,
  stakeholder,
  onUpdate,
}: StakeholderDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StakeholderFormData>({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: stakeholder.name,
      type: stakeholder.type,
      status: stakeholder.status,
      organization: stakeholder.organization || '',
      contact: stakeholder.contact || '',
      location: stakeholder.location || '',
      projectsText: (stakeholder.projects || []).join(', '),
      notes: stakeholder.notes || '',
    },
  });

  useEffect(() => {
    form.reset({
      name: stakeholder.name,
      type: stakeholder.type,
      status: stakeholder.status,
      organization: stakeholder.organization || '',
      contact: stakeholder.contact || '',
      location: stakeholder.location || '',
      projectsText: (stakeholder.projects || []).join(', '),
      notes: stakeholder.notes || '',
    });
    setIsEditing(false);
  }, [stakeholder, form]);

  const onSubmit = async (data: StakeholderFormData) => {
    setIsSubmitting(true);
    try {
      const { projectsText, ...rest } = data;
      const updated: Stakeholder = {
        ...stakeholder,
        ...rest,
        projects: parseProjects(projectsText),
      };
      onUpdate(updated);
      toast.success('Stakeholder updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update stakeholder'
      );
    } finally {
      setIsSubmitting(false);
    }
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle>{stakeholder.name}</DialogTitle>
              <DialogDescription className="mt-1">
                {getTypeLabel(stakeholder.type)} · Added {stakeholder.createdAt}
              </DialogDescription>
            </div>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </DialogHeader>

        {isEditing ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Stakeholder name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="organization">Organization</SelectItem>
                          <SelectItem value="community">Community</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization / Affiliation</FormLabel>
                      <FormControl>
                        <Input placeholder="Organization name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact / Representative</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact name or email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location / Geography</FormLabel>
                      <FormControl>
                        <Input placeholder="Location or region" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectsText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project relationship</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Project IDs, comma-separated (e.g. P001, P002)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional information..."
                        className="min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save changes'}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Type</h4>
                <p className="mt-1 text-foreground">{getTypeLabel(stakeholder.type)}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Status</h4>
                <div className="mt-1">
                  <Badge className={`${getStatusColor(stakeholder.status)} border-0`}>
                    {stakeholder.status}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Organization / Affiliation
                </h4>
                <p className="mt-1 text-foreground">
                  {stakeholder.organization || '—'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Contact / Representative
                </h4>
                <p className="mt-1 text-foreground">
                  {stakeholder.contact || '—'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">
                  Location / Geography
                </h4>
                <p className="mt-1 text-foreground">
                  {stakeholder.location || '—'}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">
                Associated Projects
              </h4>
              {stakeholder.projects && stakeholder.projects.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {stakeholder.projects.map((project) => (
                    <Badge key={project} variant="secondary">
                      {project}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  No project relationship recorded yet.
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground">Notes</h4>
              <p className="mt-2 whitespace-pre-wrap text-foreground">
                {stakeholder.notes || '—'}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">
                Engagements, commitments, incidents/grievances and evidence links
                appear here when those modules link records to this stakeholder.
                No related operational records are available in this build yet.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
