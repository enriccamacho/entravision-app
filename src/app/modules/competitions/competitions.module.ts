import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionsRoutingModule } from './competitions-routing.module';
import { CardModule } from '@ui';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CompetitionsImportComponent } from './components/competitions-import/competitions.import.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Module for managing competitions-related features and components.
 * 
 * @class CompetitionsModule
 */
@NgModule({
  declarations: [CompetitionsImportComponent],
  exports:[CompetitionsImportComponent],
  imports: [
    CompetitionsRoutingModule,
    CardModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class CompetitionsModule { }
