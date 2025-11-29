'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Button,
  InputText,
  TextArea,
  Alert,
  Field,
  Label,
  Checkbox,
  Select,
  Modal,
} from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';
import { useUpdateGroup, useDeleteGroup } from '../../../_hooks/useGroups';
import { groupSchema, type GroupFormData } from '../../../_schemas/groupSchema';
import { Styled } from './EditGroupForm.styles';
import { FieldError } from '../../../_components/FieldError';
import { GROUP_CATEGORIES } from '../../../_constants/categories';
import type { Prisma } from '@prisma/client';

interface EditGroupFormProps {
  group: Pick<
    Prisma.GroupGetPayload<Record<string, never>>,
    'id' | 'name' | 'description' | 'category' | 'location' | 'image' | 'isPublic'
  >;
}

export function EditGroupForm({ group }: EditGroupFormProps) {
  const router = useRouter();
  const t = useTranslations('groups');
  const updateGroupMutation = useUpdateGroup(group.id);
  const deleteGroupMutation = useDeleteGroup();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const categoryOptions = GROUP_CATEGORIES.map((cat) => ({
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
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteGroupMutation.mutate(group.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        router.push(ROUTES.GROUP.LIST);
      },
    });
  };

  return (
    <Styled.PageContainer>
      <Styled.PageHeader>
        <Styled.PageTitle>{t('edit.title')}</Styled.PageTitle>
        <Styled.PageSubtitle>{t('edit.subtitle')}</Styled.PageSubtitle>
      </Styled.PageHeader>

      <Styled.FormContainer onSubmit={handleSubmit(onSubmit)}>
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
              <InputText
                id="name"
                placeholder={t('fields.namePlaceholder')}
                {...register('name')}
              />
              {errors.name && <FieldError message={errors.name.message} />}
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

        <Styled.ButtonGroup>
          <Button
            type="submit"
            variant="primary"
            disabled={
              isSubmitting || updateGroupMutation.isPending || deleteGroupMutation.isPending
            }
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
        </Styled.ButtonGroup>
      </Styled.FormContainer>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        header={<h2>{t('edit.deleteModalTitle')}</h2>}
        footer={
          <>
            <Button
              variant="danger"
              onClick={confirmDelete}
              disabled={deleteGroupMutation.isPending}
            >
              {deleteGroupMutation.isPending ? t('edit.deleting') : t('edit.deleteButton')}
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              disabled={deleteGroupMutation.isPending}
            >
              {t('cancelButton')}
            </Button>
          </>
        }
      >
        <p>{t('edit.deleteConfirmMessage')}</p>
      </Modal>

      <Styled.DangerZone>
        <Styled.DangerTitle>{t('edit.deleteButton')}</Styled.DangerTitle>
        <Styled.DangerDescription>{t('edit.deleteConfirm')}</Styled.DangerDescription>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          disabled={updateGroupMutation.isPending || deleteGroupMutation.isPending}
        >
          {deleteGroupMutation.isPending ? t('edit.deleting') : t('edit.deleteButton')}
        </Button>
      </Styled.DangerZone>
    </Styled.PageContainer>
  );
}
