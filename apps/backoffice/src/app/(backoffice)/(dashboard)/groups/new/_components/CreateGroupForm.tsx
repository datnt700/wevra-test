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
import { GROUP_CATEGORIES } from '../../_constants/categories';
import { CREATE_GROUP_STEPS } from '../_config/steps';

interface CreateGroupFormProps {
  userId: string;
}

export function CreateGroupForm({ userId }: CreateGroupFormProps) {
  const router = useRouter();
  const t = useTranslations('groups');
  const createGroupMutation = useCreateGroup();
  const [currentStep, setCurrentStep] = useState(1);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const categoryOptions = GROUP_CATEGORIES.map((cat) => ({
    value: cat,
    label: t(`categories.${cat}`),
  }));

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      description: '',
      category: 'Food',
      location: '',
      image: '',
      isPublic: true,
    },
  });

  const category = useWatch({ control, name: 'category', defaultValue: 'Food' });
  const isPublic = useWatch({ control, name: 'isPublic', defaultValue: true });

  const handleNext = async () => {
    let fieldsToValidate: (keyof GroupFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['location', 'category'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['name', 'description'];
    }

    const isValid = await trigger(fieldsToValidate);
    console.log('[CreateGroupForm] handleNext - Step:', currentStep, 'Valid:', isValid);
    if (isValid) {
      setCurrentStep((prev) => {
        const nextStep = Math.min(prev + 1, CREATE_GROUP_STEPS.length);
        console.log('[CreateGroupForm] Moving to step:', nextStep);
        return nextStep;
      });
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: GroupFormData) => {
    // Only submit if explicitly triggered
    if (!shouldSubmit) {
      console.log('[CreateGroupForm] Blocked submission - shouldSubmit is false');
      return;
    }

    console.log('[CreateGroupForm] Submitting form');
    setShouldSubmit(false); // Reset flag
    createGroupMutation.mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          router.push(ROUTES.GROUP.LIST);
        },
      }
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log('[CreateGroupForm] handleFormSubmit called. shouldSubmit:', shouldSubmit);
    e.preventDefault();
    if (shouldSubmit) {
      handleSubmit(onSubmit)(e);
    }
    // Do nothing if shouldSubmit is false
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent Enter key from submitting on steps 1 and 2
    if (e.key === 'Enter' && currentStep !== 3) {
      e.preventDefault();
    }
  };

  return (
    <Styled.PageContainer>
      <Styled.PageHeader>
        <Styled.PageTitle>{t('title')}</Styled.PageTitle>
        <Styled.PageSubtitle>{t('subtitle')}</Styled.PageSubtitle>
      </Styled.PageHeader>

      <Styled.Form onSubmit={handleFormSubmit} onKeyDown={handleKeyDown}>
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
            {CREATE_GROUP_STEPS.map((step, index) => {
              const stepId = step?.id ?? index + 1;
              const stepTitle = step?.title ?? `Step ${index + 1}`;
              return (
                <Styled.StepItem key={stepId}>
                  <Styled.StepContent>
                    <Styled.StepCircle $isActive={currentStep >= stepId}>
                      {stepId}
                    </Styled.StepCircle>
                    <Styled.StepTitle $isActive={currentStep >= stepId}>
                      {stepTitle}
                    </Styled.StepTitle>
                  </Styled.StepContent>
                  {index < CREATE_GROUP_STEPS.length - 1 && (
                    <Styled.StepConnector $isActive={currentStep > stepId} />
                  )}
                </Styled.StepItem>
              );
            })}
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
              <Styled.SummaryTitle>{t('create.reviewTitle')}</Styled.SummaryTitle>
              <Styled.SummaryList>
                <Styled.SummaryItem>
                  <Styled.SummaryLabel>{t('create.summaryLocation')}:</Styled.SummaryLabel>
                  <Styled.SummaryValue>
                    {getValues('location') || t('create.notSpecified')}
                  </Styled.SummaryValue>
                </Styled.SummaryItem>
                <Styled.SummaryItem>
                  <Styled.SummaryLabel>{t('create.summaryCategory')}:</Styled.SummaryLabel>
                  <Styled.SummaryValue>{t(`categories.${category}`)}</Styled.SummaryValue>
                </Styled.SummaryItem>
                <Styled.SummaryItem>
                  <Styled.SummaryLabel>{t('create.summaryName')}:</Styled.SummaryLabel>
                  <Styled.SummaryValue>{getValues('name')}</Styled.SummaryValue>
                </Styled.SummaryItem>
                <Styled.SummaryItem>
                  <Styled.SummaryLabel>{t('create.summaryVisibility')}:</Styled.SummaryLabel>
                  <Styled.SummaryValue>
                    {isPublic ? t('create.visibilityPublic') : t('create.visibilityPrivate')}
                  </Styled.SummaryValue>
                </Styled.SummaryItem>
              </Styled.SummaryList>
            </Styled.SummaryCard>
          </Styled.StepFields>
        )}

        {/* Navigation Buttons */}
        <Styled.ButtonGroup>
          {currentStep > 1 && (
            <Button type="button" variant="secondary" onClick={handlePrevious}>
              {t('create.previousButton')}
            </Button>
          )}

          {currentStep < CREATE_GROUP_STEPS.length ? (
            <Button type="button" variant="primary" onClick={handleNext}>
              {t('create.nextButton')}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || createGroupMutation.isPending}
              onClick={() => setShouldSubmit(true)}
            >
              {createGroupMutation.isPending ? t('createButton') + '...' : t('createButton')}
            </Button>
          )}

          <Button type="button" variant="secondary" onClick={() => router.push(ROUTES.GROUP.LIST)}>
            {t('cancelButton')}
          </Button>
        </Styled.ButtonGroup>
      </Styled.Form>
    </Styled.PageContainer>
  );
}
