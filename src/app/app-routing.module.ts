import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./modules/not-found/not-found.component";
// import { ApiRestComponent } from "./modules/api-rest/api-rest.component";
// import { TableComponent } from "./modules/table/table.component";
// import { DragAndDropTestComponent } from "./modules/drag-and-drop-test/drag-and-drop-test.component";
import { ScalesComponent } from "./components/scales/scales.component";
// import { DragAndDropTestComponent } from "./drag-and-drop-test/drag-and-drop-test.component";

// const routes: Routes = [];
const routes: Routes = [
	{
		path: "",
		component: ScalesComponent,
	},
	// {
	// 	path: "home",
	// 	component: HomeComponent,
	// },
	// {
	// 	path: "rest",
	// 	component: ApiRestComponent,
	// },
	// {
	// 	path: "table",
	// 	component: TableComponent,
	// },
	// {
	// 	path: "drag-and-drop",
	// 	component: DragAndDropTestComponent,
	// },
	{
		path: "not-found",
		component: NotFoundComponent,
	},
	{
		path: "**",
		redirectTo: "not-found",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
