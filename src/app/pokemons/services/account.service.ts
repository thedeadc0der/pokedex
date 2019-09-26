import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	private accessToken: string = null;
	private refreshToken: string = null;
	
	public get httpHeaders(){
		return {
			Authorization: 'Bearer ' + this.accessToken
		};
	}
	
	constructor(private http: HttpClient) {
		if( localStorage ){
			this.accessToken = localStorage.getItem('accessToken');
			this.refreshToken = localStorage.getItem('refreshToken');
		}
	}
	
	private saveTokens(accessToken: string, refreshToken: string){
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		window.localStorage.setItem('accessToken', accessToken);
		window.localStorage.setItem('refreshToken', refreshToken);
	}
	
	public isSignedIn(){
		return Boolean(this.accessToken);
	}
	
	public signIn(email: string, password: string): Observable<any> {
		const url = `${environment.apiUrl}/auth/login`;
		
		return this.http.post(url, {email, password}, httpOptions).pipe(tap(res => {
			this.saveTokens(res.access_token, res.refresh_token);
		}));
	}
	
	public signUp(email: string, password: string): Observable<string> {
		const url = `${environment.apiUrl}/trainers`;
		
		return this.http.post(url, {email, password}, httpOptions).pipe(
			map((res: any) => {
				this.saveTokens(res.idToken, res.refreshToken);
				return 'success';
			}),
			catchError((error: any): Observable<string> => {
				switch(error.status){
					case 409: return of('conflict');
					case 400: return of('bad');
					default: return of(null);
				}
			}),
		);
	}
	
	public signOut(){
		this.accessToken = undefined;
		this.refreshToken = undefined;
		window.localStorage.removeItem('accessToken');
		window.localStorage.removeItem('refreshToken');
	}
}
