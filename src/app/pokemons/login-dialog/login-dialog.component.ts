import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { AccountService } from '../services/account.service';

enum LoginDialogState {
	Neutral,
	Working,
	Wrong,
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
	State = LoginDialogState;
	
	email: string = 'jessy.vanderaugstraete@ig2i.centralelille.fr';
	password: string = 'toto12345';
	submitEnabled: boolean = true;
	state: LoginDialogState = LoginDialogState.Neutral;
	
	constructor(
		public accountService: AccountService,
		public dialogRef: MatDialogRef<LoginDialogComponent>) {}

	ngOnInit() {
	}
	
	onSubmit(){
		this.state = LoginDialogState.Working;
		
		this.accountService.signIn(this.email, this.password).subscribe(
			_ => {
				this.state = LoginDialogState.Neutral;
				this.dialogRef.close(true);
			}, error => {
				this.state = LoginDialogState.Wrong;
			});
	}
	
	updateSubmitButton(){
		this.submitEnabled = isEmail(this.email) && !isEmpty(this.password);
	}
}
