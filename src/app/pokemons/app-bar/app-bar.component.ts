import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AccountService } from '../services/account.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
	signedIn: boolean = false
	
	@Output('search-change') searchChange = new EventEmitter();
	
	set searchQuery(value: string){
		this.searchChange.emit(value);
	}
	
	constructor(public dialog: MatDialog, public accountService: AccountService) {}
	
	ngOnInit() {
		this.signedIn = this.accountService.isSignedIn();
	}
	
	openSignInDialog(){
		this.dialog.open(LoginDialogComponent)
			.afterClosed().subscribe(didSignIn => this.signedIn = didSignIn);
	}
	
	openSignUpDialog(){
		this.dialog.open(SignupDialogComponent)
			.afterClosed().subscribe(didSignUp => this.signedIn = didSignUp);
	}
	
	signOut(){
		this.accountService.signOut();
		this.signedIn = false;
	}
}
