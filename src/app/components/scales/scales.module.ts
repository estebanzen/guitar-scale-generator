import { NgModule } from "@angular/core";
import { ScalesComponent } from "./scales.component";
import { GuitarComponent } from "../guitar/guitar.component";
import { PianoComponent } from "../piano/piano.component";
import { CommonModule } from "src/app/common/common.module";

@NgModule({
	declarations: [ScalesComponent, GuitarComponent, PianoComponent],
	imports: [CommonModule],
	exports: [ScalesComponent, GuitarComponent, PianoComponent],
})
export class ScalesModule {}
