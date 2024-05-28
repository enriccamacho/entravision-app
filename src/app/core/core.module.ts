import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from '@ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  exports:[
    HomeComponent
  ]
})
export class CoreModule { }
