import { Component } from "@angular/core";

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
		// {
		// 	title: "Inicio",
		// 	link: "home",
		// 	icon: "home"
		// },
		// {
		// 	title: "Tabla",
		// 	link: "table",
		// 	icon: "table_chart"
		// },
		// {
		// 	title: "Drag & Drop",
		// 	link: "drag-and-drop",
		// 	icon: "table_chart"
		// },
		// {
		// 	title: "Api Rest",
		// 	link: "rest",
		// 	icon: "compare_arrows"
		// }
	];

	opened: boolean = true;
}
