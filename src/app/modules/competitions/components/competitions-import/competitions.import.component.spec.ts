import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsImportComponent } from './competitions.import.component';

describe('CompetitionsImportComponent', () => {
  let component: CompetitionsImportComponent;
  let fixture: ComponentFixture<CompetitionsImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompetitionsImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
