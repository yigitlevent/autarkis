namespace aut {

	namespace server {

		type TableNames = "campaigns" | "characters" | "groups" | "connections";

		interface DataInsert {
			name: string;
			user_uuid: string;
			data: aut.GenericData;
		}

		interface DataUpdate {
			data: aut.GenericData;
		}

		interface DataReturn {
			uuid: string;
			name: string;
			user_uuid: string;

			data: aut.GenericData;

			created_at: string;
			updated_at: string;
		}

		interface Connection {
			camp_uuid: string;

			user_uuids: string[];
			char_uuids: string[];
			group_uuids: string[];
		}

	}

}
