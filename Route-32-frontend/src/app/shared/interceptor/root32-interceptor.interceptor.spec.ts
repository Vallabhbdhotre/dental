import { TestBed } from '@angular/core/testing';

import { Root32InterceptorInterceptor } from './root32-interceptor.interceptor';

describe('Root32InterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Root32InterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Root32InterceptorInterceptor = TestBed.inject(Root32InterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
