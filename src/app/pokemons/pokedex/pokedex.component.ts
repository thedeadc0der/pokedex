import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
	private selectedPokemon: number = null;
	searchQuery: string = '';
	
	constructor() { }

	ngOnInit() {
	}
	
	onSelectPokemon(pokemon: Pokemon){
		this.selectedPokemon = pokemon.id;
	}
	
	onSignIn(){
		alert("signing in");
	}
	
	searchChanged(query: string){
		this.searchQuery = query;
	}
}
