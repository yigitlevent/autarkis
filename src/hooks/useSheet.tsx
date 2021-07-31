import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

import { Checkbox, Dot, Toggle, PseudoCheckbox, Text, Textarea, Select } from "../rulesets/_generic";
import { GenericChronicleSheet } from "../rulesets/GenericChronicle";
import { Rulesets } from "../rulesets/_rulesets";

import { CleanString } from "../function/utility";

import { DatabaseClient } from "../index";

import { useSheetDisplayType } from "./useSheetDisplayType";

export function useSheet(sheetCategory: aut.SheetCategory, sheetRuleset: aut.ruleset.Names, sheetUUID?: string): aut.hooks.UseSheetReturns {
	const [isLoaded, setIsLoaded] = useState(false);

	const [category] = useState<aut.SheetCategory>(sheetCategory);
	const [ruleset] = useState<aut.ruleset.Names>(sheetRuleset);
	const [uuid] = useState<undefined | string>(sheetUUID);
	const [rawData, setRawData] = useState<aut.server.DataReturn>();
	const [displayType, setDisplayType] = useSheetDisplayType((sheetUUID) ? "view" : "new");

	const [revision, newRevision] = useReducer((state: number): number => { return state + 1; }, 0);

	const generateDataLayout = useCallback((): aut.data.GenericDataLayout => {
		const newData: { [key: string]: { [key: string]: { [key: string]: Text | Toggle | Dot | Checkbox | PseudoCheckbox | Textarea | Select; }; }; } = {};
		const sheetLayout = (category === "character") ? (Rulesets.getRuleset(ruleset)).characterSheet : GenericChronicleSheet;

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
						newData[cleanBlockTitle][cleanRowTitle].pseudocheckbox = new PseudoCheckbox(row.pseudocheckbox.amount, row.pseudocheckbox.possibleValues);
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

		newData._primary.ruleset.text.current = sheetRuleset;

		return newData;
	}, [category, ruleset, sheetRuleset]);

	const generateLoadedData = useCallback((sheetRawData: aut.server.DataReturn, sheetLayout: aut.data.GenericDataLayout): aut.data.GenericDataLayout => {
		const temp = sheetRawData.data as any;

		for (const block in temp) {
			if (!sheetLayout[block]) continue;

			for (const row in temp[block]) {
				if (!sheetLayout[block][row]) continue;

				for (const type in temp[block][row]) {
					if (!sheetLayout[block][row][type]) continue;

					sheetLayout[block][row][type].current = temp[block][row][type].current;
				}
			}
		}

		return sheetLayout;
	}, []);

	const [data, setData] = useState<aut.data.GenericData>(generateDataLayout() as any);

	const calculateValues = useCallback((sheetData: aut.data.GenericData): aut.data.GenericData => {
		if (category === "character") return Rulesets.getRuleset(ruleset).characterCalculations(sheetData);
		return sheetData;
	}, [category, ruleset]);

	useEffect(() => {
		if (!isLoaded && (rawData || !uuid)) {
			if (rawData) {
				setData({ ...calculateValues(generateLoadedData(rawData, data) as any) });
			}
			setIsLoaded(true);
		}
		newRevision();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculateValues, rawData, generateLoadedData]);

	/*useEffect(() => {
		console.log(revision);
		//setData({ ...calculateValues(data) });
	}, [revision]);*/

	useEffect(() => {
		if (ruleset && uuid && !rawData) {
			DatabaseClient.from((category === "campaign") ? "campaigns" : "characters")
				.select("*").eq("uuid", uuid).single()
				.then((response: any) => {
					if (response.error) return;
					setRawData(response.data as aut.server.DataReturn);
				});
		}
	}, [category, rawData, ruleset, uuid]);

	const update = useCallback((internalData?: aut.data.GenericData): Promise<void> => {
		const dataObject: aut.server.DataUpdate = (internalData) ? { data: internalData } : { data: data };

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from((category === "character") ? "characters" : "campaigns").update(dataObject)
				.match((internalData)
					? { uuid: internalData._primary.uuid.text.current as string }
					: { uuid: data._primary.uuid.text.current as string }
				)
				.single()
				.then((response) => {
					if (response.error) {
						toast.error("Sheet cannot be updated.");
						reject();
					}
					else {
						toast.success("Sheet updated.");
						resolve();
					}
				});
		});
	}, [category, data]);

	const insert = useCallback((): Promise<void> => {
		const dataObject: aut.server.DataInsert = {
			name: data.basics.name.text.current,
			user_uuid: DatabaseClient.auth.user()?.id as string,
			data: data
		};

		dataObject.data.basics.user.text.current = DatabaseClient.auth.user()?.user_metadata.full_name;

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from((category === "character") ? "characters" : "campaigns").insert(dataObject)
				.then((response) => {
					if (response.error) {
						toast.error("Sheet cannot be inserted.");
						reject();
					}
					else {
						const tempData = response.data[0].data;

						tempData._primary.uuid.text.current = response.data[0].uuid;
						tempData._primary.user_uuid.text.current = response.data[0].user_uuid;

						tempData._primary.created_at.text.current = response.data[0].created_at;
						tempData._primary.updated_at.text.current = response.data[0].updated_at;

						const calculatedData = calculateValues(tempData as any);
						setData({ ...calculatedData });
						update({ ...calculatedData });

						resolve();
					}
				});
		});
	}, [calculateValues, category, data, update]);

	const remove = useCallback((): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from((category === "character") ? "characters" : "campaigns").delete()
				.match({ uuid: data._primary.uuid.text.current as string }).single()
				.then((response) => {
					if (response.error) { toast.error("Sheet cannot be deleted."); reject(); }
					else { toast.success("Sheet deleted."); resolve(); }
				});
		});
	}, [category, data._primary.uuid.text]);

	return { displayType, data, setDisplayType, newRevision, database: { insert, update, remove }, isLoaded };
}
