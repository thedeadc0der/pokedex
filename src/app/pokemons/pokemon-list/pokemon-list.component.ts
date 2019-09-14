import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
	selector: 'app-pokemon-list',
	templateUrl: './pokemon-list.component.html',
	styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
	constructor(private pokemonService: PokemonService) { }
	
	pokemons: Array<Pokemon> = []
	
	getPokemons(){
		this.pokemonService.getPokemons().subscribe(pokemons => {
			this.pokemons = pokemons.data;
		});
	}
	
	ngOnInit() {
		this.getPokemons();
	}
}
