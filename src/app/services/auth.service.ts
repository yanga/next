import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  isLogedIn (): boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  login (username: string, password: string): Observable<any> {
    const body = { username, password};
    const url = `http://localhost:3000/login`;
    return this.http.post<any>(url, body);
  }
}
