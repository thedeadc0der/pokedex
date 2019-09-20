import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';

import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokedex/pokedex.component';

@NgModule({
	declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent],
	imports: [
		CommonModule,
		FormsModule,
		PokemonsRoutingModule,
		
		MatListModule,
		MatCardModule,
		MatRippleModule,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatChipsModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatInputModule,
		
		InfiniteScrollModule,
	]
})
export class PokemonsModule {}
