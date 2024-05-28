import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamCardComponent } from './team.card.component';
import { CardModule } from '../card.module';
import { ITeam } from 'src/app/interfaces/ITeam';

describe('TeamCardComponent', () => {
  let component: TeamCardComponent;
  let fixture: ComponentFixture<TeamCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onOpenCard event when openCard method is called', () => {
    let emittedItem: ITeam | undefined;
    const testItem: ITeam = {
      name: 'Test Team',
      tla: 'TEST',
      shortName: 'Test',
      crest: 'https://crests.football-data.org/678.png',
      website: 'http://www.testteam.com',
      founded: 1900,
      clubColors: 'Red / White'
    };

    component.onOpenCard.subscribe((item: ITeam | undefined) => {
      emittedItem = item;
    });

    component.openCard(testItem);
    expect(emittedItem).toEqual(testItem);
  });
});
