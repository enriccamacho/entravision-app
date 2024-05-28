import { Component, EventEmitter, Inject, OnDestroy, OnInit, Optional, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { ITeam } from 'src/app/interfaces/ITeam';
import { TeamsService } from 'src/app/modules/teams/services/teams/teams.service';

/**
 * Component for displaying detailed information about a team in a dialog.
 * 
 * @class CardDetailComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-card-detail',
  templateUrl: './card.detail.component.html',
  styleUrl: './card.detail.component.scss'
})
export class CardDetailComponent implements OnInit, OnDestroy{
  //The team item to display details for.
  item: ITeam | undefined; 
  //Event emitter for opening the card.
  @Output() onOpenCard = new EventEmitter<void>();
  //Array of players in the team.
  public players: IPlayer[] = []
  //Array of goalkeepers in the team.
  public goalkeepers: IPlayer[] = []
  //Array of defenders in the team.
  public defences: IPlayer[] = []
  //Array of midfielders in the team.
  public midfields: IPlayer[] = []
  //Array of forwards in the team.
  public offences: IPlayer[] = []
  //Subscription for fetching player data.
  private playersSubscription: Subscription = new Subscription();

  /**
   * Constructor of the CardDetailComponent.
   * 
   * @param data The data containing the team item.
   * @param dialogRef Reference to the dialog.
   * @param teamsService Service for fetching team data.
   */
  constructor(
    public dialogRef: MatDialogRef<CardDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) data:{item:ITeam}, 
    private teamsService: TeamsService) {
      this.item= data?.item
}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * 
   * @returns {Promise<void>} A Promise that resolves after initialization.
   */
  async ngOnInit(): Promise<void> {
    try {
      if (this.item) {
        this.playersSubscription = this.teamsService.getPlayers(this.item.tla).subscribe({
          next: (data) => {
            this.players = data;
            this.setPlayersCategory();
          },
          error: (error) => {
            console.log("Error fetching player data:", error);
          }
        });
      }
    } catch (err) {
      console.log("An error occurred during initialization:", err);
    }
  }

  /**
   * Sets the category of players based on their position.
   */
  setPlayersCategory() {
    this.players.forEach(player => {
        switch (player.section) {
            case 'Goalkeeper':
                this.goalkeepers.push(player);
                break;
            case 'Defence':
                this.defences.push(player);
                break;
            case 'Midfield':
                this.midfields.push(player);
                break;
            case 'Offence':
                this.offences.push(player);
                break;
            default:
                console.warn(`Unknown section: ${player.section}`);
                break;
        }
    });
}

  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.playersSubscription?.unsubscribe();
  }

  /**
   * Closes the dialog when clicking outside the dialog content.
   * 
   * @param {MouseEvent} event The mouse event.
   */
  closeDialog(event: MouseEvent): void {
    if (event.target === event.currentTarget) { 
      this.dialogRef.close(); 
    }
  }

  /**
   * Stops the event propagation.
   * 
   * @param {MouseEvent} event The mouse event.
   */
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation(); 
  }

  /**
   * Opens the team's website in a new tab.
   */
  openWebsite() {
    window.open(this.item?.website, "_blank");
    }

}
