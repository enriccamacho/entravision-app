import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITeam } from 'src/app/interfaces/ITeam';

/**
 * Component for displaying information about a team in a card.
 * 
 * @class TeamCardComponent
 */
@Component({
  selector: 'app-team-card',
  templateUrl: './team.card.component.html',
  styleUrl: './team.card.component.scss'
})
export class TeamCardComponent {
  //The team item to display details for.
  @Input() item: ITeam | undefined;
  //Event emitter for opening the card.
  @Output() onOpenCard = new EventEmitter<void>(); 


/**
 * Emits an event to open the card detail component.
 */
  openCard(item: any): void {
    this.onOpenCard.emit(item);
  }
}
