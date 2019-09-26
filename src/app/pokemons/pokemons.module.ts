import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppBarComponent } from './app-bar/app-bar.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { TeamComponent } from './team/team.component';

@NgModule({
	declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, AppBarComponent, LoginDialogComponent, SignupDialogComponent, TeamComponent],
	entryComponents: [LoginDialogComponent, SignupDialogComponent],
	imports: [
		CommonModule,
		FormsModule,
		PokemonsRoutingModule,
		
		MatListModule,
		MatCardModule,
		MatRippleModule,
		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatChipsModule,
		MatProgressSpinnerModule,
		MatSidenavModule,
		MatInputModule,
		MatToolbarModule,
		MatDialogModule,
		MatTooltipModule,
		
		InfiniteScrollModule,
	]
})
export class PokemonsModule {}
