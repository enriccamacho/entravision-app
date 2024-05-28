import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/event/competition.service';
import { TeamsService } from '../../services/event/teams.service';
import { CardDetailComponent } from '@ui/card/card-detail/card.detail.component';
import { ICompetition } from 'src/app/interfaces/ICompetition';


@Component({
  selector: 'app-teams-list',
  templateUrl: './teams.list.component.html',
  styleUrl: './teams.list.component.scss',
})
export class TeamsListComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  public data: any[] = []; 
  private teamsSubscription: Subscription = new Subscription();
  private competitionsSubscription: Subscription = new Subscription();
  private teamsGetNextPageSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  competitions: ICompetition[] = []
  importing: boolean = false
  page: number = 1
  pageEnded: boolean = false
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

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
    this.teamsSubscription?.unsubscribe();
    this.competitionsSubscription?.unsubscribe();
    this.teamsGetNextPageSubscription?.unsubscribe();
  }


  
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required],
      name: ['']  
    });
  }

  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
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


  public async getData(): Promise<void> {
    try {
      this.pageEnded=false
      const filter={name: this.form.get('name')?.value}

      this.teamsSubscription = this.teamsService.getTeams(this.form.get('competition')?.value, 1 , filter).subscribe({
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

      this.teamsGetNextPageSubscription = this.teamsService.getTeams(this.form.get('competition')?.value, this.page).subscribe({
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

  openCardDialog(item: any): void {
    this.dialog.open(CardDetailComponent, {
      data: {item},
    });
  }



}
