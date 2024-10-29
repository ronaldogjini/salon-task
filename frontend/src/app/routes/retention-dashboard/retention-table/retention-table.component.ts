import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableRetentionData } from '../../../shared/domain/table-retention-data.interface';

@Component({
  selector: 'app-retention-table',
  templateUrl: './retention-table.component.html',
  styleUrls: ['./retention-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetentionTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: TableRetentionData[] = [];
  @Input() columns: string[] = [];

  dataSource = new MatTableDataSource<TableRetentionData>();

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit(): void {
    this.setupTableFeatures();
  }

  /**
   * Sets up table features like sorting and pagination
   */
  private setupTableFeatures(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Retrieve the reference month
  getReferenceMonth(): string {
    if (this.data.length > 0) {
      const referenceDate = this.data[0].reference_date;
      return referenceDate.substring(0, 7);
    }
    return '';
  }

  // Format the header to Month +{count} and the month
  formatMonthHeader(index: number, month: string): string {
    return `Month +${index + 1} (${month})`;
  }

  // Filter the table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
