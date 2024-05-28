import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailComponent } from './card.detail.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TeamsService } from 'src/app/modules/teams/services/teams/teams.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';

describe('CardDetailComponent', () => {
  let component: CardDetailComponent;
  let fixture: ComponentFixture<CardDetailComponent>;
  let teamsService: jasmine.SpyObj<TeamsService>;

  beforeEach(async () => {
    const teamsServiceSpy = jasmine.createSpyObj('TeamsService', [
      'getPlayers',
    ]);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule],
      declarations: [CardDetailComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            data: {
              item: {
                name: 'test team',
                tla: 'esr',
                shortName: 'test',
                crest: 'https://crests.football-data.org/678.png',
                website: 'http://www.ajax.nl',
                founded: 1900,
                clubColors: 'Red / White',
              },
            },
          },
        },
        { provide: TeamsService, useValue: teamsServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetailComponent);
    component = fixture.componentInstance;
    teamsService = TestBed.inject(TeamsService) as jasmine.SpyObj<TeamsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch players data on ngOnInit', async () => {
    const playersData: IPlayer[] = [
      {
        playerId: '1',
        name: 'John Doe',
        position: 'Forward',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 1,
        section: 'Offence',
      },
      {
        playerId: '2',
        name: 'John Doe2',
        position: 'Defence',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 2,
        section: 'Defence',
      },
      {
        playerId: '3',
        name: 'John Doe3',
        position: 'Goalkeeper',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 3,
        section: 'Goalkeeper',
      },
      {
        playerId: '4',
        name: 'John Doe4',
        position: 'Midfield',
        dateOfBirth: '1990-01-01',
        nationality: 'USA',
        shirtNumber: 4,
        section: 'Midfield',
      },
    ];
    component.item = {
      name: 'test team',
      tla: 'esr',
      shortName: 'test',
      crest: 'https://crests.football-data.org/678.png',
      website: 'http://www.ajax.nl',
      founded: 1900,
      clubColors: 'Red / White',
    };

    teamsService.getPlayers.and.returnValue(of(playersData));
    await component.ngOnInit();

    expect(component.players).toEqual(playersData);
    expect(component.goalkeepers.length).toBe(1);
    expect(component.defences.length).toBe(1);
    expect(component.midfields.length).toBe(1);
    expect(component.offences.length).toBe(1);
  });

  it('should open team website in new tab', () => {
    const windowOpenSpy = spyOn(window, 'open');
    component.item = { website: 'http://www.test.com' } as any;
    component.openWebsite();
    expect(windowOpenSpy).toHaveBeenCalledWith('http://www.test.com', '_blank');
  });
});
