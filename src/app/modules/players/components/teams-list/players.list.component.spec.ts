import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersListComponent } from './players.list.component';
import { PlayersModule } from '../../players.module';
import { CompetitionService } from 'src/app/modules/competitions/services/competition/competition.service';
import { TeamsService } from 'src/app/modules/teams/services/teams/teams.service';
import { PlayersService } from '../../services/players/players.service';
import { of } from 'rxjs';
import { ITeam } from 'src/app/interfaces/ITeam';

describe('PlayersListComponent', () => {
  let component: PlayersListComponent;
  let fixture: ComponentFixture<PlayersListComponent>;
  let competitionService: jasmine.SpyObj<CompetitionService>;
  let teamsService: jasmine.SpyObj<TeamsService>;
  let playersService: jasmine.SpyObj<PlayersService>;

  beforeEach(async () => {
    const competitionSpy = jasmine.createSpyObj('CompetitionService', ['getCompetitions']);
    const teamsSpy = jasmine.createSpyObj('TeamsService', ['getTeams']);
    const playersSpy = jasmine.createSpyObj('PlayersService', ['getPlayers']);

    // Ensure methods return observables before initialization
    competitionSpy.getCompetitions.and.returnValue(of([]));
    teamsSpy.getTeams.and.returnValue(of([]));
    playersSpy.getPlayers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [PlayersModule],
      providers: [
        { provide: CompetitionService, useValue: competitionSpy },
        { provide: TeamsService, useValue: teamsSpy },
        { provide: PlayersService, useValue: playersSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayersListComponent);
    component = fixture.componentInstance;
    competitionService = TestBed.inject(CompetitionService) as jasmine.SpyObj<CompetitionService>;
    teamsService = TestBed.inject(TeamsService) as jasmine.SpyObj<TeamsService>;
    playersService = TestBed.inject(PlayersService) as jasmine.SpyObj<PlayersService>;
  });

  it('should create', () => {
    fixture.detectChanges(); 
    expect(component).toBeTruthy();
  });

  it('should retrieve competitions on initialization', () => {
    const mockCompetitions = [
      { name: 'Primera Division', code: 'PD' },
      { name: 'Premier League', code: 'PL' },
    ];
    competitionService.getCompetitions.and.returnValue(of(mockCompetitions));

    fixture.detectChanges();

    expect(competitionService.getCompetitions).toHaveBeenCalled();
    expect(component.competitions).toEqual(mockCompetitions);
  });

  it('should retrieve teams when a competition is selected', () => {
    const mockTeams: ITeam[] = [
      {
        name: 'Team 1',
        tla: 'T1',
        shortName: 'T1',
        crest: 'crest1',
        website: 'website1',
        founded: 2001,
        clubColors: 'Red',
      },
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
    teamsService.getTeams.and.returnValue(of(mockTeams));
    const selectedCompetition = 'PD';

    fixture.detectChanges(); 
    component.updateCompetition({ target: { value: selectedCompetition } });

    expect(teamsService.getTeams).toHaveBeenCalledWith(selectedCompetition);
    expect(component.teams).toEqual(mockTeams);
  });

  it('should retrieve players when competition and team are selected', () => {
    const mockPlayers = [
      {
        playerId: '1',
        name: 'John Doe',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 1,
        section: 'Defence',
      },
      {
        playerId: '2',
        name: 'John Doe2',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 2,
        section: 'Defence',
      },
    ];
    playersService.getPlayers.and.returnValue(of(mockPlayers));
    const selectedCompetition = 'PD';
    const selectedTeam = 'FCB';

    fixture.detectChanges(); 
    component.form.patchValue({
      competition: selectedCompetition,
      team: selectedTeam,
    });
    component.getData();

    expect(playersService.getPlayers).toHaveBeenCalledWith(
      selectedCompetition,
      selectedTeam
    );
    expect(component.data).toEqual(mockPlayers);
  });

  it('should retrieve next page of players when getNextPage is called', () => {
    const currentPageData = [
      {
        playerId: '1',
        name: 'John Doe',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 1,
        section: 'Defence',
      },
      {
        playerId: '2',
        name: 'John Doe2',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 2,
        section: 'Defence',
      },
    ];
    const nextPageData = [
      {
        playerId: '3',
        name: 'John Doe3',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 3,
        section: 'Defence',
      },
      {
        playerId: '4',
        name: 'John Doe4',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 4,
        section: 'Defence',
      },
    ];
    playersService.getPlayers.and.returnValues(of(currentPageData), of(nextPageData));
    const selectedCompetition = 'PD';
    const selectedTeam = 'FCB';

    fixture.detectChanges(); 
    component.form.patchValue({
      competition: selectedCompetition,
      team: selectedTeam,
    });
    component.getData();
    component.getNextPage();

    expect(playersService.getPlayers).toHaveBeenCalledWith(
      selectedCompetition,
      selectedTeam,
      2
    );
    expect(component.data).toEqual([...currentPageData, ...nextPageData]);
  });
});
