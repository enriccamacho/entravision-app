import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { CommonModule } from '@angular/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'competitions', loadChildren: () => import('./modules/competitions/competitions.module').then(m => m.CompetitionsModule) },
    { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule) },
    { path: 'players', loadChildren: () => import('./modules/players/players.module').then(m => m.PlayersModule) }

  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule, CoreModule, SharedModule, MatSidenavModule, BrowserModule,BrowserAnimationsModule],
    exports: [RouterModule],
    declarations: [ AppComponent ],
    bootstrap: [ AppComponent ]
  })
  export class AppModule { }