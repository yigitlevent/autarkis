import { toast } from "react-toastify";

import { Checkbox, Dot, Toggle, PseudoCheckbox, Text, Textarea, Select } from "../rulesets/_generic";
import { Rulesets } from "../rulesets/_rulesets";

import { CleanString } from "../function/utility";

import { DatabaseClient } from "../hooks/useQueries";

export class Character implements aut.classes.Character {
	readonly type = "character";
	readonly uuid;
	readonly ruleset;

	readonly editable: boolean = true;

	data: aut.short.GenericCharacterData = {};

	constructor(rawData: undefined | aut.server.Character, ruleset: aut.ruleset.Names) {
		this.uuid = rawData?.uuid;
		this.ruleset = rawData?.ruleset;

		// Auto-generate data layout from sheet layout
		const newData: { [key: string]: { [key: string]: { [key: string]: Text | Toggle | Dot | Checkbox | PseudoCheckbox | Textarea | Select; }; }; } = {};
		const sheetLayout = (Rulesets.getRuleset(ruleset)).characterSheet;
		for (const blockKey in sheetLayout) {
			const block = sheetLayout[blockKey];
			const cleanBlockTitle = CleanString(block.title);
			const columns = block.columns;

			if (!(cleanBlockTitle in newData)) newData[cleanBlockTitle] = {};

			for (const columnKey in columns) {
				const column = columns[columnKey];

				for (const rowKey in column) {
					const row = column[rowKey];
					const cleanRowTitle = CleanString(row.title);

					if (!(cleanRowTitle in newData[cleanBlockTitle])) newData[cleanBlockTitle][cleanRowTitle] = {};

					if (row.inputs.includes("text")) {
						newData[cleanBlockTitle][cleanRowTitle].text = new Text();
					}
					if (row.inputs.includes("number")) {
						newData[cleanBlockTitle][cleanRowTitle].number = new Text();
					}
					if (row.inputs.includes("dot") && row.dot) {
						newData[cleanBlockTitle][cleanRowTitle].dot = new Dot(row.dot.amount);
					}
					if (row.inputs.includes("checkbox") && row.checkbox) {
						newData[cleanBlockTitle][cleanRowTitle].checkbox = new Checkbox(row.checkbox.amount);
					}
					if (row.inputs.includes("precheckbox")) {
						newData[cleanBlockTitle][cleanRowTitle].precheckbox = new Toggle();
					}
					if (row.inputs.includes("postcheckbox")) {
						newData[cleanBlockTitle][cleanRowTitle].postcheckbox = new Toggle();
					}
					if (row.inputs.includes("pseudocheckbox") && row.pseudocheckbox) {
						newData[cleanBlockTitle][cleanRowTitle].pseudocheckbox = new PseudoCheckbox(row.pseudocheckbox.amount, row.pseudocheckbox.possibleValues, ruleset);
					}
					if (row.inputs.includes("textarea")) {
						newData[cleanBlockTitle][cleanRowTitle].textarea = new Textarea();
					}
					if (row.inputs.includes("select")) {
						newData[cleanBlockTitle][cleanRowTitle].select = new Select();
					}
				}
			}
		}

		this.data = newData as any;
		this.data._primary.ruleset.text.current = ruleset;

		if (rawData) {
			const temp = rawData.data;

			for (const block in temp) {
				if (!this.data[block]) continue;

				for (const row in temp[block]) {
					if (!this.data[block][row]) continue;

					for (const type in temp[block][row]) {
						const tempRawRow = temp[block][row];
						const tempDataRow = this.data[block][row];

						this.data[block][row][type as keyof typeof tempDataRow].current = temp[block][row][type as keyof typeof tempRawRow].current;
					}
				}
			}

			this.data._primary.uuid.text.current = rawData.uuid;
			this.data._primary.ruleset.text.current = rawData.ruleset;
			this.data._primary.editable.toggle.current = rawData.editable;

			this.data._primary.player_uuid.text.current = rawData.player_uuid;
			this.data._primary.chronicle_uuid.text.current = rawData.player_uuid;

			this.data._primary.created_at.text.current = rawData.created_at;
			this.data._primary.updated_at.text.current = rawData.updated_at;

			console.log(this.data);
		}

		this.calculateValues();
		this.placeSheetData();
	}

	changeValue(event: aut.short.Events): void {
		const target = event.target as HTMLInputElement;
		const targetName = target.id; 					// "attributes.manipulation.dot.1" 
		const names = targetName.split("."); 			// [ "attributes", "manipulation", "dot", "1" ]
		const cleanName = names.slice(0, -1).join("."); // "attributes.manipulation.dot" 

		const block = names[0];
		const row = names[1];
		const type = names[2];
		const num = parseInt(names[3]);

		if (type === "postcheckbox") {
			this.data[block][row].toggle.current = target.checked;
		}
		else if (type === "precheckbox") {
			this.data[block][row].toggle.current = target.checked;
		}
		else if (type === "text") {
			this.data[block][row].text.current = target.value;
		}
		else if (type === "textarea") {
			this.data[block][row].textarea.current = target.value;
		}
		else if (type === "dot" || type === "checkbox") {
			const max = (this.data[block][row][type] as aut.classes.Dot | aut.classes.Checkbox)._amount;

			for (let i = 0; i < num; i++) {
				(document.getElementById(`${cleanName}.${i}`) as HTMLInputElement).checked = true;
			}

			for (let i = num + 1; i < max; i++) {
				(document.getElementById(`${cleanName}.${i}`) as HTMLInputElement).checked = false;
			}

			if (num === 0 && !(target.checked)) {
				(this.data[block][row][type] as aut.classes.Dot | aut.classes.Checkbox).current = 0;
			}
			else {
				(this.data[block][row][type] as aut.classes.Dot | aut.classes.Checkbox).current = num + 1;
			}
		}
		else if (type === "pseudocheckbox") {
			const newValue = (this.data[block][row][type] as aut.classes.PseudoCheckbox).nextValue(num);
			(document.getElementById(targetName) as HTMLInputElement).value = newValue;
		}

		this.calculateValues();
		this.placeSheetData();
	}

