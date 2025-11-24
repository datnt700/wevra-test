'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, InputText, TextArea, Alert, Field, Label, Checkbox, Select } from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';
import { useUpdateGroup, useDeleteGroup } from '../../../_hooks/useGroups';
import { groupSchema, type GroupFormData } from '../../../_schemas/groupSchema';

interface EditGroupFormProps {
  group: {
    id: string;
    name: string;
    description: string | null;
    category: string;
    location: string | null;
    image: string | null;
    isPublic: boolean;
  };
}

const CATEGORIES = [
  'Technology',
  'Business',
  'Arts',
  'Sports',
  'Education',
  'Health',
  'Social',
  'Food',
  'Travel',
  'Other',
];

export function EditGroupForm({ group }: EditGroupFormProps) {
  const router = useRouter();
  const t = useTranslations('groups');
  const updateGroupMutation = useUpdateGroup(group.id);
  const deleteGroupMutation = useDeleteGroup();
  const [showSuccess, setShowSuccess] = useState(false);

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat,
    label: t(`categories.${cat}`),
  }));

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: group.name,
      description: group.description || '',
      category: group.category,
      location: group.location || '',
      image: group.image || '',
      isPublic: group.isPublic,
    },
  });

  const category = useWatch({ control, name: 'category', defaultValue: group.category });
  const isPublic = useWatch({ control, name: 'isPublic', defaultValue: group.isPublic });

  const onSubmit = (data: GroupFormData) => {
    updateGroupMutation.mutate(data, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          router.push(ROUTES.GROUP.DETAIL(group.id));
        }, 1500);
      },
    });
  };

  const handleDelete = async () => {
    if (!confirm(t('edit.deleteConfirm'))) {
      return;
    }

    deleteGroupMutation.mutate(group.id, {
      onSuccess: () => {
        router.push(ROUTES.GROUP.LIST);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {(updateGroupMutation.error || deleteGroupMutation.error) && (
        <Alert
          variant="danger"
          title={
            updateGroupMutation.error instanceof Error
              ? updateGroupMutation.error.message
              : deleteGroupMutation.error instanceof Error
                ? deleteGroupMutation.error.message
                : t('edit.errors.updateFailed')
          }
        />
      )}

      {showSuccess && <Alert variant="success" title={t('edit.success')} />}

      <Field
        label={
          <Label htmlFor="name" required>
            {t('fields.name')}
          </Label>
        }
        input={
          <>
            <InputText id="name" placeholder={t('fields.namePlaceholder')} {...register('name')} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </>
        }
      />

      <Field
        label={
          <Label htmlFor="description" required>
            {t('fields.description')}
          </Label>
        }
        input={
          <TextArea
            id="description"
            placeholder={t('fields.descriptionPlaceholder')}
            rows={6}
            errorMessage={errors.description?.message}
            {...register('description')}
          />
        }
      />

      <Field
        label={
          <Label htmlFor="category" required>
            {t('fields.category')}
          </Label>
        }
        input={
          <Select
            options={categoryOptions}
            value={category}
            onValueChange={(value) => setValue('category', value)}
            required
          />
        }
      />

      <Field
        label={<Label htmlFor="location">{t('fields.location')}</Label>}
        input={
          <InputText
            id="location"
            placeholder={t('fields.locationPlaceholder')}
            errorMessage={errors.location?.message}
            {...register('location')}
          />
        }
      />

      <Field
        label={<Label htmlFor="image">{t('fields.image')}</Label>}
        input={
          <InputText
            id="image"
            placeholder={t('fields.imagePlaceholder')}
            errorMessage={errors.image?.message}
            {...register('image')}
          />
        }
      />

      <Field
        type="row"
        label={<Label htmlFor="isPublic">{t('fields.isPublic')}</Label>}
        input={
          <Checkbox
            id="isPublic"
            checked={isPublic}
            onCheckedChange={(checked) => setValue('isPublic', checked === true)}
          />
        }
      />

      <div className="flex gap-4 border-t pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || updateGroupMutation.isPending || deleteGroupMutation.isPending}
        >
          {updateGroupMutation.isPending ? t('edit.updating') : t('saveButton')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push(ROUTES.GROUP.DETAIL(group.id))}
        >
          {t('cancelButton')}
        </Button>
      </div>

      <div className="border-t pt-8">
        <h3 className="mb-2 text-lg font-semibold text-red-600">{t('edit.deleteButton')}</h3>
        <p className="mb-4 text-sm text-gray-600">{t('edit.deleteConfirm')}</p>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={updateGroupMutation.isPending || deleteGroupMutation.isPending}
        >
          {deleteGroupMutation.isPending ? t('edit.deleting') : t('edit.deleteButton')}
        </Button>
      </div>
    </form>
  );
}
