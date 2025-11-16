import { NgModule } from "@angular/core";
// import { CommonModule } from "../common/common.module";
import { ScalesComponent } from "./scales.component";
import { CommonModule } from "src/app/common/common.module";

@NgModule({
	declarations: [ScalesComponent],
	imports: [CommonModule],
})
export class ScalesModule {}
