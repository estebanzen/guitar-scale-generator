import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { HeaderComponent } from "./header.component";

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		RouterModule, // ← necesario para routerLink
		MatIconModule, // ← necesario para <mat-icon>
	],
	exports: [HeaderComponent],
})
export class HeaderModule {}
