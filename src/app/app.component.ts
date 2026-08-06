import { Component, OnInit } from "@angular/core";
import { UiService } from "./services/ui.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	title = "guitar-tools";
	over: any;

	isDarkTheme = false;

	constructor(public uiService: UiService) {}

	ngOnInit() {
		this.isDarkTheme = localStorage.getItem("theme") === "dark";
		this.applyTheme();
	}

	collapseAllPanels() {
		this.uiService.triggerCollapseAll();
	}

	toggleDarkTheme() {
		this.isDarkTheme = !this.isDarkTheme;
		this.applyTheme();
		localStorage.setItem("theme", this.isDarkTheme ? "dark" : "light");
	}

	private applyTheme() {
		document.body.classList.toggle("dark-theme", this.isDarkTheme);
	}
}
