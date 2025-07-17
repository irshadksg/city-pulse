export const generateErrorMessage = (error: any): string => {
  if (!error) return 'Something went wrong';

  if (typeof error === 'string') return error;

  if (error instanceof Error) return error.message;

  if (typeof error === 'object') {
    if (error.message) return error.message;
    if (Object.keys(error).length > 0) return error[Object.keys(error)[0]];
  }

  return 'Something went wrong';
};
