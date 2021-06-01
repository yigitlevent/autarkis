namespace aut {

	namespace sheet{

		type InputTypes = "text" | "number" | "dot" | "checkbox" | "precheckbox" | "postcheckbox" | "pseudocheckbox" | "textarea" | "select";

		type Sheet = SheetBlock[];

		interface SheetBlock {
			title: string;
			showTitle: boolean;
			display?: boolean;
			columns: SheetColumn[];
		}

		type SheetColumn = SheetRow[];

		interface SheetRow {
			title: string;

			showTitle?: true;
			boldTitle?: true;
			isTestable?: true;
			isReadOnly?: true;
			align?: "center" | "right";

			inputs: InputTypes[];

			// text?: {};
			// number?: {};

			// precheckbox?: {};
			// postcheckbox?: {};
			pseudocheckbox?: {
				amount: 3 | 5 | 10 | 15;
				possibleValues: string[];
			};
			checkbox?: {
				amount: 3 | 5 | 10 | 15;
			};

			dot?: {
				amount: 5 | 6 | 10 | 15;
			};

			textarea?: {
				amount: 2 | 3 | 4 | 5 | 6;
			};

			select?: {
				categories: string[];
				multi?: true;
				create?: true;
				search?: true;
				placeholder?: string;
				appendGroupValue?: true;
			};
		}

	}

}
