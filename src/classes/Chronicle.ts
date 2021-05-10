import { toast } from "react-toastify";

import { GenericChronicle } from "../rulesets/GenericChronicle";

import { DatabaseClient } from "../hooks/useQueries";

export class Chronicle implements aut.classes.Chronicle {
	readonly type = "chronicle";

	data;

	constructor(rawData: undefined | aut.server.Chronicle, ruleset: aut.ruleset.Names) {
		this.data = new GenericChronicle();
		this.data.ruleset.text.current = ruleset;

		if (rawData) {
			this.data.uuid.text.current = rawData.uuid;
			this.data.name.text.current = rawData.name;

			this.data.ruleset.text.current = rawData.ruleset;

			this.data.storyteller_uuid.text.current = rawData.storyteller_uuid;
			this.data.storyteller_name.text.current = rawData.storyteller_name;

			this.data.discord_enabled.switch.current = rawData.discord_enabled;
			this.data.discord_server.text.current = rawData.discord_server;
			this.data.discord_channel.text.current = rawData.discord_channel;

			this.data.created_at.text.current = rawData.created_at;
			this.data.updated_at.text.current = rawData.updated_at;

			console.log(this.data);
		}

		this.placeSheetData();
	}

	changeValue(event: aut.short.Events): void {
		const target = event.target as HTMLInputElement;
		const targetID = target.id; 			// "basics.name" 
		const name = targetID.split(".")[0]; 	// "basics"

		if (target.type === "checkbox") this.data[name].switch.current = target.checked;
		else if (target.type === "text") this.data[name].text.current = target.value;
	}

	placeSheetData(): void {
		for (const block in this.data) {
			const el = document.getElementById(`${block}`) as HTMLInputElement;
			if (el && el.type === "checkbox") el.checked = this.data[block].switch.current as boolean;
			else if (el && el.type === "text") el.value = this.data[block].text.current as string;
		}
	}

	insert(): Promise<void> {
		const data = {
			name: this.data.name.text.current,
			ruleset: this.data.ruleset.text.current,
			storyteller_name: DatabaseClient.auth.user()?.user_metadata.full_name,
			storyteller_uuid: DatabaseClient.auth.user()?.id,
			discord_enabled: this.data.discord_enabled.switch.current,
			discord_server: this.data.discord_server.text.current,
			discord_channel: this.data.discord_channel.text.current
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").insert(data)
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be inserted."); reject(); }
					else { toast.success("Chronicle inserted."); resolve(); }
				});
		});
	}

	update(): Promise<void> {
		const data = {
			discord_enabled: this.data.discord_enabled.switch.current,
			discord_server: this.data.discord_server.text.current,
			discord_channel: this.data.discord_channel.text.current
		};

		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").update(data)
				.match({ uuid: this.data.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be updated."); reject(); }
					else { toast.success("Chronicle updated."); resolve(); }
				});
		});
	}

	delete(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			DatabaseClient.from("chronicles").delete()
				.match({ uuid: this.data.uuid.text.current }).single()
				.then((response) => {
					if (response.error) { toast.error("Chronicle cannot be deleted."); reject(); }
					else { toast.success("Chronicle deleted."); resolve(); }
				});
		});
	}
}
