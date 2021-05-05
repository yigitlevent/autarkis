import { toast } from "react-toastify";

import { Checkbox, Dot } from "../rulesets/_generic";
import { Rulesets } from "../rulesets/_rulesets";

import { RollDicePool } from "../function/rollDicePool";
import { CleanString } from "../function/utility";

import { DatabaseClient } from "../hooks/useQueries";

export class Character implements aut.classes.Character {
	readonly type = "character";
	readonly editable: boolean = true;

	data;

	constructor(rawData: undefined | aut.server.Character, ruleset: aut.ruleset.Names) {
		this.data = new (Rulesets.getRuleset(ruleset)).character();
		this.data._primary.ruleset.text.current = ruleset;

		if (rawData) {
			const temp = rawData.data as any;

			for (const block in temp) {
				if (!this.data[block]) continue;

				for (const row in temp[block]) {
					if (!this.data[block][row]) continue;

					for (const type in temp[block][row]) {
						if (!this.data[block][row][type]) continue;

						this.data[block][row][type].current = temp[block][row][type].current;
					}
				}
			}

			console.log(this.data);
		}

		this.calculateValues();
		this.placeSheetData();
	}

	changeValue(event: aut.short.Events): void {
		const target = event.target as HTMLInputElement;
		const targetName = target.id; 				// "c.attributes.manipulation.dot.1" 
		const names = targetName.split("."); 			// [ "c", "attributes", "manipulation", "dot", "1" ]
		const cleanName = names.slice(0, -1).join("."); // "c.attributes.manipulation.dot" 

		const block = names[1];
		const row = names[2];
		const type = names[3];
		const num = parseInt(names[4]);

		if (block !== "_primary") {
			if (type === "precheckbox") {
				(this.data[block][row][type] as aut.classes.PreCheckbox).current = target.checked;
			}

			if (type === "text") {
				(this.data[block][row][type] as aut.classes.Text).current = target.value;
			}

			if (type === "textarea") {
				(this.data[block][row][type] as aut.classes.Textarea).current = target.value;
			}

			if (type === "dot" || type === "checkbox") {
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

			if (type === "pseudocheckbox") {
				const newValue = (this.data[block][row][type] as aut.classes.PseudoCheckbox).nextValue(num);
				(document.getElementById(targetName) as HTMLInputElement).value = newValue;
			}
		}

		this.calculateValues();
		this.placeSheetData();
	}

	placeSheetData(): void {
		for (const block in this.data) {
			if (block === "_primary") continue;

			for (const row in this.data[block]) {
				for (const type in this.data[block][row]) {
					const value = this.data[block][row][type].current;

					if (value) {
						if (type === "precheckbox") {
							const input = document.getElementById(`c.${block}.${row}.${type}`) as HTMLInputElement;
							if (input) input.checked = value as boolean;
						}

						if (type === "text" || type === "textarea") {
							const input = document.getElementById(`c.${block}.${row}.${type}`) as HTMLInputElement;
							if (input) input.value = value as string;
						}

						if (type === "dot" || type === "checkbox") {
							const amount = (this.data[block][row][type] as Checkbox | Dot)._amount;

							for (let i = 0; i < amount; i++) {
								const input = document.getElementById(`c.${block}.${row}.${type}.${i}`) as HTMLInputElement;
								if (input) input.checked = (i < value) ? true : false;
							}
						}

						if (type === "pseudocheckbox") {
							const length = (this.data[block][row][type].current as string[]).length;

							for (let i = 0; i < length; i++) {
								const input = document.getElementById(`c.${block}.${row}.${type}.${i}`) as HTMLInputElement;
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

		if (this.data.basics.name.text.current.length > 0) {
			const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
			const downloadAnchorNode = document.createElement("a");
			downloadAnchorNode.setAttribute("href", dataStr);
			downloadAnchorNode.setAttribute("download", `${CleanString(this.data.basics.name.text.current)}.char.autarkis`);
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
				.match({ uuid: this.data._primary.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be updated."); reject(); }
					else { toast.success("Character updated."); resolve(); }
				});
		});
	}

	delete(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").delete()
				.match({ uuid: this.data._primary.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be deleted."); reject(); }
					else { toast.success("Character deleted."); resolve(); }
				});
		});
	}

	rollStandard(title: string, difficulty: number, pool: number, hasHunger: boolean, hasSurge: boolean, rouse: number, offline: boolean): string {
		const message = {
			charName: this.data.basics.name.text.current,
			charKey: this.data._primary.uuid.text.current,
			title: title,
			results: "",
			difficulty: "",
			normalResults: "",
			hungerResults: "",
			infoRouse: "",
			infoWillpower: ""
		};

		message.difficulty = difficulty.toString();

		const hungerPool: number = (hasHunger) ? this.data.the_blood.hunger.checkbox.current as number : 0;

		const normalRoll: aut.data.Roll = RollDicePool(Math.max(0, pool - hungerPool));
		const hungerRoll: aut.data.Roll = RollDicePool(Math.min(pool, hungerPool));

		const totalSuccesses: number = normalRoll.successes + hungerRoll.successes + Math.floor(normalRoll.tens / 2);

		if (totalSuccesses < difficulty) {
			if (hungerRoll.ones > 0) { message.results = "Bestial Failure"; }
			else { message.results = "Failure"; }
		}
		else {
			if ((normalRoll.tens > 0 && hungerRoll.tens > 0) || hungerRoll.tens > 1) message.results = "Messy Critical";
			else if (normalRoll.tens > 1) message.results = "Critical";
			else message.results = "Success";
		}

		if (normalRoll.results.length > 0) message.normalResults = normalRoll.results.join(", ");
		if (hungerRoll.results.length > 0) message.hungerResults = hungerRoll.results.join(", ");

		// const charRouseAmount = parseInt(this.data.theb_lood.rouseCheck.text.current);

		if (hasSurge && rouse > 0) {
			message.infoRouse = `Make ${rouse + 1} Rouse Checks.`;
		}
		else if (rouse > 0) {
			message.infoRouse = `Make ${rouse} Rouse Check${(rouse > 1) ? "s" : ""}.`;
		}
		else if (hasSurge) {
			message.infoRouse = "Make a Rouse Check.";
		}

		// TODO: Do not forget to check for roll results to see if willpower is possible as per issue #21
		// message.infoWillpower = "May spend Willpower for rerolls.";

		const result = `
			${message.results}. 
			${(message.normalResults) ? `Normal Dice: ${message.normalResults}.` : ""}
			${(message.hungerResults) ? `Hunger Dice: ${message.hungerResults}.` : ""}
			${(message.infoRouse) ? `${message.infoRouse}` : ""}
			${(message.infoWillpower) ? `${message.infoWillpower}` : ""}
		`;

		if (!offline) this.sendRoll(message);

		return result;
	}

	rollCheck(title: string, difficulty: number, pool: number, offline: boolean): string {
		const message = {
			charName: this.data.basics.name.text.current,
			charKey: this.data._primary.uuid.text.current,
			title: title,
			results: "",
			difficulty: "",
			normalResults: "",
			hungerResults: "",
			infoRouse: "",
			infoWillpower: ""
		};

		difficulty = Math.max(difficulty, 1);
		message.difficulty = difficulty.toString();

		const normalRoll = RollDicePool(pool);

		if (normalRoll.successes >= difficulty) {
			if (normalRoll.tens >= 2) { message.results = "Critical"; }
			else { message.results = "Success"; }
		}
		else { message.results = "Failure"; }

		message.normalResults = normalRoll.results.join(", ");

		const result = `
			${message.results}. 
			${(message.normalResults) ? `Normal Dice: ${message.normalResults}.` : ""}
			${(message.hungerResults) ? `Hunger Dice: ${message.hungerResults}.` : ""}
			${(message.infoRouse) ? `${message.infoRouse}` : ""}
			${(message.infoWillpower) ? `${message.infoWillpower}` : ""}
		`;

		if (!offline) this.sendRoll(message);

		return result;
	}

	rollCompulsion(title: string, offline: boolean): string {
		const message = {
			charName: this.data.basics.name.text.current,
			charKey: this.data._primary.uuid.text.current,
			title: title,
			results: "",
			difficulty: "",
			normalResults: "",
			hungerResults: "",
			infoRouse: "",
			infoWillpower: ""
		};

		const number = RollDicePool(1).results[0];

		if (number < 4) message.results = "Hunger";
		else if (number < 6) message.results = "Dominance";
		else if (number < 8) message.results = "Harm";
		else if (number < 10) message.results = "Paranoia";
		else message.results = "Clan Compulsion";

		message.normalResults = number.toString();

		const result = `
			${message.results}. 
			${(message.normalResults) ? `Normal Dice: ${message.normalResults}.` : ""}
			${(message.hungerResults) ? `Hunger Dice: ${message.hungerResults}.` : ""}
			${(message.infoRouse) ? `${message.infoRouse}` : ""}
			${(message.infoWillpower) ? `${message.infoWillpower}` : ""}
		`;

		if (!offline) this.sendRoll(message);

		return result;
	}

	private sendRoll(message: any): void {
		if (this.data._primary.chronicle_uuid.text.current === "") {
			toast.error("Character does not have a Chronicle.");
		}
		else {
			

			/*MakeRequest("/dice/roll", { ...message })
				.then(undefined)
				.catch(() => toast.error("Could not send the result to the Discord."));*/
		}
	}

	// TODO: This is a ruleset-specific calculation, it should be moved into the ruleset
	private calculateValues(): void {
		// Everything that determined by Blood Potency
		const bloodPotency = this.data.the_blood?.blood_potency.dot.current as number;
		if (bloodPotency >= 0) {
			const row = (Rulesets.getRuleset("v5_modern")).misc.bloodPotency[bloodPotency];

			this.data.the_blood.blood_surge.text.current = row["blood_surge"].toString();
			this.data.the_blood.mend_amount.text.current = row["mend_amount"].toString();
			this.data.the_blood.power_bonus.text.current = row["power_bonus"].toString();
			this.data.the_blood.rouse_check.text.current = row["rouse_check"].toString();
			this.data.the_blood.bane_severity.text.current = row["bane_severity"].toString();
			this.data.the_blood.feeding_penalty.textarea.current = row["feeding_penalty"];
		}

		if (this.data.the_blood) {
			// Health Calculation
			this.data.the_blood.health.dot.current = 3 + this.data.attributes.stamina.dot.current;

			// Willpower Calculation
			this.data.the_blood.willpower.dot.current = this.data.attributes.composure.dot.current + this.data.attributes.resolve.dot.current;
		}
	}
}
