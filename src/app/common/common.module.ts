import { NgModule } from "@angular/core";
import { CommonModule as AngularCommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";

@NgModule({
	exports: [AngularCommonModule, FormsModule, MaterialModule],
})
export class CommonModule {}
