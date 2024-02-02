export class AppError {
  id: string; //       a unique identifier for this particular occurrence of the problem.//   the HTTP status code applicable to this problem, expressed as a string value.
  code?: string; //     an application-specific error code, expressed as a string value.// to decide which how to display error
  title: string;

  constructor(title: string) {
    this.id = Math.random().toString(36).substring(7);
    this.title = title.toUpperCase();
  }
}

export class ResponseWrapper<T> {
  success: boolean;
  data?: T;
  errors?: Array<AppError>;
  meta?: Record<string, unknown>;

  constructor() {
    this.success = false;
    this.meta = {};
  }

  setData(data: T) {
    this.data = data;
    this.success = true;
  }

  setError(error: AppError) {
    this.errors = [error];
    this.success = false;
  }
}
