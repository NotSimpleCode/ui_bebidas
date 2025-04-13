import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '..//services/auth.service'; 

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = new AuthService(); 
  const token = authService.getToken(); 

  // Si existe el token, lo usa para realizar peticiones
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  };

  return next(req);
};
