import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Core module of the application, containing core components and dependencies.
 * 
 * @class CoreModule
 */
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
