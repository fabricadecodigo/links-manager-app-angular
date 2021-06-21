import { HttpErrorResponse } from '@angular/common/http';
export class ResponseError {
  statusCode: number;
  error: string;
  private errorId: string;
  private errorMessage: string;

  constructor(responseError: HttpErrorResponse) {
    const apiError: IApiError = responseError.error;
    this.statusCode = apiError.statusCode;
    this.error = apiError.error;
    const [firstError] = apiError.message;
    const [firstMessage] = firstError.messages;
    this.errorId = firstMessage.id;
    this.errorMessage = firstMessage.message;
  }

  getMessage(): string {
    if (this.errorId === 'Auth.form.error.invalid') {
      return 'Usuário ou senha invalido(s)';
    }
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
