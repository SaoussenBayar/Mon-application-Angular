import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'http://localhost:8000/api/login';  // Symfony login API endpoint
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // Login method that requests a token from Symfony
  apiLogin(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body= { email, password };
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  // Store JWT token in local storage
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve JWT token from local storage
  getAuthToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  // Check if user is authenticated by verifying token existence
  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  // Remove JWT token from local storage on logout
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Add Authorization header with token for protected requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
