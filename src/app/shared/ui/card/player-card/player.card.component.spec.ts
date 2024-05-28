import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCardComponent } from './player.card.component';
import { CardModule } from '../card.module';

describe('PlayerCardComponent', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
