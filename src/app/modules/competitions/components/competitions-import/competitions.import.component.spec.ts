import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompetitionsImportComponent } from './competitions.import.component';
import { CompetitionsModule } from '../../competitions.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { of } from 'rxjs';

describe('CompetitionsImportComponent', () => {
  let component: CompetitionsImportComponent;
  let fixture: ComponentFixture<CompetitionsImportComponent>;
  let competitionService: jasmine.SpyObj<CompetitionService>;

  beforeEach(async () => {
    const competitionServiceSpy = jasmine.createSpyObj('CompetitionService', ['getCompetitions', 'importCompetition']);

    await TestBed.configureTestingModule({
      imports: [CompetitionsModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CompetitionService, useValue: competitionServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionsImportComponent);
    component = fixture.componentInstance;
    competitionService = TestBed.inject(CompetitionService) as jasmine.SpyObj<CompetitionService>;

    // Ensure getCompetitions method returns an observable
    competitionService.getCompetitions.and.returnValue(of([{ name: 'Test Competition', code: 'TEST' }]));
    competitionService.importCompetition.and.returnValue(of({}));
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with required competition control', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.get('competition')).toBeDefined();
    expect(component.form.get('competition')?.validator).toBe(Validators.required);
  });

  it('should update selected competition in the form', () => {
    component.ngOnInit();
    const event = { target: { value: 'CL' } };
    component.updateCompetition(event);
    expect(component.form.get('competition')?.value).toEqual('CL');
  });

  it('should get competition data on ngOnInit', async () => {
    await component.ngOnInit();
    fixture.detectChanges(); 

    expect(component.data).toEqual([{ name: 'Test Competition', code: 'TEST' }]);
  });
});
