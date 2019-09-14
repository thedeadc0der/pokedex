import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
	pokemon: Pokemon = null;
	
	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private pokemonService: PokemonService) {}

	getPokemon(){
		const id = Number(this.route.snapshot.paramMap.get('id'));
		
		this.pokemonService.getPokemon(id).subscribe(pokemon => {
			this.pokemon = pokemon;
			this.play();
		});
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
  
	goBack(){
		this.location.back();
	}
}
