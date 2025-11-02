import { USER_ROLES } from '@/lib/constants';

export type RoleOption = {
  value: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  label: string;
};

export type RoleBadgeColors = {
  bg: string;
  color: string;
};

/**
 * Creates role options array with translated labels
 * @param t Translation function from useTranslations('iam')
 * @returns Array of role options for Select component
 */
export const createRoleOptions = (t: (key: string) => string): RoleOption[] => [
  { value: USER_ROLES.ADMIN, label: t('roles.admin') },
  { value: USER_ROLES.MANAGER, label: t('roles.manager') },
  { value: USER_ROLES.EMPLOYEE, label: t('roles.employee') },
];

/**
 * Gets badge colors for a specific role
 * @param role User role (ADMIN, MANAGER, EMPLOYEE)
 * @returns Object with background and text colors
 */
export const getRoleBadgeColor = (role: string): RoleBadgeColors => {
  switch (role) {
    case 'ADMIN':
      return { bg: '#fee2e2', color: '#dc2626' }; // Red
    case 'MANAGER':
      return { bg: '#dbeafe', color: '#2563eb' }; // Blue
    case 'EMPLOYEE':
      return { bg: '#d1fae5', color: '#059669' }; // Green
    default:
      return { bg: '#f3f4f6', color: '#6b7280' }; // Gray
  }
};
