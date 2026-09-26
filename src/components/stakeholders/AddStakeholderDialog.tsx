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
import { toast } from 'sonner';
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

interface AddStakeholderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (stakeholder: Omit<Stakeholder, 'id' | 'createdAt'>) => void;
}

export function AddStakeholderDialog({
  open,
  onOpenChange,
  onSave,
}: AddStakeholderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StakeholderFormData>({
    resolver: zodResolver(stakeholderSchema),
    defaultValues: {
      name: '',
      type: 'individual',
      status: 'active',
      organization: '',
      contact: '',
      location: '',
      projectsText: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: '',
        type: 'individual',
        status: 'active',
        organization: '',
        contact: '',
        location: '',
        projectsText: '',
        notes: '',
      });
    }
  }, [open, form]);

  const onSubmit = async (data: StakeholderFormData) => {
    setIsSubmitting(true);
    try {
      const { projectsText, ...rest } = data;
      onSave({
        ...rest,
        projects: parseProjects(projectsText),
      });
      toast.success('Stakeholder added successfully');
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add stakeholder'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add stakeholder</DialogTitle>
          <DialogDescription>
            Create a new stakeholder record. Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>

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
                      placeholder="Additional information about this stakeholder..."
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
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Add stakeholder'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
