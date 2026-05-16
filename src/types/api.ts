export type ApiMeta = {
  requestId?: string;
  timestamp?: string;
  path?: string;
  method?: string;
  [key: string]: unknown;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: ApiMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
  meta?: ApiMeta;
};
