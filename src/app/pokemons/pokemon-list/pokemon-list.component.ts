import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

const POKEMONS_PER_PAGE: number = 20;

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
	constructor(private pokemonService: PokemonService) { }
	
	pokemons: Array<Pokemon> = []
	loading: boolean = false;
	
	getPokemons(){
		this.loading = true;
		
		this.pokemonService.getPokemons(this.pokemons.length, POKEMONS_PER_PAGE).subscribe(pokemons => {
			// XXX: If pokemons aren't always returned in order, we might need
			//      to sort them here.
			this.pokemons = [...this.pokemons, ...pokemons.data];
			this.loading = false;
		});
	}
	
	ngOnInit() {
		this.getPokemons();
	}
	
	onScroll(){
		this.getPokemons();
	}
}
