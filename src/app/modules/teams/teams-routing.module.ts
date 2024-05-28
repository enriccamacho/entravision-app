import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsListComponent } from './components/teams-list/teams.list.component';

// Define routes for Teams module.
const routes: Routes = [
  { path: '', component: TeamsListComponent },
];

/**
 * Routing module for teams module.
 * 
 * @class TeamsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
