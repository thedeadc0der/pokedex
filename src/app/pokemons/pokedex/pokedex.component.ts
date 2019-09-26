import { Component, OnInit } from '@angular/core';

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
	
	onSelectPokemon(id){
		this.selectedPokemon = id;
	}
	
	onSignIn(){
		alert("signing in");
	}
	
	searchChanged(query: string){
		this.searchQuery = query;
	}
}
