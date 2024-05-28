import { Component, Input } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';

@Component({
  selector: 'app-player-card',
  templateUrl: './player.card.component.html',
  styleUrl: './player.card.component.scss'
})
export class PlayerCardComponent {
  @Input() item: IPlayer | undefined;

}
