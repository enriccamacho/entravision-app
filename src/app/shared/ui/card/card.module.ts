import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from './team-card/team.card.component';
import { MatCardModule } from '@angular/material/card';
import { PlayerCardComponent } from './player-card/player.card.component';
import { CardDetailComponent } from './card-detail/card.detail.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * Module for managing card-related functionality.
 * 
 * @class CardModule
 */
@NgModule({
  declarations: [TeamCardComponent, PlayerCardComponent, CardDetailComponent],
  exports: [TeamCardComponent, PlayerCardComponent, CardDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class CardModule { }
