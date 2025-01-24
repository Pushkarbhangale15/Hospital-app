import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from '../../pipes/time.pipe';

@NgModule({
  declarations: [TimePipe],
  imports: [CommonModule],
  exports: [TimePipe] // Exporting TimePipe to make it available in other modules
})
export class SharedModule {}
