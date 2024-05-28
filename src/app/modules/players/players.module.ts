import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { CardModule } from '@ui';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayersListComponent } from './components/teams-list/players.list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

/**
 * Module for managing player-related functionality.
 * 
 * @class PlayersModule
 */
@NgModule({
  declarations: [PlayersListComponent],
  exports:[PlayersListComponent],
  imports: [
    PlayersRoutingModule,
    CardModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class PlayersModule { }
