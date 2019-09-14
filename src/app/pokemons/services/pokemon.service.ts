import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';
import { PagedData } from '../models/paged-data.model';

const BASE_URL = 'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	constructor(private http: HttpClient) {}
	
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			console.error(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
	
	getPokemons(from: number = 0, limit: number = 10): Observable<PagedData<Pokemon>> {
		const params = new HttpParams()
			.set('offset', String(from))
			.set('limit', String(limit));
		
		return this.http.get<PagedData<Pokemon>>(`${BASE_URL}/pokemons`, {params}).pipe(
			catchError(this.handleError<PagedData<Pokemon>>('getPokemons')),
		);
	}
	
	getPokemon(id: number): Observable<Pokemon> {
		const url = `${BASE_URL}/pokemons/${id}`;
		
		return this.http.get<Pokemon>(url).pipe(
			catchError(this.handleError<Pokemon>(`getPokemon(${id})`))
		);
	}
}
