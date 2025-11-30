/**
 * Auth Divider Component
 * Wrapper around @eventure/eventurex AuthDivider with i18n support
 */
import { AuthDivider as EventurexAuthDivider } from '@eventure/eventurex';
import i18n from '@/i18n';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider = ({ text }: AuthDividerProps) => {
  const dividerText = text || i18n.t('auth.divider.or');
  return <EventurexAuthDivider text={dividerText} />;
};
