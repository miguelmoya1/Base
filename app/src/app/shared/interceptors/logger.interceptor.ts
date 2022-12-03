import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { catchError, tap } from 'rxjs';

type Request = HttpRequest<{ query: string; operationName: string; variables: { [key: string]: string }[] }>;

@Injectable({
  providedIn: 'root',
})
export class LoggerInterceptor implements HttpInterceptor {
  intercept(request: Request, next: HttpHandler) {
    return next.handle(request).pipe(
      tap(async (result) => {
        if (isDevMode()) {
          if (result instanceof HttpResponse) {
            const bodyResult = result.body;

            if (bodyResult) {
              if (request.url.includes('/graphql')) {
                const { query, operationName, variables } = request.body || {};
                this.log(
                  query?.includes('mutation') ? 'MUTATION' : 'QUERY',
                  operationName,
                  variables,
                  bodyResult?.data?.data,
                );
              } else {
                this.log(request.method, request.url, request.body, bodyResult);
              }
            }
          }
        }
      }),

      catchError((error) => {
        if (isDevMode()) {
          this.log(request.method, request.url, request.body, error.error, true);
        }

        throw error;
      }),
    );
  }

  private log(type: string, name?: string, variables?: any, data?: any, isError = false) {
    const logToUse = isError ? console.error : console.log;
    console.groupCollapsed(`[ %c${type}`, 'color: green;', `]: ${name}`);
    if (variables && Object.keys(variables).length) {
      logToUse('%cREQUEST', 'color: yellow;', variables || '');
    }
    logToUse('%cRESPONSE', 'color: lightBlue;', data || '');
    console.groupEnd();
  }
}
