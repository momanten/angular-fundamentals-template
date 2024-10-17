import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from './services/session-storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: 'Window', useValue: window }, SessionStorageService],
})
export class AuthModule {}
