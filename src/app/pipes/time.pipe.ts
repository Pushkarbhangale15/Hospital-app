

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return ''; // or some other default value
    }
    const time = value.split(':');
    const hours = parseInt(time[0]);
    const minutes = time[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  }
}
