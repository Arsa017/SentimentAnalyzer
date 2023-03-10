import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculationComponent } from './calculation/calculation.component';
import { LexiconComponent } from './lexicon/lexicon.component';

const routes: Routes = [
  { path: "", component: LexiconComponent },
  { path: "lexicon", component: LexiconComponent },
  { path: "calculation", component: CalculationComponent },
  { path: "**", component: LexiconComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
