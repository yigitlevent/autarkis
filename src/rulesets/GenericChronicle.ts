/* eslint-disable @typescript-eslint/naming-convention */

import { Text, Toggle } from "./_generic";

export class GenericChronicle {
	[key: string]: {
		[key: string]: Text | Toggle;
	};

	uuid = { text: new Text() };
	name = { text: new Text() };

	ruleset = { text: new Text() }; // TODO: v5Modern
	experience = { text: new Text() }; // TODO: Freeform, V5 Costs
	chargen = { text: new Text() }; // TODO: Freeform, V5 Points

	storyteller_uuid = { text: new Text() };
	storyteller_name = { text: new Text() };

	discord_enabled = { toggle: new Toggle() };
	discord_server = { text: new Text() };
	discord_channel = { text: new Text() };

	updated_at = { text: new Text() };
	created_at = { text: new Text() };
}
