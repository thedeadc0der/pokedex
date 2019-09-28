import { Component, OnInit } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

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
	private selectedPokemons: Pokemon[] = [];
	private searchQuery: string = '';
	private saving: boolean = false
	
	private POKEMONS_PER_TEAM: number = 6;
	
	constructor(
		private snackbar: MatSnackBar,
		private pokemonService: PokemonService,
		private teamService: TeamService) {}
	
	ngOnInit() {
		this.teamService.getPokemons().subscribe(pokemons => {
			this.selectedPokemons = pokemons;
			this.loading = false;
		});
	}
	
	savePokemons(){
		this.saving = false;
		this.teamService.setPokemons(this.selectedPokemons.map(pkmn => pkmn.id)).subscribe(r => {
			this.snackbar.open(`Your team has been saved!`);
		});
	}
	
	addToSelection(pokemon){
		if( this.selectedPokemons.length === this.POKEMONS_PER_TEAM ){
			// Limit the size of the team
			this.snackbar.open(`Can't add ${pokemon.name}, your team is already full!`);
		} else {
			this.selectedPokemons.push(pokemon);
		}
	}
	
	removeFromSelection(index: number){
		this.selectedPokemons.splice(index, 1);
	}
	
	private teamContains(pokemon){
		for(const curr of this.selectedPokemons){
			if( curr.id === pokemon.id )
				return true;
		}
		
		return false;
	}
	
	searchChanged(query: string){
		this.searchQuery = query;
	}
}
