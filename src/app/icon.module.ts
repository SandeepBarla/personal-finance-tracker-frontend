import { NgModule } from '@angular/core';
import { Edit, LucideAngularModule, Trash2 } from 'lucide-angular';

@NgModule({
  exports: [LucideAngularModule],
  imports: [LucideAngularModule.pick({ Edit, Trash2 })],
})
export class IconsModule {}
