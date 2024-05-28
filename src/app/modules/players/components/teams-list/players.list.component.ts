import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/event/competition.service';
import { PlayersService } from '../../services/event/players.service';
import { TeamsService } from 'src/app/modules/teams/services/event/teams.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { ICompetition } from 'src/app/interfaces/ICompetition';


@Component({
  selector: 'app-players-list',
  templateUrl: './players.list.component.html',
  styleUrl: './players.list.component.scss',
})
export class PlayersListComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  public data: any[] = []; 
  private playersSubscription: Subscription = new Subscription();
  private competitionsSubscription: Subscription = new Subscription();
  private teamsSubscription: Subscription = new Subscription();
  private playersGetNextPageSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  competitions: ICompetition[] = []
  teams: ITeam[] = []
  importing: boolean = false
  page: number = 1
  pageEnded: boolean = false
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

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

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }


  async ngOnInit(): Promise<void> {
    try{
      this.createForm()
      await this.getCompetitions()
    }catch(err){
      console.log("Ha ocurrido un error al iniciar la página")
    }

  }

  ngOnDestroy(): void {
    this.playersSubscription?.unsubscribe();
    this.competitionsSubscription?.unsubscribe();
    this.teamsSubscription?.unsubscribe();
    this.playersGetNextPageSubscription?.unsubscribe();
  }


  
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required],
      team: [''] 
    });
  }

  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
    this.getTeams(event?.target?.value)
  }

  public updateTeam(event:any) : void{
    this.form.get('team')?.setValue(event?.target?.value)
  }


  public async getCompetitions(): Promise<void> {
    try {
      this.competitionsSubscription = this.competitionService.getCompetitions().subscribe({
        next: (data) => {
          this.competitions = data;
        },
        error: (error) => {
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }


  public async getTeams(competition:string): Promise<void> {
    try {
      this.teamsSubscription = this.teamsService.getTeams(competition).subscribe({
        next: (data) => {
          this.teams = data;
        },
        error: (error) => {
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }


  public async getData(): Promise<void> {
    try {
      this.pageEnded=false
      this.playersSubscription = this.playersService.getPlayers(this.form.get('competition')?.value, this.form.get('team')?.value).subscribe({
        next: (data) => {
          if(data.length <12){
            this.pageEnded=true
          }
          this.data = data;
        },
        error: (error) => {
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }

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
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }



}
