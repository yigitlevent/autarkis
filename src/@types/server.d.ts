namespace aut {

	namespace server {

		interface Chronicle {
			uuid: string;
			name: string;
			storyteller_name: string;
			storyteller_uuid: string;
			ruleset: aut.ruleset.Names;
			discord_enabled: boolean;
			discord_server: string;
			discord_channel: string;
			created_at: string;
			updated_at: string;
		}

		interface Character {
			uuid: string;
			name: string;
			player_name: string;
			player_uuid: string;
			data: aut.GenericCharacterData;
			ruleset: aut.ruleset.Names;
			editable: boolean;
			chronicle_uuid: string;
			chronicle_name: string;
			created_at: string;
			updated_at: string;
		}
	}

}
