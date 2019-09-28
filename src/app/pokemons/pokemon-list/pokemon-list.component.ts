import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

const POKEMONS_PER_PAGE: number = 20;

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
	@Output() select = new EventEmitter<Pokemon>();
	@Input('search') searchQuery: string = '';
	
	constructor(private pokemonService: PokemonService) { }
	
	pokemons: Array<Pokemon> = []
	loading: boolean = false;
	
	// Fetches the next POKEMONS_PER_PAGE pokémons
	getNextPokemons(){
		this.loading = true;
		this.pokemonService.getPokemons(this.pokemons.length, POKEMONS_PER_PAGE).subscribe(pokemons => {
			console.log(`Adding ${pokemons.data.length} pokémons after the ${this.pokemons.length}`)
			// XXX: If pokemons aren't always returned in order, we might need
			//      to sort them here.
			this.pokemons = [...this.pokemons, ...pokemons.data];
			this.loading = false;
		});
	}
	
	searchPokemons(){
		this.loading = true;
		this.pokemonService.search(this.searchQuery, 0, POKEMONS_PER_PAGE).subscribe(pokemons => {
			console.log(`Replacing everything with ${pokemons.data.length} searched pokémons`)
			this.pokemons = pokemons.data;
			this.loading = false;
		});
	}
	
	onScroll(){
		this.getNextPokemons();
	}
	
	onItemClick(pokemon: Pokemon){
		this.select.emit(pokemon);
	}
	
	ngOnInit(){
	}
	
	ngOnChanges(changes: SimpleChanges){
		if( changes.searchQuery ){
			if( changes.searchQuery.currentValue ){
				this.searchPokemons();
			} else {
				// If the query was cleared, clear the Pokémons before adding more
				this.pokemons = [];
				this.getNextPokemons();
			}
		}
	}
}
