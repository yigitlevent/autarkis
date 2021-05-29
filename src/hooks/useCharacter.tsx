import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Checkbox, Dot, Toggle, PseudoCheckbox, Text, Textarea, Select } from "../rulesets/_generic";
import { Rulesets } from "../rulesets/_rulesets";

import { CleanString } from "../function/utility";

import { useSheetDisplayType } from "./useSheetDisplayType";
import { DatabaseClient } from "./useQueries";

export function useCharacter(characterRuleset: aut.ruleset.Names, characterUUID?: string): aut.hooks.UseCharacterReturns {
	const [category] = useState("character");
	const [ruleset] = useState<aut.ruleset.Names>(characterRuleset);
	const [uuid] = useState<undefined | string>(characterUUID);
	const [rawData, setRawData] = useState<aut.server.Character>();
	const [displayType, setDisplayType] = useSheetDisplayType((characterUUID) ? "view" : "new");

	const generateDataLayout = useCallback((): aut.data.GenericCharacterDataLayout => {
		const newData: { [key: string]: { [key: string]: { [key: string]: Text | Toggle | Dot | Checkbox | PseudoCheckbox | Textarea | Select; }; }; } = {};
		const sheetLayout = (Rulesets.getRuleset(ruleset)).characterSheet;

		newData._primary.ruleset.text.current = characterRuleset;

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

		return newData;
	}, [characterRuleset, ruleset]);

	const setLoadedData = useCallback((characterRawData: aut.server.Character, layout: aut.data.GenericCharacterDataLayout): aut.data.GenericCharacterDataLayout => {
		const temp = characterRawData.data as any;

		for (const block in temp) {
			if (!layout[block]) continue;

			for (const row in temp[block]) {
				if (!layout[block][row]) continue;

				for (const type in temp[block][row]) {
					if (!layout[block][row][type]) continue;

					layout[block][row][type].current = temp[block][row][type].current;
				}
			}
		}

		layout._primary.uuid.text.current = characterRawData.uuid;
		layout._primary.ruleset.text.current = characterRawData.ruleset;
		layout._primary.editable.postcheckbox.current = characterRawData.editable;

		layout._primary.player_uuid.text.current = characterRawData.player_uuid;
		layout._primary.chronicle_uuid.text.current = characterRawData.player_uuid;

		layout._primary.created_at.text.current = characterRawData.created_at;
		layout._primary.updated_at.text.current = characterRawData.updated_at;

		return layout;
	}, []);

	const [data, setData] = useState<aut.data.GenericCharacterData>(generateDataLayout() as any);

	// TODO: This is a ruleset-specific calculation, it should be moved into the ruleset
	const calculateValues = useCallback((): void => {
		const tempData = data;

		// Everything that determined by Blood Potency
		const bloodPotency = tempData.the_blood?.blood_potency.dot.current as number;
		if (bloodPotency >= 0) {
			const row = (Rulesets.getRuleset("v5_modern")).characterMisc.bloodPotency[bloodPotency];

			tempData.the_blood.blood_surge.text.current = row["blood_surge"].toString();
			tempData.the_blood.mend_amount.text.current = row["mend_amount"].toString();
			tempData.the_blood.power_bonus.text.current = row["power_bonus"].toString();
			tempData.the_blood.rouse_check.text.current = row["rouse_check"].toString();
			tempData.the_blood.bane_severity.text.current = row["bane_severity"].toString();
			tempData.the_blood.feeding_penalty.textarea.current = row["feeding_penalty"];
		}

		if (tempData.the_blood) {
			// Health Calculation
			tempData.the_blood.health.dot.current = 3 + (tempData.attributes.stamina.dot.current as number);

			// Willpower Calculation
			tempData.the_blood.willpower.dot.current = (tempData.attributes.composure.dot.current as number) + (tempData.attributes.resolve.dot.current as number);
		}

		setData(tempData);
	}, [data]);

	const placeSheetData = useCallback((): void => {
		for (const block in data) {
			for (const row in data[block]) {
				for (const type in data[block][row]) {
					const tempDataRow = data[block][row];
					const value = data[block][row][type as keyof typeof tempDataRow].current;

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
							const amount = (data[block][row][type] as Checkbox | Dot)._amount;

							for (let i = 0; i < amount; i++) {
								const input = document.getElementById(`${block}.${row}.${type}.${i}`) as HTMLInputElement;
								if (input) input.checked = (i < value) ? true : false;
							}
						}

						if (type === "pseudocheckbox") {
							const length = (data[block][row][type].current as string[]).length;

							for (let i = 0; i < length; i++) {
								const input = document.getElementById(`${block}.${row}.${type}.${i}`) as HTMLInputElement;
								if (input) input.value = (value as string[])[i];
							}
						}
					}
				}
			}
		}
	}, [data]);

	const changeValue = useCallback((event: aut.Events): void => {
		const target = event.target as HTMLInputElement;
		const targetName = target.id; 					// "attributes.manipulation.dot.1" 
		const names = targetName.split("."); 			// [ "attributes", "manipulation", "dot", "1" ]
		const cleanName = names.slice(0, -1).join("."); // "attributes.manipulation.dot" 

		const block = names[0];
		const row = names[1];
		const type = names[2];
		const num = parseInt(names[3]);

		const tempData = data;

		if (type === "postcheckbox") {
			tempData[block][row].toggle.current = target.checked;
		}
		else if (type === "precheckbox") {
			tempData[block][row].toggle.current = target.checked;
		}
		else if (type === "text") {
			tempData[block][row].text.current = target.value;
		}
		else if (type === "textarea") {
			tempData[block][row].textarea.current = target.value;
		}
		else if (type === "dot" || type === "checkbox") {
			const max = (tempData[block][row][type] as aut.classes.Dot | aut.classes.Checkbox)._amount;

			for (let i = 0; i < num; i++) {
				(document.getElementById(`${cleanName}.${i}`) as HTMLInputElement).checked = true;
			}

			for (let i = num + 1; i < max; i++) {
				(document.getElementById(`${cleanName}.${i}`) as HTMLInputElement).checked = false;
			}

			if (num === 0 && !(target.checked)) {
				(tempData[block][row][type] as aut.classes.Dot | aut.classes.Checkbox).current = 0;
			}
			else {
				(tempData[block][row][type] as aut.classes.Dot | aut.classes.Checkbox).current = num + 1;
			}
		}
		else if (type === "pseudocheckbox") {
			const newValue = (tempData[block][row][type] as aut.classes.PseudoCheckbox).nextValue(num);
			(document.getElementById(targetName) as HTMLInputElement).value = newValue;
		}

		setData(tempData);
	}, [data]);

	const changeSelected = useCallback((options: rbs.Option[], id: string): void => {
		if (data) {
			const names = id.split("."); // [ "basics", "clan", "select" ]
			const block = names[0];
			const row = names[1];
			const type = names[2];

			const tempData = data;

			if (type === "select") tempData[block][row].select.current = options.map((v) => v.value);

			setData(tempData);
		}
	}, [data]);

	useEffect(() => {
		if (rawData) setData(setLoadedData(rawData, data) as any);
	}, [rawData, data, setLoadedData]);

	useEffect(() => {
		calculateValues();
		placeSheetData();
	}, [calculateValues, data, placeSheetData]);

	useEffect(() => {
		if (ruleset && uuid && !rawData) {
			DatabaseClient.from((category === "chronicle") ? "chronicles" : "characters")
				.select("*").eq("uuid", uuid).single()
				.then((response: any) => {
					if (response.error) return;
					setRawData(response as aut.server.Character);
				});
		}
	}, [category, rawData, ruleset, uuid]);

	const insert = useCallback((): Promise<void> => {
		const dataObject = {
			name: data.basics.name.text.current,
			player_name: DatabaseClient.auth.user()?.user_metadata.full_name,
			player_uuid: DatabaseClient.auth.user()?.id,
			ruleset: data._primary.ruleset.text.current,
			data: data
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").insert(dataObject)
				.then((response) => {
					if (response.error) { toast.error("Character cannot be inserted."); reject(); }
					else { toast.success("Character inserted."); resolve(); }
				});
		});
	}, [data]);

	const update = useCallback((): Promise<void> => {
		const dataObject = {
			data: data
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").update(dataObject)
				.match({ uuid: data._primary.uuid.text.current as string }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be updated."); reject(); }
					else { toast.success("Character updated."); resolve(); }
				});
		});
	}, [data]);

	const remove = useCallback((): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("characters").delete()
				.match({ uuid: data._primary.uuid.text.current as string }).single()
				.then((response) => {
					if (response.error) { toast.error("Character cannot be deleted."); reject(); }
					else { toast.success("Character deleted."); resolve(); }
				});
		});
	}, [data]);

	return [displayType, data, { setDisplayType, changeValue, changeSelected }, {  insert, update, remove }];
}
