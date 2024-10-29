import { Component, OnInit } from '@angular/core';
import { RetentionService } from '../../shared/services/retention.service';
import { RetentionData } from '../../shared/domain/retention-data.interface';
import { DateService } from '../../shared/services/date.service';
import { TableRetentionData } from '../../shared/domain/table-retention-data.interface';

@Component({
  selector: 'app-retention-dashboard',
  templateUrl: './retention-dashboard.component.html',
  styleUrl: './retention-dashboard.component.scss',
})
export class RetentionDashboardComponent implements OnInit {
  retentionData: RetentionData[] = [];
  loading = false;
  error: string | null = null;
  transformedData: TableRetentionData[] = [];

  displayedColumns: string[] = [];

  referenceDate: Date | null = null;
  endDate: Date | null = null;

  referenceDateStr!: string;
  endDateStr!: string;

  private readonly STATIC_COLUMNS = ['employee_id', 'employee_name', 'reference_clients'] as const;

  constructor(private retentionService: RetentionService) {}

  ngOnInit() {
    this.initializeDates();
    this.loadRetentionData();
  }

  // Initialize the reference date and end date
  initializeDates() {
    const now = new Date();
    this.referenceDate = DateService.setDateMonthBefore(now, 2);
    this.referenceDateStr = DateService.formatToMonthDate(this.referenceDate);

    this.endDate = new Date(now.getFullYear(), now.getMonth(), 1);
    this.endDateStr = DateService.formatToMonthDate(this.endDate);
  }

  // Calculate the max date allowed for the reference date
  calculateRefDateMax() {
    if (this.endDate) {
      return DateService.setDateMonthBefore(this.endDate, 1);
    }
    return null;
  }

  // Calculate the min date allowed for the end date
  calculateEndDateMin() {
    if (this.referenceDate) {
      return DateService.setDateMonthAfter(this.referenceDate, 1);
    }
    return null;
  }

  // Update the reference date and set the string to YYYY-MM format
  updateReferenceDate(date: Date) {
    this.referenceDate = new Date(date);
    this.referenceDateStr = DateService.formatToMonthDate(this.referenceDate);
    this.loadRetentionData();
  }

  // Update the end date and set the string to YYYY-MM format
  updateEndDate(date: Date) {
    if (this.referenceDate && date < this.referenceDate) {
      this.error = 'End date cannot be before the reference date.';
      this.endDate = null;
      return;
    } else {
      this.error = null;
    }

    this.endDate = new Date(date);
    this.endDateStr = DateService.formatToMonthDate(this.endDate);
    this.loadRetentionData();
  }

  //Load the retention data
  loadRetentionData() {
    this.loading = true;
    this.error = null;

    this.retentionService.getRetentionData(this.referenceDateStr, this.endDateStr).subscribe({
      next: (data) => {
        this.retentionData = data;
        this.loading = false;
        this.transformData();
      },
      error: (error) => {
        this.error = 'Failed to load retention data';
        this.loading = false;
      },
    });
  }

  /**
   * Transforms the input data into table format
   */
  private transformData(): void {
    const { transformedData, monthColumns } = this.processRetentionData(this.retentionData);
    this.transformedData = [...transformedData];
    this.displayedColumns = [...this.STATIC_COLUMNS, ...monthColumns];
  }

  /**
   * Process retention data and returns transformed data and month columns
   */
  private processRetentionData(data: RetentionData[]): {
    transformedData: TableRetentionData[];
    monthColumns: string[];
  } {
    const dataMap = new Map<number, TableRetentionData>();
    const monthsSet = new Set<string>();

    data.forEach((record) => {
      this.processRetentionRecord(record, dataMap, monthsSet);
    });

    return {
      transformedData: Array.from(dataMap.values()),
      monthColumns: Array.from(monthsSet),
    };
  }

  /**
   * Processes a single retention record
   */
  private processRetentionRecord(
    record: RetentionData,
    dataMap: Map<number, TableRetentionData>,
    monthsSet: Set<string>
  ): void {
    if (!dataMap.has(record.employee_id)) {
      dataMap.set(record.employee_id, this.createEmployeeRecord(record));
    }

    const employeeRow = dataMap.get(record.employee_id)!;
    employeeRow[record.retention_month] = this.formatRetentionValue(
      record.retention_percentage,
      record.retained_clients
    );

    monthsSet.add(record.retention_month);
  }

  /**
   * Formats retention value for display
   */
  private formatRetentionValue(percentage: number, retainedClients: number): string {
    return `${percentage.toFixed(1)}% (${retainedClients} clients)`;
  }

  /**
   * Creates a new employee record
   */
  private createEmployeeRecord(data: RetentionData): TableRetentionData {
    return {
      employee_id: data.employee_id,
      employee_name: data.employee_name,
      reference_date: data.reference_date,
      reference_clients: data.reference_clients,
    };
  }
}
