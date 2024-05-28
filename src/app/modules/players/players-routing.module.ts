import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersListComponent } from './components/teams-list/players.list.component';

// Define routes for Players module.
const routes: Routes = [
  { path: '', component: PlayersListComponent },
];

/**
 * Routing module for Players module.
 * 
 * @class PlayersRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class PlayersRoutingModule { }
