import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsImportComponent } from './components/competitions-import/competitions.import.component';

// Define routes for the competitions module.
const routes: Routes = [
  { path: '', component: CompetitionsImportComponent },
];
/**
 * Module for managing competitions-related routes.
 * 
 * @class CompetitionsRoutingModule
 */
@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule { }
