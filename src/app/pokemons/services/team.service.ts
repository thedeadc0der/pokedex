import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, defaultIfEmpty, map } from 'rxjs/operators';

import { AccountService } from './account.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from './pokemon.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
	constructor(private http: HttpClient, private accountService: AccountService, private pokemonService: PokemonService) {}
	
	private getInfoOfPokemons(ids: number[]): Observable<Pokemon[]> {
		// XXX: This makes one request per pokemon, a better solution would be
		//      needed in an actual production app.
		return forkJoin(ids.map(id => this.pokemonService.getPokemon(id)));
	}
	
	getPokemons(): Observable<Pokemon[]> {
		const url = `${environment.apiUrl}/trainers/me/team`;
		const headers = new HttpHeaders(this.accountService.httpHeaders);
		
		return this.http.get<number[]>(url, {headers}).pipe(
			mergeMap(ids => this.getInfoOfPokemons(ids)),
			defaultIfEmpty([]),
		);
	}
	
	setPokemons(ids: number[]): Observable<any> {
		console.log("setting pokemons to: ", ids);
		const url = `${environment.apiUrl}/trainers/me/team`;
		
		// XXX: The default responseType is JSON, which causes an error when
		//      the PUT request returns a 204 which has no body, so we set it
		//      to text so the response can be interpreted as an empty string
		//      without causing an error. 
		return this.http.put(url, ids, {
			responseType: 'text',
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				...this.accountService.httpHeaders
			}),
		}).pipe(
			map(result => console.log(result)),
		);
	}
}
