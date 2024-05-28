import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { ITeam } from 'src/app/interfaces/ITeam';
import { TeamsService } from 'src/app/modules/teams/services/event/teams.service';


@Component({
  selector: 'app-card-detail',
  templateUrl: './card.detail.component.html',
  styleUrl: './card.detail.component.scss'
})
export class CardDetailComponent implements OnInit, OnDestroy{
  item: ITeam | undefined; 
  @Output() onOpenCard = new EventEmitter<void>();
  players: IPlayer[] = []
  goalkeepers: IPlayer[] = []
  defences: IPlayer[] = []
  midfields: IPlayer[] = []
  offences: IPlayer[] = []
  detailsVisible = false;
  private playersSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) data:{item:ITeam}
    , private dialogRef: MatDialogRef<CardDetailComponent>,
    private teamsService: TeamsService) {
      this.item= data?.item
}

  async ngOnInit(): Promise<void> {
    try{
      if(this.item){
      this.playersSubscription = this.teamsService.getPlayers(this.item.tla).subscribe({
        next: (data) => {
          this.players = data;
          this.setPlayersCategory()
        },
        error: (error) => {
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    }
    }catch(err){
      throw err
    }

  }

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


  ngOnDestroy(): void {
    this.playersSubscription?.unsubscribe();
  }

  closeDialog(event: MouseEvent): void {
    if (event.target === event.currentTarget) { 
      this.dialogRef.close(); 
    }
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation(); 
  }

  toggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }

  openWebsite() {
    window.open(this.item?.website, "_blank");
    }

}
