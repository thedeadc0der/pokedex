import { Component, OnInit } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';
import { TeamService } from '../services/team.service';



@Component({
	selector: 'app-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
	private loading: boolean = true;
	
	private addingPokemons: boolean = false;
	private selectedPokemons: Pokemon[] = [];
	private nonSelectedPokemons: Pokemon[] = [];
	
	constructor(
		private pokemonService: PokemonService,
		private teamService: TeamService) {}
	
	ngOnInit() {
		this.teamService.getPokemons().subscribe(pokemons => {
			this.selectedPokemons = pokemons;
			this.loading = false;
		});
	}
	
	savePokemons(){
		
	}
	
	startAddingPokemons(){
		this.addingPokemons = true;
	}
	
	addToSelection(pokemon){
		this.selectedPokemons.push(pokemon);
		this.nonSelectedPokemons = this.nonSelectedPokemons.filter(p => p.id !== pokemon.id);
	}
	
	removeFromSelection(pokemon){
		this.selectedPokemons = this.selectedPokemons.filter(p => p.id !== pokemon.id);
		this.nonSelectedPokemons.push(pokemon);
	}
}
