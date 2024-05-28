import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ITeam } from 'src/app/interfaces/ITeam';

@Component({
  selector: 'app-team-card',
  templateUrl: './team.card.component.html',
  styleUrl: './team.card.component.scss'
})
export class TeamCardComponent {
  @Input() item: ITeam | undefined;
  @Output() onOpenCard = new EventEmitter<void>(); 



  openCard(item: any): void {
    this.onOpenCard.emit(item);
  }
}
