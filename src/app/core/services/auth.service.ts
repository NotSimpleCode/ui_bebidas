import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  // usa el localstorage para almacenar un token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // verificamos si hay un token en el localstorage para obtenerlo
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // cuando cierra sesion borramos el token para que no quede registro
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
