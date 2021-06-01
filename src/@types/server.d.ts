namespace aut {

	namespace server {

		interface Chronicle {
			uuid: string;
			name: string;

			user_name: string;
			user_uuid: string;

			ruleset: aut.ruleset.Names;
			editable: boolean;

			data: aut.GenericData;

			created_at: string;
			updated_at: string;
		}

		interface Character {
			uuid: string;
			name: string;

			user_name: string;
			user_uuid: string;

			ruleset: aut.ruleset.Names;
			editable: boolean;

			data: aut.GenericData;

			created_at: string;
			updated_at: string;
		}
	}

}
