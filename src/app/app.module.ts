// src/app/app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./modules/footer/footer.component";
import { MaterialModule } from "./material/material.module";
import { IconsModule } from "./icons/icons.module";
import { HeaderModule } from "./modules/header/header.module";
import { AppRoutingModule } from "./app-routing.module";
// ...otros imports

@NgModule({
	declarations: [AppComponent, FooterComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		MaterialModule,
		IconsModule,
		HeaderModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
