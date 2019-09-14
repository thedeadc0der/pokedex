import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

@NgModule({
	declarations: [PokemonListComponent, PokemonDetailComponent],
	imports: [
		CommonModule,
		PokemonsRoutingModule,
		
		MatListModule,
		MatCardModule,
		MatRippleModule,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatChipsModule,
	]
})

export class PokemonsModule {}
