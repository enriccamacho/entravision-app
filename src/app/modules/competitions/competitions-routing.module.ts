import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsImportComponent } from './components/competitions-import/competitions.import.component';


const routes: Routes = [
  { path: '', component: CompetitionsImportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule { }
