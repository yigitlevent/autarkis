import { toast } from "react-toastify";

import { Rulesets } from "../rulesets/_rulesets";

import { MakeRequest } from "../function/makeRequest";
import { CleanString } from "../function/utility";

export class Chronicle implements aut.classes.Chronicle {
	readonly type = "chronicle";
	data;

	constructor(rawData: undefined | aut.server.Chronicle, ruleset: aut.ruleset.Names) {
		this.data = new (Rulesets.getRuleset(ruleset)).chronicle();
		this.data._primary.ruleset = ruleset;

		if (rawData) {
			this.data._primary.uuid = rawData.uuid;
			this.data._primary.createdAt = rawData.created_at;
			this.data._primary.updatedAt = rawData.updated_at;
			this.data._primary.ruleset = rawData.ruleset;

			this.data.basics.name = rawData.name;
			this.data.basics.storyteller = rawData.creator;

			this.data.discord.enabled = rawData.discord_enabled;
			this.data.discord.server = rawData.discord_server;
			this.data.discord.channel = rawData.discord_channel;

			console.log(this.data);
		}

		this.placeSheetData();
	}

	changeValue(event: aut.short.Events): void {
		const target = event.target as HTMLInputElement;
		const targetName = target.name; 		// "s.basics.name" 
		const names = targetName.split("."); 	// [ "s", "basics", "name" ]

		const block = names[1];
		const row = names[2];

		if (target.type === "checkbox") this.data[block][row] = target.checked;
		else if (target.type === "text") this.data[block][row] = target.value;
	}

	placeSheetData(): void {
		for (const block in this.data) {
			if (block === "_primary") continue;
			if (block === "characters") continue; // These are placed automatically anyway

			for (const block in this.data) {
				for (const row in this.data[block]) {
					const el = document.getElementsByName(`s.${block}.${row}`)[0] as HTMLInputElement;
					if (el && el.type === "checkbox") el.checked = this.data[block][row] as boolean;
					else if (el && el.type === "text") el.value = this.data[block][row] as string;
				}
			}
		}
	}

	export(event: React.FormEvent<HTMLInputElement>): void {
		event.preventDefault();

		if (this.data.basics.name.length > 0) {
			const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
			const downloadAnchorNode = document.createElement("a");
			downloadAnchorNode.setAttribute("href", dataStr);
			downloadAnchorNode.setAttribute("download", `${CleanString(this.data.basics.name)}.chro.autarkis`);
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
				this.placeSheetData();
				toast.success("Character file imported.");
			}
		});
	}

	delete(): Promise<void> {
		const data: aut.request.chronicle.DeleteOrGet = {
			chroKey: this.data._primary.uuid
		};

		return MakeRequest("/chro/delete", data)
			.then(() => { toast.success("Chronicle deleted."); })
			.catch(() => { toast.error("Cannot delete chronicle."); });
	}

	submit(type: aut.short.SheetDisplayType): Promise<void> {
		const data: aut.request.chronicle.NewOrEdit = {
			chroName: this.data.basics.name,
			chroKey: this.data._primary.uuid,
			discordEnabled: this.data.discord.enabled,
			discordServer: this.data.discord.server,
			discordChannel: this.data.discord.channel
		};

		return MakeRequest(`/chro/${type}`, data)
			.then(() => { toast.success("Chronicle saved."); })
			.catch((errors) => { toast.error(`Submit failed. \n ${errors.data.join(" \n ")}`); });
	}
}
