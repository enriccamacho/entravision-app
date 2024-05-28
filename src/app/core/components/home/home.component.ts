import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Home component that manages the layout and navigation for the home page.
 * 
 * @class HomeComponent
 * @implements OnDestroy
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;

  // Holds the result of the media query.
  public mobileQuery: MediaQueryList;
  // A listener function to handle changes in the media query.
  private _mobileQueryListener: () => void;

    /**
   * Constructs the HomeComponent.
   * 
   * @param changeDetectorRef Service to detect and apply changes in the component.
   * @param router Router service to handle navigation.
   * @param media MediaMatcher service to match media queries.
   */
  constructor( 
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private media: MediaMatcher
    ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  /**
   * Lifecycle hook that runs after the component's view has been fully initialized.
   * Detects and applies changes.
   */
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Lifecycle hook that runs just before the component is destroyed.
   * Cleans up the event listener to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  /**
   * Navigates to the '/competitions' route.
   */
  public redirectPage(): void {
    this.router.navigate(['/competitions']);
  }
}
