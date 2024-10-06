import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NoCacheHeadersInterceptor } from './no-cache-headers.interceptor';

// Mock HTTP handler that simulates HTTP requests
class MockHttpHandler implements HttpHandler {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // Simulate returning the modified request as an HttpResponse
    return of(new HttpResponse({ status: 200, headers: req.headers }));
  }
}

describe('NoCacheHeadersInterceptor', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NoCacheHeadersInterceptor,
          multi: true,
        },
        {
          provide: HttpHandler,
          useClass: MockHttpHandler
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
  });

  it('should add no-cache headers to HTTP requests', () => {
    const request = new HttpRequest('GET', '/test-url');

    const interceptor = new NoCacheHeadersInterceptor();
    interceptor.intercept(request, TestBed.inject(HttpHandler)).subscribe((event) => {
      if (event instanceof HttpResponse) {
        expect(event.headers.has('Cache-Control')).toBe(true, 'Missing Cache-Control header');
        expect(event.headers.get('Cache-Control')).toBe('no-cache', 'Cache-Control should be no-cache');
        expect(event.headers.has('Pragma')).toBe(true, 'Missing Pragma header');
        expect(event.headers.get('Pragma')).toBe('no-cache', 'Pragma should be no-cache');
      }
    });
  });
});
