import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// Agrega el header Authorization: Bearer <token> a toda request saliente,
// si hay una sesión activa. El backend lo espera vía ExtractJwt.fromAuthHeaderAsBearerToken().
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (!token) {
    return next(req);
  }

  const reqConToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(reqConToken);
};
