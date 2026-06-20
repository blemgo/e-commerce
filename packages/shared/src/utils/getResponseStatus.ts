type HttpErrorLike = {
  response?: {
    status?: number;
  };
};

export const getResponseStatus = (error: unknown): number | undefined => {
  return (error as HttpErrorLike).response?.status;
};

export const isResponseStatus = (error: unknown, status: number): boolean => {
  return getResponseStatus(error) === status;
};

export const isUnauthorizedError = (error: unknown): boolean => {
  return isResponseStatus(error, 401);
};
