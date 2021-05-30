import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";

import { GenericChronicle } from "../rulesets/GenericChronicle";

import { useSheetDisplayType } from "./useSheetDisplayType";
import { DatabaseClient } from "./useQueries";

export function useChronicle(chronicleRuleset: aut.ruleset.Names, chronicleUUID?: string): aut.hooks.UseChronicleReturns {
	const [isLoaded, setIsLoaded] = useState(false);

	const [category] = useState("chronicle");
	const [ruleset] = useState<aut.ruleset.Names>(chronicleRuleset);
	const [uuid] = useState<undefined | string>(chronicleUUID);
	const [rawData, setRawData] = useState<aut.server.Chronicle>();
	const [displayType, setDisplayType] = useSheetDisplayType((chronicleUUID) ? "view" : "new");

	const [revision, incrementRevision] = useReducer((state: number): number => { return state + 1; }, 0);

	const generateDataLayout = useCallback((): aut.data.GenericCharacterDataLayout => {
		const sheetLayout = new GenericChronicle();

		sheetLayout.ruleset.text.current = chronicleRuleset;
		if (uuid) sheetLayout.uuid.text.current = uuid;

		return sheetLayout;
	}, [chronicleRuleset, uuid]);

	const setLoadedData = useCallback((chronicleRawData: aut.server.Chronicle, layout: aut.data.GenericCharacterDataLayout): aut.data.GenericCharacterDataLayout => {
		if (rawData) {
			for (const key in chronicleRawData) {
				const keyProper = key as keyof typeof chronicleRawData;
				if (typeof chronicleRawData[keyProper] === "boolean") layout[key].toggle.current = chronicleRawData[keyProper];
				if (typeof chronicleRawData[keyProper] === "string") layout[key].text.current = chronicleRawData[keyProper];
			}
		}

		return layout;
	}, [rawData]);

	const [data, setData] = useState<aut.data.GenericChronicleData>(generateDataLayout() as any);

	const changeValue = useCallback((event: aut.Events): void => {
		const target = event.target as HTMLInputElement;
		const targetID = target.id; 			// "basics.name" 
		const name = targetID.split(".")[0]; 	// "basics"

		const tempData = data;

		if (target.type === "checkbox") tempData[name].toggle.current = target.checked;
		else if (target.type === "text") tempData[name].text.current = target.value;

		setData({ ...tempData });
		incrementRevision();
	}, [data]);

	const placeSheetData = useCallback((): void => {
		console.log("chro placeSheetData");

		for (const block in data) {
			const el = document.getElementById(`${block}`) as HTMLInputElement;
			if (el && el.type === "checkbox") el.checked = data[block].toggle.current as boolean;
			else if (el && el.type === "text") el.value = data[block].text.current as string;
		}
	}, [data]);

	useEffect(() => {
		if (!isLoaded && rawData) {
			setData({ ...setLoadedData(rawData, data) as any });
			setIsLoaded(true);
		}
		incrementRevision();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rawData, setLoadedData]);

	useEffect(() => {
		if (isLoaded) placeSheetData();
	}, [isLoaded, placeSheetData, revision]);

	useEffect(() => {
		if (ruleset && uuid && !rawData) {
			DatabaseClient.from((category === "chronicle") ? "chronicles" : "characters")
				.select("*").eq("uuid", uuid).single()
				.then((response: any) => {
					if (response.error) return;
					setRawData(response.data as aut.server.Chronicle);
				});
		}
	}, [category, rawData, ruleset, uuid]);

	const insert = useCallback((): Promise<void> => {
		const dataObject = {
			name: data.name.text.current,
			ruleset: data.ruleset.text.current,
			storyteller_name: DatabaseClient.auth.user()?.user_metadata.full_name,
			storyteller_uuid: DatabaseClient.auth.user()?.id,
			discord_enabled: data.discord_enabled.toggle.current,
			discord_server: data.discord_server.text.current,
			discord_channel: data.discord_channel.text.current
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").insert(dataObject)
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be inserted."); reject(); }
					else { toast.success("Chronicle inserted."); resolve(); }
				});
		});
	}, [data]);

	const update = useCallback((): Promise<void> => {
		const dataObject = {
			discord_enabled: data.discord_enabled.toggle.current,
			discord_server: data.discord_server.text.current,
			discord_channel: data.discord_channel.text.current
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").update(dataObject)
				.match({ uuid: data.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be updated."); reject(); }
					else { toast.success("Chronicle updated."); resolve(); }
				});
		});
	}, [data]);

	const remove = useCallback((): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").delete()
				.match({ uuid: data.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be deleted."); reject(); }
					else { toast.success("Chronicle deleted."); resolve(); }
				});
		});
	}, [data]);

	return [displayType, data, { placeSheetData, setDisplayType, changeValue }, { insert, update, remove }, isLoaded];
}