	changeSelected(options: rbs.Option[], id: string): void {
		const names = id.split("."); // [ "basics", "clan", "select" ]

		const block = names[0];
		const row = names[1];
		const type = names[2];

		if (type === "select") {
			(this.data[block][row][type] as aut.classes.Select).current = options.map((v) => v.value);
		}

		this.calculateValues();
	}

	placeSheetData(): void {
		for (const block in this.data) {
			for (const row in this.data[block]) {
				for (const type in this.data[block][row]) {
					const tempDataRow = this.data[block][row];
					const value = this.data[block][row][type as keyof typeof tempDataRow].current;

					if (value) {
						if (type === "precheckbox" || type === "postcheckbox") {
							const input = document.getElementById(`${block}.${row}.${type}`) as HTMLInputElement;
							if (input) input.checked = value as boolean;
						}

						if (type === "text" || type === "textarea") {
							const input = document.getElementById(`${block}.${row}.${type}`) as HTMLInputElement;
							if (input) input.value = value as string;
						}

						if (type === "dot" || type === "checkbox") {
							const amount = (this.data[block][row][type] as Checkbox | Dot)._amount;

							for (let i = 0; i < amount; i++) {
								const input = document.getElementById(`${block}.${row}.${type}.${i}`) as HTMLInputElement;
								if (input) input.checked = (i < value) ? true : false;
							}
						}

						if (type === "pseudocheckbox") {
							const length = (this.data[block][row][type].current as string[]).length;

							for (let i = 0; i < length; i++) {
								const input = document.getElementById(`${block}.${row}.${type}.${i}`) as HTMLInputElement;
								if (input) input.value = (value as string[])[i];
							}
						}
					}
				}
			}
		}
	}

	export(event: React.FormEvent<HTMLInputElement>): void {
		event.preventDefault();

		const name = this.data.basics.name.text.current as string;

		if (name.length > 0) {
			const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
			const downloadAnchorNode = document.createElement("a");
			downloadAnchorNode.setAttribute("href", dataStr);
			downloadAnchorNode.setAttribute("download", `${CleanString(name)}.char.autarkis`);
			document.body.appendChild(downloadAnchorNode); // required for firefox
			downloadAnchorNode.click();
			downloadAnchorNode.remove();

			toast.success("Character file exported.");
		}
		else { toast.error("Please enter a valid character name."); }
	}

	import(event: React.ChangeEvent<HTMLInputElement>): void {
		const file = new FileReader();
		file.readAsText((event.target.files as FileList)[0], "UTF-8");

		file.addEventListener("load", (e) => {
			if (e && e.target && e.target.result) {
				this.data = JSON.parse(e.target.result as string);
				this.calculateValues();
				this.placeSheetData();
				toast.success("Character file imported.");
			}
		});
	}

	insert(): Promise<void> {
		const data = {
			name: this.data.basics.name.text.current,
			player_name: DatabaseClient.auth.user()?.user_metadata.full_name,
			player_uuid: DatabaseClient.auth.user()?.id,
			ruleset: this.data._primary.ruleset.text.current,
			data: this.data
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").insert(data)
				.then((response) => {
					if (response.error) { toast.error("Character cannot be inserted."); reject(); }
					else { toast.success("Character inserted."); resolve(); }
				});
		});
	}

	update(): Promise<void> {
		const data = {
			data: this.data
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").update(data)
				.match({ uuid: this.data._primary.uuid.text.current as string }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be updated."); reject(); }
					else { toast.success("Character updated."); resolve(); }
				});
		});
	}

	delete(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").delete()
				.match({ uuid: this.data._primary.uuid.text.current as string }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be deleted."); reject(); }
					else { toast.success("Character deleted."); resolve(); }
				});
		});
	}

	// TODO: This is a ruleset-specific calculation, it should be moved into the ruleset
	private calculateValues(): void {
		// Everything that determined by Blood Potency
		const bloodPotency = this.data.the_blood?.blood_potency.dot.current as number;
		if (bloodPotency >= 0) {
			const row = (Rulesets.getRuleset("v5_modern")).characterMisc.bloodPotency[bloodPotency];

			this.data.the_blood.blood_surge.text.current = row["blood_surge"].toString();
			this.data.the_blood.mend_amount.text.current = row["mend_amount"].toString();
			this.data.the_blood.power_bonus.text.current = row["power_bonus"].toString();
			this.data.the_blood.rouse_check.text.current = row["rouse_check"].toString();
			this.data.the_blood.bane_severity.text.current = row["bane_severity"].toString();
			this.data.the_blood.feeding_penalty.textarea.current = row["feeding_penalty"];
		}

		if (this.data.the_blood) {
			// Health Calculation
			this.data.the_blood.health.dot.current = 3 + (this.data.attributes.stamina.dot.current as number);

			// Willpower Calculation
			this.data.the_blood.willpower.dot.current = (this.data.attributes.composure.dot.current as number) + (this.data.attributes.resolve.dot.current as number);
		}
	}
}
