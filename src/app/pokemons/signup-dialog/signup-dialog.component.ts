import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { AccountService } from '../services/account.service';

enum SignUpState {
	Neutral,
	Working,
	Error,
	Taken,
	Invalid,
}

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrls: ['./signup-dialog.component.scss']
})
export class SignupDialogComponent implements OnInit {
	State = SignUpState;
	
	email: string = '';
	password1: string = '';
	password2: string = '';
	submitEnabled: boolean = false;
	passwordsMatch: boolean = true;
	state: SignUpState = SignUpState.Neutral;
	
	constructor(
		public accountService: AccountService,
		public dialogRef: MatDialogRef<SignupDialogComponent>) {}

	ngOnInit() {
	}
	
	onSubmit(){
		this.state = SignUpState.Working;
		
		this.accountService.signUp(this.email, this.password1)
			.subscribe((status: string) => {
				switch(status){
					case 'success': this.dialogRef.close(); break;
					case 'conflict': this.state = SignUpState.Taken; break;
					case 'bad': this.state = SignUpState.Invalid; break;
					default: this.state = SignUpState.Error; break;
				}
			});
	}
	
	updateSubmitButton(){
		this.passwordsMatch = (this.password1 === this.password2);
		this.submitEnabled = isEmail(this.email) && !isEmpty(this.password1) && this.passwordsMatch;
	}
}
