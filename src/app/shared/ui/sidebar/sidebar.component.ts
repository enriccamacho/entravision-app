
import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import { TABS } from './sidebar.component.constants';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy {
  @ViewChild('routerContent') routerContent!: TemplateRef<any>;
  @ViewChild('snav') sidenav!: MatSidenav;

  public mobileQuery: MediaQueryList;

  public fillerNav = TABS

  private _mobileQueryListener: () => void;
  
  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private router: Router, public dialog: MatDialog) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  
  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  public redirectPage(route: string) {
    this.router.navigate([route]);
    this.sidenav.toggle();
  }

  public toggleSidenav(): void {
    this.sidenav.toggle();
  }

}


