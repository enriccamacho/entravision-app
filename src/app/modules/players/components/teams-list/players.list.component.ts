import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { PlayersService } from '../../services/players/players.service';
import { TeamsService } from 'src/app/modules/teams/services/teams/teams.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { ICompetition } from 'src/app/interfaces/ICompetition';



/**
 * Component for displaying the list of players.
 * 
 * @class PlayersListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-players-list',
  templateUrl: './players.list.component.html',
  styleUrl: './players.list.component.scss',
})
export class PlayersListComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  // Data array to store player data.
  public data: any[] = []; 
  // Subscription for players data.
  private playersSubscription: Subscription = new Subscription();
  // Subscription for competitions data.
  private competitionsSubscription: Subscription = new Subscription();
  // Subscription for teams data.
  private teamsSubscription: Subscription = new Subscription();
  // Subscription for getting next page of players.
  private playersGetNextPageSubscription: Subscription = new Subscription();
  // Form group for player list form.
  public form: FormGroup = new FormGroup({});
  // Array to store competitions data.
  public competitions: ICompetition[] = []
  // Array to store teams data.
  public teams: ITeam[] = []
  // Flag to indicate import status.
  public importing: boolean = false
  // Current page number.
  private page: number = 1
  // Flag to indicate if page end is reached.
  public pageEnded: boolean = false
  // MediaQueryList for media query matching.
  public mobileQuery: MediaQueryList;
  // Listener function for media query changes.
  private _mobileQueryListener: () => void;


  /**
   * Constructor for PlayersListComponent.
   * 
   * @param {FormBuilder} formBuilder FormBuilder for building forms.
   * @param {CompetitionService} competitionService CompetitionService for competition-related operations.
   * @param {PlayersService} playersService PlayersService for player-related operations.
   * @param {TeamsService} teamsService TeamsService for team-related operations.
   * @param {ChangeDetectorRef} changeDetectorRef ChangeDetectorRef for detecting changes.
   * @param {MediaMatcher} media MediaMatcher for media queries.
   * @param {MatDialog} dialog MatDialog for displaying dialog boxes.
   */
  constructor(
    public formBuilder: FormBuilder, 
    private competitionService: CompetitionService, 
    private playersService: PlayersService, 
    private teamsService: TeamsService, 
    private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher,
    public dialog: MatDialog,
    ) {
      this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
      this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of the component.
   */
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
   */
  async ngOnInit(): Promise<void> {
    try{
      this.createForm()
      await this.getCompetitions()
    }catch(err){
      console.log("Ha ocurrido un error al iniciar la página")
    }

  }

  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.playersSubscription?.unsubscribe();
    this.competitionsSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
    this.playersGetNextPageSubscription?.unsubscribe();
  }


  /**
   * Creates the form group for player list form.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required],
      team: [''] 
    });
  }

  /**
   * Updates the selected competition based on user input.
   * 
   * @param {any} event Event object.
   */
  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
    this.getTeams(event?.target?.value)
  }

  /**
   * Updates the selected team based on user input.
   * 
   * @param {any} event Event object.
   */
  public updateTeam(event:any) : void{
    this.form.get('team')?.setValue(event?.target?.value)
  }


  /**
   * Retrieves competitions data.
   */
  public async getCompetitions(): Promise<void> {
    try {
      this.competitionsSubscription = this.competitionService.getCompetitions().subscribe({
        next: (data) => {
          this.competitions = data;
        },
        error: (error) => {
          console.log("Error fetchin data:", error);
        }
      });
    } catch (error) {
      console.log("Error fetchin data:", error);
    }
  }

  /**
   * Retrieves teams data based on the selected competition.
   * 
   * @param {string} competition Competition code.
   */
  public async getTeams(competition:string): Promise<void> {
    try {
      this.teamsSubscription = this.teamsService.getTeams(competition).subscribe({
        next: (data) => {
          this.teams = data;
        },
        error: (error) => {
          console.log("Error fetchin data:", error);
        }
      });
    } catch (error) {
      console.log("Error fetchin data:", error);
    }
  }

  /**
   * Retrieves players data.
   */
  public async getData(): Promise<void> {
    try {
      this.pageEnded=false
      this.page=1
      this.playersSubscription = this.playersService.getPlayers(this.form.get('competition')?.value, this.form.get('team')?.value).subscribe({
        next: (data) => {
          if(data.length <12){
            this.pageEnded=true
          }
          this.data = data;
        },
        error: (error) => {
          console.log("Error fetchin data:", error);
        }
      });
    } catch (error) {
      console.log("Error fetchin data:", error);
    }
  }

  /**
   * Retrieves next page of players data.
   */
  public async getNextPage(): Promise<void>{
    try {
      this.page= this.page+1

      this.playersGetNextPageSubscription = this.playersService.getPlayers(this.form.get('competition')?.value, this.form.get('team')?.value, this.page).subscribe({
        next: (data) => {
          if(data.length <12){
            this.pageEnded=true
          }
          this.data = [...this.data, ...data];
        },
        error: (error) => {
          console.log("Error fetchin data:", error);
        }
      });
    } catch (error) {
      console.log("Error fetchin data:", error);
    }
  }



}
