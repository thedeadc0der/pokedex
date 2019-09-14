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
	
	get idOfLastPokemon(): number {
		// If there are no pokemons, start at index 0
		if( this.pokemons.length === 0 )
			return 0;
		
		// If there are pokemons, start after the last one
		return this.pokemons[this.pokemons.length - 1].id;
	}
	
	getPokemons(){
		this.pokemonService.getPokemons(this.idOfLastPokemon, POKEMONS_PER_PAGE).subscribe(pokemons => {
			this.pokemons = [...this.pokemons, ...pokemons.data];
		});
	}
	
	ngOnInit() {
		this.getPokemons();
	}
	
	onScroll(){
		this.getPokemons();
	}
}
