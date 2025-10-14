import { format, parseISO } from 'date-fns';

export const formatDate = (date: string) => {
  if (!date) return '';
  return format(parseISO(date), 'MMMM d, yyyy');
};
