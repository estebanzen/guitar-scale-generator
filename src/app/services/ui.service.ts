import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UiService {
	private collapseAllSubject = new Subject<void>();
	collapseAll$ = this.collapseAllSubject.asObservable();

	triggerCollapseAll() {
		this.collapseAllSubject.next();
	}
}
