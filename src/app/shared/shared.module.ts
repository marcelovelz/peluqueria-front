import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [CommonModule],
  exports: [NavigationMenuComponent],
})
export class SharedModule {}
