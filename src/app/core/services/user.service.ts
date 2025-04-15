import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../utils/api.utils';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = apiUrl('/api/users');

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(this.baseUrl, data);
  }
}
