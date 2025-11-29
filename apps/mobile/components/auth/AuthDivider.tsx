/**
 * Auth Divider Component
 * Wrapper around @tavia/taviax AuthDivider with i18n support
 */
import { AuthDivider as TaviaxAuthDivider } from '@tavia/taviax';
import i18n from '@/i18n';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider = ({ text }: AuthDividerProps) => {
  const dividerText = text || i18n.t('auth.divider.or');
  return <TaviaxAuthDivider text={dividerText} />;
};
