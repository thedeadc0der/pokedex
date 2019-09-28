import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { mergeMap, defaultIfEmpty, map, catchError } from 'rxjs/operators';

import { AccountService } from './account.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from './pokemon.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
	constructor(private http: HttpClient, private accountService: AccountService, private pokemonService: PokemonService) {}
	
	/**
	 * Calls the `action` parameter. If that results in an error due to the
	 * access token having expired, refreshes the token then calls `action`
	 * again to retry.
	 * 
	 * NOTE: Simply retrying the observable wouldn't work, since the request
	 *       headers (including the expired access token) would be re-used from
	 *       the first call.
	 */
	private authentified<T>(action: () => Observable<T> ){
		const isRefreshError = res => {
			return (res.name === 'HttpErrorResponse') 
				&& (res.status === 401) 
				&& res.error.message.startsWith('Access token expired');
		};

		return action().pipe(
			catchError((err, caught) => {
				// If the error is due to the access token expiring, try
				// refreshing it and then retry.
				return isRefreshError(err)
					? this.accountService.refreshAccessToken().pipe(mergeMap(action))
					: throwError(err);
			}));
	}
	
	private getInfoOfPokemons(ids: number[]): Observable<Pokemon[]> {
		// XXX: This makes one request per pokemon, a better solution would be
		//      needed in an actual production app.
		return forkJoin(ids.map(id => this.pokemonService.getPokemon(id)));
	}
	
	getPokemons(): Observable<Pokemon[]> {
		return this.authentified(() => {
			const url = `${environment.apiUrl}/trainers/me/team`;
			const headers = new HttpHeaders(this.accountService.httpHeaders);
			
			return this.http.get<number[]>(url, {headers}).pipe(
				mergeMap(ids => this.getInfoOfPokemons(ids)),
				defaultIfEmpty([])
			);
		});
	}
	
	setPokemons(ids: number[]): Observable<any> {
		return this.authentified(() => {
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
			});
		});
	}
}
