import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-scales",
	templateUrl: "./scales.component.html",
	styleUrls: ["./scales.component.scss"],
})
export class ScalesComponent implements OnInit {
	//#region vars

	showGuitar: boolean = true;
	showPiano: boolean = true;

	// menu
	panelOpenState = false;

	notes = [
		{
			noteStr: "C",
			active: false,
			root: false,
		},
		{
			noteStr: "C#",
			active: false,
			root: false,
		},
		{
			noteStr: "D",
			active: false,
			root: false,
		},
		{
			noteStr: "D#",
			active: false,
			root: false,
		},
		{
			noteStr: "E",
			active: false,
			root: false,
		},
		{
			noteStr: "F",
			active: false,
			root: false,
		},
		{
			noteStr: "F#",
			active: false,
			root: false,
		},
		{
			noteStr: "G",
			active: false,
			root: false,
		},
		{
			noteStr: "G#",
			active: false,
			root: false,
		},
		{
			noteStr: "A",
			active: false,
			root: false,
		},
		{
			noteStr: "A#",
			active: false,
			root: false,
		},
		{
			noteStr: "B",
			active: false,
			root: false,
		},
	];

	cuerdas = ["E", "B", "G", "D", "A", "E"];

	noteRootValue: any;
	showGuitarOptions: any;

	cantidadTrastes: number = 24;
	cantidadTrastesArr: any = [];
	showPianoOptions: any;
	showOptions = true;
	sliderColor = "primary";
	// cantidadCuerdas: number = 6;
	puntitos: any = {
		3: 1,
		5: 1,
		7: 1,
		9: 1,
		12: 2,
		15: 1,
		17: 1,
		19: 1,
		21: 1,
		24: 2,
	};

	diapason: any = [];

	pianoCantidadTeclas: number = 22;
	pianoTeclas: any = [];

	//#endregion vars

	//#region methods
	constructor() {
		console.clear();
		var t = this;

		t.diapasonConstructor();
		t.pianoConstructor();
	}

	ngOnInit() {}

	renderPuntitosGuitarClassCss(nroTraste: number) {
		var t = this;
		return t.puntitos[nroTraste];
	}

	onClickNoteRoot(noteRootValue: any, index: any) {
		var t = this;

		t.notes.forEach((childObj) => {
			if (noteRootValue.noteStr == childObj.noteStr) {
				childObj.root = true;
				childObj.active = true;
			} else {
				childObj.root = false;
			}
		});

		t.noteRootValue = index;
	}

	diapasonConstructor() {
		var t = this;

		t.diapason = [];

		for (let index = 0; index < t.cuerdas.length; index++) {
			// t.cantidadTrastesArr.push(index);
			// console.log('index: ', index)
			// console.log('t.cuerdas[index]: ', t.cuerdas[index])

			let noteIndex = t.notes.findIndex(
				(eee) => eee.noteStr === t.cuerdas[index]
			);

			// console.log('noteIndex: ', noteIndex);

			var r = noteIndex;
			let stringtopush = [];

			// se crea la cuerda
			for (let n = 0; n < t.cantidadTrastes; n++) {
				// stringtopush
				// t.diapason.push(t.notes[r]);
				stringtopush.push(t.notes[r]);

				// if

				if (r == 11) {
					r = 0;
				} else {
					r++;
				}

				// if{ noteIndex<= t.notes.length}
				// noteIndex++
			}

			t.diapason.push(stringtopush);
		}
		t.cantidadTrastesConstructor();
	}

	onClickNote(note: any) {
		var t = this;

		for (let index = 0; index < t.notes.length; index++) {
			if (note.noteStr === t.notes[index].noteStr) {
				t.notes[index].active = !t.notes[index].active;
			}
		}
		t.diapasonConstructor();
		t.pianoConstructor();
	}

	pianoConstructor() {
		var t = this;
		t.pianoTeclas = [];

		var r = 0;

		for (let i = 0; i < t.pianoCantidadTeclas; i++) {
			var formatClassesCss: any = t.notes[r];
			formatClassesCss["classes"] = t.notes[r].noteStr
				.toLowerCase()
				.replace("#", "-s");

			t.pianoTeclas.push(formatClassesCss);
			// console.log('formatClassesCss ', formatClassesCss);

			if (r == 11) {
				r = 0;
			} else {
				r++;
			}
		}
	}

	cantidadTrastesConstructor() {
		var t = this;

		t.cantidadTrastesArr = [];

		for (let index = 0; index < t.cantidadTrastes; index++) {
			t.cantidadTrastesArr.push(index);
		}
	}

	onClickAddString() {
		this.cuerdas.push("");
	}

	onClickDeleteString() {
		this.cuerdas.pop();
	}

	//#endregion
}
