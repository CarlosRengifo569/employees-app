import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {
  private urlEndPoint: string = 'http://localhost:8080/api/employees';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getEmployees(page: number): Observable<any> {
    return this.http.get<any>(this.urlEndPoint + '/page/' + page).pipe(
      map((response: any) => {
          (response.content as Employee[]).map(employee => {
          return employee;
        });
        return response;
      })
    );
  }

  create(employee: Employee) : Observable<Employee> {
    return this.http.post(this.urlEndPoint, employee, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.employee as Employee),
      catchError(e => {
        if(e.status==400) {
          return throwError(() => e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlEndPoint);
  }
}

