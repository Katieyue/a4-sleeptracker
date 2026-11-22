import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPicker,
    IonPickerColumn,
    IonPickerColumnOption,
  ],
})
export class DateTimePickerComponent implements OnInit {
  @Input() date: Date = new Date();
  @Output() dateChange = new EventEmitter<Date>();

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: number[] = [];
  years: number[] = [];
  hours: number[] = [];
  minutes: number[] = [];

  month = this.date.getMonth();
  day = this.date.getDate();
  year = this.date.getFullYear();
  hour = this.date.getHours();
  minute = this.date.getMinutes();

  // selected valus

  ngOnChanges() {
    const currDate = this.date ?? new Date();
    this.month = currDate.getMonth();
    this.day = currDate.getDate();
    this.year = currDate.getFullYear();
    this.hour = currDate.getHours();
    this.minute = currDate.getMinutes();
  }

  constructor() {
    for (var i = 1; i <= 31; i++) this.days.push(i);
    const currYear = new Date().getFullYear();
    for (var i = 2000; i <= currYear; i++) this.years.push(i);
    for (var i = 0; i <= 23; i++) this.hours.push(i);
    for (var i = 0; i <= 59; i++) this.minutes.push(i);
  }

  ngOnInit() {}

  dateSet() {
    this.dateChange.emit(
      new Date(this.year, this.month, this.day, this.hour, this.minute),
    );
  }
}
