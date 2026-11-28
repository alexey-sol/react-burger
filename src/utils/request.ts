const defaultRequestOptions: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

type ErrorResponse = {
  message?: string;
  [key: string]: unknown;
};

export class ApiError extends Error {
  public readonly status: number;
  public readonly data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const request = async <R>(
  url: string,
  extraOptions: RequestInit = {}
): Promise<R> => {
  const options: RequestInit = {
    ...defaultRequestOptions,
    ...extraOptions,
    headers: {
      ...defaultRequestOptions.headers,
      ...extraOptions.headers,
    },
  };

  const response = await fetch(url, options);
  const data = (await response.json().catch(() => null)) as R;

  if (!response.ok) {
    const errorData = (data as ErrorResponse) ?? {};
    const message = errorData?.message ?? `Ошибка запроса: ${response.status}`;
    throw new ApiError(response.status, message, data);
  }

  return data;
};
