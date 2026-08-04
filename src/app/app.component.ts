import { Component } from "@angular/core";
import { UiService } from "./services/ui.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "guitar-tools";
	over: any;
	menus = [
		{
			title: "SCALES",
			link: ".",
			icon: "home",
		},
	];

	opened: boolean = true;

	constructor(public uiService: UiService) {}

	collapseAllPanels() {
		this.uiService.triggerCollapseAll();
	}
}
