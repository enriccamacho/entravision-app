import { Component, Input } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';

/**
 * Component for displaying information about a player in a card.
 * 
 * @class PlayerCardComponent
 */
@Component({
  selector: 'app-player-card',
  templateUrl: './player.card.component.html',
  styleUrl: './player.card.component.scss'
})
export class PlayerCardComponent {
  //The player item to display details for.
  @Input() item: IPlayer | undefined;

}
