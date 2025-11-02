'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Button,
  InputText,
  TextArea,
  Select,
  Form,
  Label,
  Card,
  Alert,
  Field,
  Checkbox,
  ButtonGroup,
  SPACING_VALUES,
  cssVars,
  Stack,
} from '@tavia/taviad';
import { AlertCircle } from 'lucide-react';
import {
  restaurantFormSchema,
  cuisineOptions,
  priceRangeOptions,
  type RestaurantFormData,
} from '../../../new/_types';
import { useUpdateRestaurant } from '../_hooks';

/**
 * Restaurant edit form component
 * Pre-fills form with existing restaurant data
 */
export const EditRestaurantForm = ({
  restaurantId,
  initialData,
}: {
  restaurantId: string;
  initialData: RestaurantFormData;
}) => {
  const router = useRouter();
  const t = useTranslations('restaurants');
  const { mutate: updateRestaurant, isPending, error } = useUpdateRestaurant(restaurantId);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: RestaurantFormData) => {
    updateRestaurant(data);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="lg" style={{ padding: SPACING_VALUES.xl }}>
          {/* Restaurant Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Field
                label={
                  <Label htmlFor="name" required>
                    {t('fields.name')}
                  </Label>
                }
                input={
                  <InputText
                    id="name"
                    {...field}
                    placeholder={t('fields.namePlaceholder')}
                    variant={errors.name ? 'danger' : 'default'}
                    errorMessage={errors.name?.message}
                  />
                }
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Field
                label={<Label htmlFor="description">{t('fields.description')}</Label>}
                input={
                  <>
                    <TextArea
                      id="description"
                      {...field}
                      placeholder={t('fields.descriptionPlaceholder')}
                      rows={4}
                    />
                    {errors.description && (
                      <span
                        style={{
                          color: cssVars.colorDanger,
                          fontSize: '0.875rem',
                          marginTop: SPACING_VALUES.xs,
                          display: 'block',
                        }}
                      >
                        {errors.description.message}
                      </span>
                    )}
                  </>
                }
              />
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Field
                label={
                  <Label htmlFor="address" required>
                    {t('fields.address')}
                  </Label>
                }
                input={
                  <InputText
                    id="address"
                    {...field}
                    placeholder={t('fields.addressPlaceholder')}
                    variant={errors.address ? 'danger' : 'default'}
                    errorMessage={errors.address?.message}
                  />
                }
              />
            )}
          />

          {/* Phone & Email */}
          <Stack direction="row" spacing="md">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Field
                  label={
                    <Label htmlFor="phone" required>
                      {t('fields.phone')}
                    </Label>
                  }
                  input={
                    <InputText
                      id="phone"
                      type="tel"
                      {...field}
                      placeholder={t('fields.phonePlaceholder')}
                      variant={errors.phone ? 'danger' : 'default'}
                      errorMessage={errors.phone?.message}
                    />
                  }
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field
                  label={
                    <Label htmlFor="email" required>
                      {t('fields.email')}
                    </Label>
                  }
                  input={
                    <InputText
                      id="email"
                      type="email"
                      {...field}
                      placeholder={t('fields.emailPlaceholder')}
                      variant={errors.email ? 'danger' : 'default'}
                      errorMessage={errors.email?.message}
                    />
                  }
                />
              )}
            />
          </Stack>

          {/* Cuisine Types */}
          <Controller
            name="cuisine"
            control={control}
            render={({ field }) => (
              <Field
                label={<Label required>{t('fields.cuisine')}</Label>}
                input={
                  <>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                        gap: SPACING_VALUES.sm,
                        marginTop: SPACING_VALUES.sm,
                      }}
                    >
                      {cuisineOptions.map((cuisine) => (
                        <Checkbox
                          key={cuisine}
                          label={cuisine}
                          checked={field.value.includes(cuisine)}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, cuisine]
                              : field.value.filter((c) => c !== cuisine);
                            field.onChange(updated);
                          }}
                        />
                      ))}
                    </div>
                    {errors.cuisine && (
                      <span
                        style={{
                          color: cssVars.colorDanger,
                          fontSize: '0.875rem',
                          marginTop: SPACING_VALUES.xs,
                          display: 'block',
                        }}
                      >
                        {errors.cuisine.message}
                      </span>
                    )}
                  </>
                }
              />
            )}
          />

          {/* Price Range */}
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <Field
                label={
                  <Label htmlFor="priceRange" required>
                    {t('fields.priceRange')}
                  </Label>
                }
                input={
                  <>
                    <Select
                      options={priceRangeOptions.map((opt) => ({
                        value: opt.value,
                        label: t(`priceRanges.${opt.value}`),
                      }))}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('fields.priceRange')}
                      isInvalid={!!errors.priceRange}
                    />
                    {errors.priceRange && (
                      <span
                        style={{
                          color: cssVars.colorDanger,
                          fontSize: '0.875rem',
                          marginTop: SPACING_VALUES.xs,
                          display: 'block',
                        }}
                      >
                        {errors.priceRange.message}
                      </span>
                    )}
                  </>
                }
              />
            )}
          />

          {/* Image URL */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Field
                label={<Label htmlFor="image">{t('fields.image')}</Label>}
                input={
                  <InputText
                    id="image"
                    type="url"
                    {...field}
                    placeholder={t('fields.imagePlaceholder')}
                    variant={errors.image ? 'danger' : 'default'}
                    errorMessage={errors.image?.message}
                  />
                }
              />
            )}
          />

          {/* Error Message */}
          {error && (
            <Alert
              variant="danger"
              title={t('errors.updateFailed')}
              description={error.message}
              icon={<AlertCircle size={20} />}
              isFilled
            />
          )}

          {/* Submit Buttons */}
          <Stack direction="row" justify="end">
            <ButtonGroup>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                disabled={isPending}
              >
                {t('cancelButton')}
              </Button>
              <Button type="submit" variant="primary" isLoading={isPending}>
                {t('updateButton')}
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
};
