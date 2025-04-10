import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { loginModel } from '../models/loginModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AppConstants } from '../constants/AppConstants';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  userData = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      if (token) {
        this.decodeUserData(token);
      }
    }
  }

  login(model: loginModel): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/api/Authentication/login`,
      model
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(AppConstants.TOKEN_KEY);
      this.userData.next(null);
      this._router.navigate(['/auth/login']);
    }
  }

  decodeUserData(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      this.userData.next(decodedToken);
    } catch (error) {
      console.error('Failed to decode token', error);
      this.userData.next(null);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(AppConstants.TOKEN_KEY);
    }
    return null;
  }

  setToken(value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(AppConstants.TOKEN_KEY, value);
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expirationTime;
  }

  checkToken() {
    if (this.isTokenExpired()) {
      this.logout();
    }
  }

  getPermissions(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.permissions || []; // Adjust based on your token structure
  }

  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
}
