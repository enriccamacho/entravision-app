import { ChangeDetectorRef, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { SidebarComponent } from "./sidebar.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "../../shared.module";

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let changeDetectorRef: ChangeDetectorRef;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [SidebarComponent],
      providers: [
        { provide: ElementRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef); // Getting ChangeDetectorRef from componentRef
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe from mobileQuery changes on ngOnDestroy', () => {
    const removeEventListenerSpy = spyOn(component.mobileQuery, 'removeEventListener');
    component.ngOnDestroy();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it('should navigate to the specified route  on redirectPage', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    const route = '/example-route';
    component.redirectPage(route);
    expect(navigateSpy).toHaveBeenCalledWith([route]);
  });


});
