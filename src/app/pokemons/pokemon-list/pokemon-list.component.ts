import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

const POKEMONS_PER_PAGE: number = 20;

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
	@Output() select = new EventEmitter();
	
	searchQuery: string = '';
	
	constructor(private pokemonService: PokemonService) { }
	
	pokemons: Array<Pokemon> = []
	loading: boolean = false;
	
	getPokemons(){
		console.log('getPokemons / search=' + this.searchQuery);
		this.loading = true;
		
		if( !this.searchQuery ){
			console.log('getting regular pokemons');
			// If we're not searching, just get all pokemons
			this.pokemonService.getPokemons(this.pokemons.length, POKEMONS_PER_PAGE).subscribe(pokemons => {
				// XXX: If pokemons aren't always returned in order, we might need
				//      to sort them here.
				this.pokemons = [...this.pokemons, ...pokemons.data];
				this.loading = false;
			});
		} else {
			this.pokemonService.search(this.searchQuery, 0, POKEMONS_PER_PAGE).subscribe(pokemons => {
				this.pokemons = pokemons.data;
				this.loading = false;
			});
		}
	}
	
	ngOnInit() {
		this.getPokemons();
	}
	
	onScroll(){
		this.getPokemons();
	}
	
	onItemClick(id){
		this.select.emit(id);
	}
	
	onSearchModelChange(){
		console.log('searching…');
		this.getPokemons();
	}
	
}
