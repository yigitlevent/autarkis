namespace rbs {
	interface Option { name: string; value: string; header?: boolean; }

	interface Group { name: string; value: string; options: Option[]; }

	interface Select {
		options: string[] | rbs.Option[] | rbs.Group[];
		multi?: boolean;
		search?: boolean;
		disabled?: boolean;
		closeOnSelect?: boolean;
		appendGroupValue?: boolean;
		showAsText?: boolean;
		create?: boolean;
		createString?: string;
		placeholder?: string;
		defaultSelected?: rbs.Option[];
		searchSensitivity?: number;
		onOptionSelect?: (value: rbs.Option) => void;
		onSelectedChange?: (values: rbs.Option[]) => void;
		onInputChange?: (values: string) => void;
	}
}
