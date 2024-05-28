import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SidebarComponent } from '@ui';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from './pipes/truncate.pipe';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [ SidebarComponent, TruncatePipe],
  exports: [
    CommonModule, 
    SidebarComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule
  ]
})
export class SharedModule { }
