// src/app/core/services/auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../utils/api.utils';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = apiUrl('/api/auth');
  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }
}
