import { NgModule } from '@angular/core';
import { TeamsRoutingModule } from './teams-routing.module';
import { CardModule } from '@ui';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsListComponent } from './components/teams-list/teams.list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Module for managing team-related functionality.
 * 
 * @class TeamsModule
 */
@NgModule({
  declarations: [TeamsListComponent],
  exports:[TeamsListComponent],
  imports: [
    TeamsRoutingModule,
    CardModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class TeamsModule { }
