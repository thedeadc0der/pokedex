import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
	@Input('pokemon-id') id: number
	pokemon: Pokemon = null;
	
	constructor(private pokemonService: PokemonService) {}

	getPokemon(){
		if( this.id ){
			this.pokemonService.getPokemon(this.id).subscribe(pokemon => {
				this.pokemon = pokemon;
				this.play();
			});
		} else {
			this.pokemon = null;
		}
	}
	
	play(){
		const audio = new Audio();
		audio.src = `/assets/audio/${this.pokemon.id}.mp3`;
		audio.load();
		audio.play();
	}
	
	ngOnInit() {
		this.getPokemon();
	}
	
	ngOnChanges(changes){
		if( changes.hasOwnProperty('id') ){
			this.getPokemon();
		}
	}
}
