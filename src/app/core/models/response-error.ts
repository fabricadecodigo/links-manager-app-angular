import { HttpErrorResponse } from '@angular/common/http';
export class ResponseError {
  statusCode = -1;
  error = '';
  protected errorId = '';
  private errorMessage = '';

  constructor(responseError: HttpErrorResponse | Error) {
    if (responseError instanceof HttpErrorResponse) {
      this.processHttpError(responseError);
    } else {
      this.processError(responseError);
    }
    return this;
  }

  private processError(responseError: Error): void {
    this.statusCode = -1;
    this.error = 'FrontEnd Error';
    this.errorId = '';
    this.errorMessage = responseError.message;
  }

  private processHttpError(responseError: HttpErrorResponse): void {
    const apiError: IApiError = responseError.error;
    this.statusCode = apiError.statusCode;
    this.error = apiError.error;
    const [firstError] = apiError.message;
    const [firstMessage] = firstError.messages;
    this.errorId = firstMessage.id;
    this.errorMessage = firstMessage.message;
  }

  getMessage(): string {
    return this.errorMessage;
  }
}

export interface IApiError {
  statusCode: number;
  error: string;
  message: IApiErrorMessageList[];
}

export interface IApiErrorMessageList {
  messages: IApiErrorMessageListItem[];
}

export interface IApiErrorMessageListItem {
  id: string;
  message: string;
}
