import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        MediaMatcher,
        ChangeDetectorRef,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mobileQuery initialized', () => {
    expect(component.mobileQuery).toBeDefined();
  });

  it('should navigate to "/competitions" when redirectPage is called', () => {
    component.redirectPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/competitions']);
  });

  it('should call changeDetectorRef.detectChanges in ngAfterViewInit', () => {
    spyOn(component.changeDetectorRef, 'detectChanges');
    component.ngAfterViewInit();
    expect(component.changeDetectorRef.detectChanges).toHaveBeenCalled();
  });

  it('should remove event listener in ngOnDestroy', () => {
    spyOn(component.mobileQuery, 'removeEventListener');
    component.ngOnDestroy();
    expect(component.mobileQuery.removeEventListener).toHaveBeenCalled();
  });
});
