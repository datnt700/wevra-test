'use client';

/**
 * Edit Profile Client Component
 * Allows users to update their name, email, and password
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button, InputText, Field, Card } from '@tavia/taviad';
import { updateProfileAction } from '@/actions/profile.actions';
import { Styled } from './EditProfileClient.styles';

interface EditProfileClientProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function EditProfileClient({ user }: EditProfileClientProps) {
  const router = useRouter();
  const t = useTranslations('profile');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    // Validate password if changing
    if (formData.newPassword || formData.currentPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
        if (!passwordRegex.test(formData.newPassword)) {
          newErrors.newPassword = 'Password must include uppercase, lowercase, and a number';
        }
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Build update payload (only include changed fields)
      const updatePayload: {
        userId: string;
        name?: string;
        email?: string;
        currentPassword?: string;
        newPassword?: string;
      } = {
        userId: user.id,
      };

      if (formData.name !== user.name) {
        updatePayload.name = formData.name;
      }

      if (formData.email !== user.email) {
        updatePayload.email = formData.email;
      }

      if (formData.newPassword) {
        updatePayload.currentPassword = formData.currentPassword;
        updatePayload.newPassword = formData.newPassword;
      }

      // If no changes, just go back
      if (Object.keys(updatePayload).length === 1) {
        // Only userId
        alert('No changes were made to your profile.');
        router.back();
        return;
      }

      const result = await updateProfileAction(updatePayload);

      if (!result.success) {
        setErrors({ submit: result.error || 'Failed to update profile' });
        return;
      }

      alert('Profile updated successfully!');
      router.back();
      router.refresh();
    } catch (error) {
      console.error('Update profile error:', error);
      setErrors({ submit: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{t('editProfile')}</Styled.Title>
        <Button variant="tertiary" onClick={() => router.back()} disabled={loading}>
          Cancel
        </Button>
      </Styled.Header>

      <Styled.Content>
        <Card>
          <Styled.Form onSubmit={handleSubmit}>
            {/* Basic Information */}
            <Styled.Section>
              <Styled.SectionTitle>Basic Information</Styled.SectionTitle>

              <Styled.InputGroup>
                <Field
                  label="Name"
                  input={
                    <InputText
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      errorMessage={errors.name}
                      isDisabled={loading}
                      placeholder="Enter your name"
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label="Email"
                  input={
                    <InputText
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      errorMessage={errors.email}
                      isDisabled={loading}
                      placeholder="Enter your email"
                    />
                  }
                />
              </Styled.InputGroup>
            </Styled.Section>

            {/* Change Password */}
            <Styled.Section>
              <Styled.SectionTitle>Change Password</Styled.SectionTitle>
              <Styled.SectionDescription>
                Leave password fields empty if you don't want to change your password
              </Styled.SectionDescription>

              <Styled.InputGroup>
                <Field
                  label="Current Password"
                  input={
                    <InputText
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, currentPassword: e.target.value })
                      }
                      errorMessage={errors.currentPassword}
                      isDisabled={loading}
                      placeholder="Enter current password"
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label="New Password"
                  input={
                    <InputText
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      errorMessage={errors.newPassword}
                      isDisabled={loading}
                      placeholder="Enter new password"
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>

              <Styled.InputGroup>
                <Field
                  label="Confirm New Password"
                  input={
                    <InputText
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      errorMessage={errors.confirmPassword}
                      isDisabled={loading}
                      placeholder="Confirm new password"
                      hasPasswordToggle
                    />
                  }
                />
              </Styled.InputGroup>
            </Styled.Section>

            {/* Error Message */}
            {errors.submit && <Styled.ErrorText>{errors.submit}</Styled.ErrorText>}

            {/* Actions */}
            <Styled.Actions>
              <Button variant="tertiary" onClick={() => router.back()} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </Styled.Actions>
          </Styled.Form>
        </Card>
      </Styled.Content>
    </Styled.Container>
  );
}
