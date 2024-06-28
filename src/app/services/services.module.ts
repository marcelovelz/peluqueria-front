import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListComponent } from './services-list/services-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ServicesListComponent],
  imports: [CommonModule, ServicesRoutingModule, FormsModule, SharedModule],
})
export class ServicesModule {}
