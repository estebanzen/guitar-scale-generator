import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UiService {
	private collapseAllSubject = new Subject<void>();
	collapseAll$ = this.collapseAllSubject.asObservable();
	private guitarLabelSubject = new BehaviorSubject<string>("");
	guitarLabel$ = this.guitarLabelSubject.asObservable();

	triggerCollapseAll() {
		this.collapseAllSubject.next();
	}

	setGuitarLabel(label: string) {
		this.guitarLabelSubject.next(label);
	}
}
