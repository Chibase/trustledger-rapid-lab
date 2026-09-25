import React, { useState } from 'react';
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
import { Edit2, X } from 'lucide-react';

const stakeholderSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['individual', 'organization', 'community', 'government']),
  status: z.enum(['active', 'inactive', 'pending']),
  organization: z.string().optional(),
  contact: z.string().optional(),
  location: z.string().optional(),
  projects: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
});

type StakeholderFormData = z.infer<typeof stakeholderSchema>;

interface Stakeholder extends StakeholderFormData {
  id: string;
  createdAt: string;
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
      projects: stakeholder.projects || [],
      notes: stakeholder.notes || '',
    },
  });

  const onSubmit = async (data: StakeholderFormData) => {
    setIsSubmitting(true);
    try {
      const updated: Stakeholder = {
        ...stakeholder,
        ...data,
      };
      onUpdate(updated);
      toast.success('Stakeholder updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update stakeholder');
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
      <DialogContent className="max-w-2xl">
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
              {/* Name and Type */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Status and Organization */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Contact and Location */}
              <div className="grid grid-cols-2 gap-4">
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

              {/* Notes */}
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

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
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
            {/* Overview */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Contact Information */}
            {(stakeholder.organization || stakeholder.contact || stakeholder.location) && (
              <>
                <div className="space-y-3">
                  {stakeholder.organization && (
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Organization / Affiliation
                      </h4>
                      <p className="mt-1 text-foreground">{stakeholder.organization}</p>
                    </div>
                  )}
                  {stakeholder.contact && (
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Contact / Representative
                      </h4>
                      <p className="mt-1 text-foreground">{stakeholder.contact}</p>
                    </div>
                  )}
                  {stakeholder.location && (
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Location / Geography
                      </h4>
                      <p className="mt-1 text-foreground">{stakeholder.location}</p>
                    </div>
                  )}
                </div>
                <Separator />
              </>
            )}

            {/* Projects */}
            {stakeholder.projects && stakeholder.projects.length > 0 && (
              <>
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground">
                    Associated Projects
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stakeholder.projects.map((project) => (
                      <Badge key={project} variant="secondary">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Notes */}
            {stakeholder.notes && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground">Notes</h4>
                <p className="mt-2 whitespace-pre-wrap text-foreground">{stakeholder.notes}</p>
              </div>
            )}

            {/* Future Sections Placeholder */}
            <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-xs font-semibold text-muted-foreground">
                FUTURE CAPABILITIES
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>• Related engagements</p>
                <p>• Related commitments</p>
                <p>• Related incidents / grievances</p>
                <p>• Relevant evidence links</p>
              </div>
            </div>

            {/* Actions */}
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
