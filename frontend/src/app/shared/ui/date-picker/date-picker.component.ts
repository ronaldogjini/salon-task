import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() title: string = '';
  @Input() value: Date | null = null;
  @Input() min: Date | null = null;
  @Input() max: Date | null = null;

  @Output() change = new EventEmitter<Date>();

  refDateForm = new FormControl();

  // Set the initial value of the date picker
  ngOnInit() {
    if (this.value) {
      this.refDateForm.setValue(this.value);
    }
  }

  // Set the date emitted from the date picker component
  setDateAndClose(normalizedMonth: Date, datepicker: any) {
    this.change.emit(normalizedMonth);
    this.refDateForm.setValue(normalizedMonth);
    datepicker.close();
  }
}
