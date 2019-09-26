import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokedexComponent } from './pokedex/pokedex.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
	{ path: '', component: PokedexComponent },
	{ path: 'team', component: TeamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
