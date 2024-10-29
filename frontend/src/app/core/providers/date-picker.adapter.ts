import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
  // Override the format method to show YYYY-MM format
  override format(date: Date, displayFormat: Object): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }

  // Override the parse method to accept input in the form of YYYY-MM
  override parse(value: any): Date | null {
    if (typeof value === 'string' && /^\d{4}-\d{2}$/.test(value)) {
      const [year, month] = value.split('-');
      return new Date(+year, +month - 1);
    }
    return super.parse(value);
  }
}
