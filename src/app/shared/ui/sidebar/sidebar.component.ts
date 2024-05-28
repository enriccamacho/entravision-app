
import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { TABS } from './sidebar.component.constants';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component for displaying the sidebar.
 * 
 * @class SidebarComponent
 * @implements {OnDestroy}
 */@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  @ViewChild('snav') sidenav!: MatSidenav;
  // Array to hold navigation items
  public fillerNav = TABS
  // Media query result.
  public mobileQuery: MediaQueryList;
  // Listener function for media query changes.
  private _mobileQueryListener: () => void;
  
  /**
   * Constructor for SidebarComponent.
   * @param changeDetectorRef Reference to the change detector
   * @param media Media matcher for responsive behavior
   * @param router Router for navigation
   * @param dialog Dialog for displaying modals
   */
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private router: Router, public dialog: MatDialog) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  
  /**
   * Lifecycle hook called after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  
  /**
   * Lifecycle hook that is called when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  /**
   * Redirects to the specified route and toggles the sidenav.
   * @param route The route to navigate to.
   */
  public redirectPage(route: string) {
    this.router.navigate([route]);
    this.sidenav.toggle();
  }

  /**
   * Toggles the sidenav.
   */
  public toggleSidenav(): void {
    this.sidenav.toggle();
  }

}


