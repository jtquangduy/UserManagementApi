import { Injectable } from '@angular/core';  
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';  
import { catchError } from 'rxjs/operators';  
  
export interface User {  
  id: number;  
  firstName: string;  
  lastName: string;  
  email: string;  
  phoneNumber?: string;  
  zipCode?: string;  
}  
  
@Injectable({  
  providedIn: 'root'  
})  
export class UserService {  
  private apiUrl = 'https://localhost:5001/api/users';  
  
  constructor(private http: HttpClient) { }  
  
  getUsers(): Observable<User[]> {  
    return this.http.get<User[]>(this.apiUrl).pipe(catchError(this.handleError));  
  }  
  
  getUser(id: number): Observable<User> {  
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));  
  }  
  
  createUser(user: Partial<User>): Observable<User> {  
    return this.http.post<User>(this.apiUrl, user).pipe(catchError(this.handleError));  
  }  
  
  updateUser(id: number, user: Partial<User>): Observable<void> {  
    return this.http.put<void>(`${this.apiUrl}/${id}`, user).pipe(catchError(this.handleError));  
  }  
  
  deleteUser(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));  
  }  
  
  private handleError(error: HttpErrorResponse) {  
    // Handle error here, log or show user-friendly message  
    console.error('API Error:', error);  
    return throwError(() => new Error('An error occurred while communicating with the server.'));  
  }  
}  