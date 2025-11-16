import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

// Si en el futuro querés agregar sets personalizados,
// SVG icons, registry, etc., lo metemos acá.

@NgModule({
	exports: [MatIconModule],
})
export class IconsModule {}
