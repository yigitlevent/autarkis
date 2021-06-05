/* eslint-disable @typescript-eslint/naming-convention */

import { Text, Toggle } from "./_generic";

export class GenericChronicle {
	[key: string]: {
		[key: string]: Text | Toggle;
	};

	experience = { text: new Text() }; // TODO: Freeform, V5 Costs
	chargen = { text: new Text() }; // TODO: Freeform, V5 Points

	discord_enabled = { toggle: new Toggle() };
	discord_server = { text: new Text() };
	discord_channel = { text: new Text() };
}

export const GenericChronicleSheet: aut.sheet.Sheet = [
	{
		title: "_primary",
		showTitle: false,
		display: false,
		columns: [
			[
				{ title: "uuid", showTitle: true, inputs: ["text"] },
				{ title: "user_uuid", showTitle: true, inputs: ["text"] }
			],
			[
				{ title: "editable", showTitle: true, inputs: ["postcheckbox"] },
				{ title: "ruleset", showTitle: true, inputs: ["text"] }
			],
			[
				{ title: "created_at", showTitle: true, inputs: ["text"] },
				{ title: "updated_at", showTitle: true, inputs: ["text"] }
			]
		]
	},
	{
		title: "Basics",
		showTitle: false,
		columns: [
			[
				{ title: "Name", showTitle: true, inputs: ["text"] },
				{ title: "User", showTitle: true, isReadOnly: true, inputs: ["text"] },

				{ title: "empty", inputs: [] },

				{ title: "Discord", showTitle: true, inputs: ["postcheckbox"] },
				{ title: "Server", showTitle: true, inputs: ["text"] },
				{ title: "Channel", showTitle: true, inputs: ["text"] }
			],
			[
				{ title: "Description", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			],
			[
				{ title: "Notes", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			]
		]
	}
];
