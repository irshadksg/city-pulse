export const formatDate = (date: string | undefined | null, defaultText?: string): string => {
  return date ? new Date(date).toLocaleString() : defaultText || 'No date available';
};
