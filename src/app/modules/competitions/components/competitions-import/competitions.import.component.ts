import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { Competitions } from './competitions.import.component.constants';

/**
 * Component for importing competitions.
 * 
 * @class CompetitionsImportComponent
 * @implements OnInit
 */
@Component({
  selector: 'app-competitions-import',
  templateUrl: './competitions.import.component.html',
  styleUrl: './competitions.import.component.scss',
})
export class CompetitionsImportComponent implements OnInit {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  // Array to hold competition data.
  public data: any[] = []; 
  // Subscription for competition data retrieval.
  private competitonsSubscription: Subscription = new Subscription();
  // Subscription for competition import operation.
  private competitonImportSubscription: Subscription = new Subscription();
  // Form group for managing form controls.
  public form: FormGroup = new FormGroup({});
  // Array containing available competition options.
  public competitionOptions: {name:string, code:string}[] = Competitions
  // Flag to indicate if a competition import operation is ongoing.
  public importing: boolean = false
  // Media query result.
  public mobileQuery: MediaQueryList;
  // Listener function for media query changes.
  private _mobileQueryListener: () => void;


  /**
   * Constructor to initialize dependencies and setup media query listener.
   * 
   * @param formBuilder FormBuilder service for creating form instances.
   * @param competitionService CompetitionService for competition-related operations.
   * @param changeDetectorRef ChangeDetectorRef service for detecting and applying changes in the component.
   * @param media MediaMatcher service for matching media queries.
   * @param dialog MatDialog service for displaying dialogs.
   */
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

  /**
   * Lifecycle hook called after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Lifecycle hook called when the component is initialized.
   */
  async ngOnInit(): Promise<void> {
    try{
      this.createForm()
      await this.getData()
    }catch(err){
      console.log("Ha ocurrido un error al iniciar la página")
    }

  }

  /**
   * Lifecycle hook called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.competitonsSubscription?.unsubscribe();
    this.competitonImportSubscription?.unsubscribe();
  }


  /**
   * Create the form with necessary form controls.
   */
  private createForm(): void {
    this.form = this.formBuilder.group({
      competition: ['', Validators.required] 
    });
  }

  /**
   * Update the selected competition in the form.
   * 
   * @param event The event containing the selected competition.
   */
  public updateCompetition(event:any) : void{
    this.form.get('competition')?.setValue(event?.target?.value)
  }

  /**
   * Retrieve competition data from the server.
   */
  public async getData(): Promise<void> {
    try {
      this.competitonsSubscription = this.competitionService.getCompetitions().subscribe({
        next: (data) => {
          this.data = data;
          const codesToRemove = this.data.map(item => item.code);
          this.competitionOptions = this.competitionOptions.filter(option => !codesToRemove.includes(option));
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
   * Import the selected competition.
   */
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
          console.log("Error fetchin data:", error);
        }
      });
    } catch (error) {
      console.log("Error fetchin data:", error);
    }
  }

}
