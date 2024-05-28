import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsListComponent } from './teams.list.component';
import { TeamsModule } from '../../teams.module';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { TeamsService } from '../../services/teams/teams.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ITeam } from 'src/app/interfaces/ITeam';

describe('TeamsListComponent', () => {
  let component: TeamsListComponent;
  let fixture: ComponentFixture<TeamsListComponent>;
  let competitionService: jasmine.SpyObj<CompetitionService>;
  let teamsService: jasmine.SpyObj<TeamsService>;

  beforeEach(async () => {
    const competitionServiceSpy = jasmine.createSpyObj('CompetitionService', [
      'getCompetitions',
    ]);
    const teamsServiceSpy = jasmine.createSpyObj('TeamsService', ['getTeams']);

    await TestBed.configureTestingModule({
      imports: [TeamsModule, ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: CompetitionService, useValue: competitionServiceSpy },
        { provide: TeamsService, useValue: teamsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsListComponent);
    component = fixture.componentInstance;
    competitionService = TestBed.inject(
      CompetitionService
    ) as jasmine.SpyObj<CompetitionService>;
    teamsService = TestBed.inject(TeamsService) as jasmine.SpyObj<TeamsService>;

    // Mock the service methods to return observables
    competitionService.getCompetitions.and.returnValue(
      of([{ code: 'CL', name: 'Champions League' }])
    );
    teamsService.getTeams.and.returnValue(
      of([
        {
          name: 'Team 2',
          tla: 'T2',
          shortName: 'T2',
          crest: 'crest2',
          website: 'website2',
          founded: 1901,
          clubColors: 'Blue',
        },
      ])
    );
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
    expect(component.form.get('competition')?.validator).toBe(
      Validators.required
    );
  });

  it('should update selected competition in the form', () => {
    component.ngOnInit();
    const event = { target: { value: 'CL' } };
    component.updateCompetition(event);
    expect(component.form.get('competition')?.value).toEqual('CL');
  });

  it('should get competitions data on ngOnInit', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.competitions).toEqual([
      { code: 'CL', name: 'Champions League' },
    ]);
  });

  it('should get teams data when getData is called', async () => {
    component.form.patchValue({ competition: 'CL' });
    await component.getData();
    fixture.detectChanges();
    expect(component.data).toEqual([
      {
        name: 'Team 2',
        tla: 'T2',
        shortName: 'T2',
        crest: 'crest2',
        website: 'website2',
        founded: 1901,
        clubColors: 'Blue',
      },
    ]);
  });

  it('should append teams data when getNextPage is called', async () => {
    component.form.patchValue({ competition: 'CL' });
    component.data = [
      {
        name: 'Team 2',
        tla: 'T2',
        shortName: 'T2',
        crest: 'crest2',
        website: 'website2',
        founded: 1901,
        clubColors: 'Blue',
      },
    ];
    await component.getNextPage();
    fixture.detectChanges();
    expect(component.data.length).toBe(2);
  });

  it('should open the dialog when openCardDialog is called', () => {
    const dialogSpy = spyOn(component.dialog, 'open').and.callThrough();
    const team: ITeam = {
      name: 'Team 2',
      tla: 'T2',
      shortName: 'T2',
      crest: 'crest2',
      website: 'website2',
      founded: 1901,
      clubColors: 'Blue',
    };
    component.openCardDialog(team);
    expect(dialogSpy).toHaveBeenCalled();
  });
});
