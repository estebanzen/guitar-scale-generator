import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";

const MATERIAL = [
	MatCardModule,
	MatSlideToggleModule,
	MatExpansionModule,
	MatRippleModule,
	MatIconModule,
	MatButtonModule,
	MatFormFieldModule,
	MatSelectModule,
	MatSliderModule,
	MatInputModule,
	MatToolbarModule,
	MatSidenavModule,
	MatListModule,
];

@NgModule({
	exports: MATERIAL,
})
export class MaterialModule {}
