import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsListComponent } from './appointments-list/appointments-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AppointmentsListComponent],
  imports: [CommonModule, AppointmentsRoutingModule, FormsModule, SharedModule],
})
export class AppointmentsModule {}
