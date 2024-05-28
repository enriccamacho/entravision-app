import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { TeamsService } from '../../services/teams/teams.service';
import { CardDetailComponent } from '@ui/card/card-detail/card.detail.component';
import { ICompetition } from 'src/app/interfaces/ICompetition';
import { ITeam } from 'src/app/interfaces/ITeam';

/**
 * Component for displaying the list of teams.
 * 
 * 
 * @class TeamsListComponent
 */
@Component({
  selector: 'app-teams-list',
  templateUrl: './teams.list.component.html',
  styleUrl: './teams.list.component.scss',
})
export class TeamsListComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  // Array to store data fetched from teams.
  public data: any[] = []; 
  // Subscription for teams data.
  private teamsSubscription: Subscription = new Subscription();
  // Subscription for competitions data.
  private competitionsSubscription: Subscription = new Subscription();
  // Subscription for fetching next page of teams.
  private teamsGetNextPageSubscription: Subscription = new Subscription();
  // FormGroup for managing form data.
  public form: FormGroup = new FormGroup({});
  // Array to store competitions data.
  public competitions: ICompetition[] = []
  // Flag to indicate if data is being imported.
  public importing: boolean = false
  // Current page number.
  private page: number = 1
  // Flag to indicate if all pages have been fetched.
  public pageEnded: boolean = false
  // MediaQueryList for responsive design.
  public mobileQuery: MediaQueryList;
  // Listener function for media query changes.
  private _mobileQueryListener: () => void;

  /**
   * Constructor for TeamsListComponent.
   * 
   * @constructor
   * @param {FormBuilder} formBuilder FormBuilder for creating form controls.
   * @param {CompetitionService} competitionService CompetitionService for fetching competitions data.
   * @param {TeamsService} teamsService TeamsService for fetching teams data.
   * @param {ChangeDetectorRef} changeDetectorRef ChangeDetectorRef for detecting changes.
   * @param {MediaMatcher} media MediaMatcher for media queries.
   * @param {MatDialog} dialog MatDialog for opening dialog components.
   */
  constructor(
    public formBuilder: FormBuilder, 
    private competitionService: CompetitionService, 
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
   * Lifecycle hook that is called after Angular has fully initialized a component's view.
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
    this.teamsSubscription?.unsubscribe();
    this.competitionsSubscription?.unsubscribe();
    this.teamsGetNextPageSubscription?.unsubscribe();
  }


  /**
   * Creates the form controls using FormBuilder.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required],
      name: ['']  
    });
  }

  /**
   * Updates the selected competition in the form.
   * 
   * @param {any} event The event object containing competition information.
   */
  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
  }

  /**
   * Fetches competitions data from the server.
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
   * Fetches teams data from the server based on the selected competition.
   */
  public async getData(): Promise<void> {
    try {
      this.pageEnded=false
      this.page=1
      const filter={name: this.form.get('name')?.value}

      this.teamsSubscription = this.teamsService.getTeams(this.form.get('competition')?.value, 1 , filter).subscribe({
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
   * Fetches the next page of teams data from the server.
   */
  public async getNextPage(): Promise<void>{
    try {
      this.page= this.page+1

      this.teamsGetNextPageSubscription = this.teamsService.getTeams(this.form.get('competition')?.value, this.page).subscribe({
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

  /**
   * Opens a dialog for displaying detailed information about a team.
   * 
   * @param {ITeam} item The team object to display details for.
   */
  openCardDialog(item: ITeam): void {
    this.dialog.open(CardDetailComponent, {
      data: {item},
    });
  }

}
