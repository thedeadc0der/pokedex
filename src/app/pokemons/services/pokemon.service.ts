import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PagedData } from '../models/paged-data.model';
import { Pokemon } from '../models/pokemon.model';
import { environment } from '../../../environments/environment';

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
		
		return this.http.get<PagedData<Pokemon>>(`${environment.apiUrl}/pokemons`, {params}).pipe(
			catchError(this.handleError<PagedData<Pokemon>>('getPokemons')),
		);
	}
	
	getPokemon(id: number): Observable<Pokemon> {
		const url = `${environment.apiUrl}/pokemons/${id}`;
		
		return this.http.get<Pokemon>(url).pipe(
			catchError(this.handleError<Pokemon>(`getPokemon(${id})`))
		);
	}
	
	search(query: string, from: number = 0, limit: number = 10): Observable<PagedData<Pokemon>> {
		const url = `${environment.apiUrl}/pokemons`;
		
		const params = new HttpParams()
			.set('offset', String(from))
			.set('limit', String(limit))
			.set('search', query);
			
		return this.http.get<PagedData<Pokemon>>(url, {params}).pipe(
			catchError(this.handleError<PagedData<Pokemon>>('search')),
		);
	}
}
