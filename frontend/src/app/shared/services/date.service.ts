import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  /**
   * Return a date object x months in the past
   * @param currentDate
   * @param noMonths
   */
  static setDateMonthBefore(currentDate: Date, noMonths: number): Date {
    let dateBefore: Date = new Date();
    dateBefore.setFullYear(currentDate.getFullYear(), currentDate.getMonth() - noMonths, 1);
    return dateBefore;
  }

  /**
   * Return a date object x months in the future
   * @param currentDate
   * @param noMonths
   */
  static setDateMonthAfter(currentDate: Date, noMonths: number): Date {
    let dateAfter: Date = new Date();
    dateAfter.setFullYear(currentDate.getFullYear(), currentDate.getMonth() + noMonths, 1);
    return dateAfter;
  }

  /**
   * Return a string date in format YYYY-MM
   * @param date
   */
  static formatToMonthDate(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  }
}
