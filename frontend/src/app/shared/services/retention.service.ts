import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetentionData } from '../domain/retention-data.interface';
import { catchError, of, throwError } from 'rxjs';
import { env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RetentionService {
  constructor(private http: HttpClient) {}

  // Retrieve the retention data
  getRetentionData(referenceDate?: string, endDate?: string) {
    if (!referenceDate || !endDate) {
      return throwError(() => new Error('Reference date and end date are required!'));
    }

    let params = new HttpParams().set('referenceDate', referenceDate).set('endDate', endDate);

    return this.http
      .get<RetentionData[]>(`${env.baseUrl}/retention/monthly`, {
        params,
      })
      .pipe(
        catchError((error) => {
          console.error('Error getting retention data', error);
          return of([]);
        })
      );
  }
}
