import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsModule } from './pokemons/pokemons.module';

const routes: Routes = [
	{
		path: 'pokemons',
		loadChildren: () => import('./pokemons/pokemons.module').then((m: any) => m.PokemonsModule),
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
