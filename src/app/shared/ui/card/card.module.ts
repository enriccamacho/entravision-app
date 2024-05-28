import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from './team-card/team.card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared.module';
import { PlayerCardComponent } from './player-card/player.card.component';
import { CardDetailComponent } from './card-detail/card.detail.component';



@NgModule({
  declarations: [TeamCardComponent, PlayerCardComponent, CardDetailComponent],
  exports: [TeamCardComponent, PlayerCardComponent, CardDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    SharedModule
  ]
})
export class CardModule { }
