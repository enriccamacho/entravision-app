import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/event/competition.service';
import { Competitions } from './competitions.import.component.constants';
@Component({
  selector: 'app-competitions-import',
  templateUrl: './competitions.import.component.html',
  styleUrl: './competitions.import.component.scss',
})
export class CompetitionsImportComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  public data: any[] = []; 
  private competitonsSubscription: Subscription = new Subscription();
  private competitonImportSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({});
  competitionOptions: {name:string, code:string}[] = Competitions
  importing: boolean = false
  
  public mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    public formBuilder: FormBuilder, 
    private competitionService: CompetitionService, 
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
      await this.getData()
    }catch(err){
      console.log("Ha ocurrido un error al iniciar la página")
    }

  }

  ngOnDestroy(): void {
    this.competitonsSubscription?.unsubscribe();
    this.competitonImportSubscription?.unsubscribe();
  }


  
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required] 
    });
  }

  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
  }


  public async getData(): Promise<void> {
    try {
      this.competitonsSubscription = this.competitionService.getCompetitions().subscribe({
        next: (data) => {
          this.data = data;
          const codesToRemove = this.data.map(item => item.code);
          this.competitionOptions = this.competitionOptions.filter(option => !codesToRemove.includes(option));
        },
        error: (error) => {
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }


  public async importCompetition(): Promise<void> {
    try {
      this.importing = true
      this.competitonImportSubscription = this.competitionService.importCompetition(this.form.get('competition')?.value).subscribe({
        next: (data) => {
          this.importing = false
          this.getData()
        },
        error: (error) => {
          this.importing = false
          console.log("Ha ocurrido un error al obtener los datos");
        }
      });
    } catch (err) {
      console.log("Ha ocurrido un error al obtener los datos");
    }
  }

}
