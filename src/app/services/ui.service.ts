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
	private selectedModeSubject = new BehaviorSubject<"scales" | "chords">("scales");
	selectedMode$ = this.selectedModeSubject.asObservable();

	triggerCollapseAll() {
		this.collapseAllSubject.next();
	}

	setGuitarLabel(label: string) {
		this.guitarLabelSubject.next(label);
	}

	setSelectedMode(mode: "scales" | "chords") {
		this.selectedModeSubject.next(mode);
	}
}
