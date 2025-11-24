'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, InputText, TextArea, Alert, Field, Label, Checkbox, Select } from '@tavia/taviad';
import { ROUTES } from '@/lib/constants';
import { useCreateGroup } from '../../_hooks/useGroups';
import { groupSchema, type GroupFormData } from '../../_schemas/groupSchema';
import { Styled } from './CreateGroupForm.styles';

interface CreateGroupFormProps {
  userId: string;
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

const STEPS = [
  { id: 1, title: 'Location & Type' },
  { id: 2, title: 'Basic Information' },
  { id: 3, title: 'Details' },
] as const;

export function CreateGroupForm({ userId }: CreateGroupFormProps) {
  const router = useRouter();
  const t = useTranslations('groups');
  const createGroupMutation = useCreateGroup();
  const [currentStep, setCurrentStep] = useState(1);

  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat,
    label: t(`categories.${cat}`),
  }));

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      category: 'Technology',
      location: '',
      image: '',
      isPublic: true,
    },
  });

  const category = useWatch({ control, name: 'category', defaultValue: 'Technology' });
  const isPublic = useWatch({ control, name: 'isPublic', defaultValue: true });

  const handleNext = async () => {
    let fieldsToValidate: (keyof GroupFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['location', 'category'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['name', 'description'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: GroupFormData) => {
    createGroupMutation.mutate(
      { ...data, userId },
      {
        onSuccess: (response) => {
          router.push(ROUTES.GROUP.DETAIL(response.group.id));
        },
      }
    );
  };

  return (
    <Styled.Form onSubmit={handleSubmit(onSubmit)}>
      {createGroupMutation.error && (
        <Alert
          variant="danger"
          title={
            createGroupMutation.error instanceof Error
              ? createGroupMutation.error.message
              : t('errors.createFailed')
          }
        />
      )}

      {/* Step Progress */}
      <Styled.StepProgress>
        <Styled.StepContainer>
          {STEPS.map((step, index) => (
            <Styled.StepItem key={step.id}>
              <Styled.StepContent>
                <Styled.StepCircle $isActive={currentStep >= step.id}>{step.id}</Styled.StepCircle>
                <Styled.StepTitle $isActive={currentStep >= step.id}>{step.title}</Styled.StepTitle>
              </Styled.StepContent>
              {index < STEPS.length - 1 && (
                <Styled.StepConnector $isActive={currentStep > step.id} />
              )}
            </Styled.StepItem>
          ))}
        </Styled.StepContainer>
      </Styled.StepProgress>

      {/* Step 1: Location & Type */}
      {currentStep === 1 && (
        <Styled.StepFields>
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
        </Styled.StepFields>
      )}

      {/* Step 2: Basic Information */}
      {currentStep === 2 && (
        <Styled.StepFields>
          <Field
            label={
              <Label htmlFor="name" required>
                {t('fields.name')}
              </Label>
            }
            input={
              <InputText
                id="name"
                placeholder={t('fields.namePlaceholder')}
                errorMessage={errors.name?.message}
                {...register('name')}
              />
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
        </Styled.StepFields>
      )}

      {/* Step 3: Details */}
      {currentStep === 3 && (
        <Styled.StepFields>
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

          {/* Summary */}
          <Styled.SummaryCard>
            <Styled.SummaryTitle>Review Your Group</Styled.SummaryTitle>
            <Styled.SummaryList>
              <Styled.SummaryItem>
                <Styled.SummaryLabel>Location:</Styled.SummaryLabel>
                <Styled.SummaryValue>
                  {control._formValues.location || 'Not specified'}
                </Styled.SummaryValue>
              </Styled.SummaryItem>
              <Styled.SummaryItem>
                <Styled.SummaryLabel>Category:</Styled.SummaryLabel>
                <Styled.SummaryValue>{t(`categories.${category}`)}</Styled.SummaryValue>
              </Styled.SummaryItem>
              <Styled.SummaryItem>
                <Styled.SummaryLabel>Name:</Styled.SummaryLabel>
                <Styled.SummaryValue>{control._formValues.name}</Styled.SummaryValue>
              </Styled.SummaryItem>
              <Styled.SummaryItem>
                <Styled.SummaryLabel>Visibility:</Styled.SummaryLabel>
                <Styled.SummaryValue>{isPublic ? 'Public' : 'Private'}</Styled.SummaryValue>
              </Styled.SummaryItem>
            </Styled.SummaryList>
          </Styled.SummaryCard>
        </Styled.StepFields>
      )}

      {/* Navigation Buttons */}
      <Styled.ButtonGroup>
        {currentStep > 1 && (
          <Button type="button" variant="secondary" onClick={handlePrevious}>
            Previous
          </Button>
        )}

        {currentStep < STEPS.length ? (
          <Button type="button" variant="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || createGroupMutation.isPending}
          >
            {createGroupMutation.isPending ? t('createButton') + '...' : t('createButton')}
          </Button>
        )}

        <Button type="button" variant="secondary" onClick={() => router.push(ROUTES.GROUP.LIST)}>
          {t('cancelButton')}
        </Button>
      </Styled.ButtonGroup>
    </Styled.Form>
  );
}
