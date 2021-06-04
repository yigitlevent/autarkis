import { createRef, useCallback, useEffect, useState } from "react";
import Fuse from "fuse.js";
import styled from "styled-components";

import { CleanString, DirtyString } from "../../function/utility";

const SelectWrapper = styled.div<{ isDisabled: boolean; }>`
	background:  ${p => (p.isDisabled) ? "none" : (props: aut.theme.StyleProps) => props.theme.element.background};
	display: block;
	font-size: 1em;
	width: 100%;
	height: 21px;
	overflow: visible;
`;

const SelectBar = styled.div`
	width: inherit;
	height: 100%;
	padding: 2px;
	display: grid;
	grid-template-columns: max-content 1fr;
	grid-template-rows: 1fr;
`;

const SelectSelectedAll = styled.div`
	height: 100%;
	width: 100%;
	line-height: 1.3em;
	padding: 0 2px;
`;

const SelectInput = styled.input`
	min-width: 60px;
	display: inline-block;
	background: none !important;
	border: none !important;
`;

const SelectOptions = styled.div`
	display: block;
	max-height: 240px;
	border: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	overflow-y: auto;
	overflow-x: hidden;
	width: inherit;
	position: relative;
	z-index: 123;
`;

const SelectOptionNew = styled.div`
	cursor: pointer;
	width: 100%;
	padding: 2px 4px;
	background: ${(props: aut.theme.StyleProps) => props.theme.row.background};

	&:not(:last-child) {
		border-bottom: 1px #aaa dashed;
	}
`;

const SelectOptionHeader = styled.div`
	font-size: 1.1em;
	width: 100%;
	padding: 2px 4px;
	text-transform: uppercase;
	background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
	border-bottom: 1px #aaa dashed;
`;

const SelectOption = styled.div`
	cursor: pointer;
	width: 100%;
	padding: 2px 4px;
	background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.element.border};

	&:hover:after {
		content: " +";
	}
`;

const SelectOptionSelected = styled(SelectOption)`
	color: ${(props: aut.theme.StyleProps) => props.theme.success.color};
	
	&:hover:after {
		content: " –";
	}
`;

export function Select(props: rbs.Select): JSX.Element {
	const flattenStringArray = (strings: string[]): rbs.Option[] => {
		return strings.map((o) => { return { name: DirtyString(o), value: CleanString(o) }; });
	};

	const flattenGroupArray = (groups: rbs.Group[], appendGroupValue?: boolean): rbs.Option[] => {
		const tempArray: rbs.Option[] = [];
		for (const group in groups) {
			tempArray.push(
				{ name: groups[group].name, value: groups[group].value, header: true },
				...groups[group].options.map((v) => {
					return { name: v.name, value: `${(appendGroupValue) ? `${groups[group].value} ` : ""}${v.value}` };
				})
			);
		}
		return tempArray;
	};

	const [mainOptions, setMainOptions] = useState<rbs.Option[]>([]);
	const [userOptions, setUserOptions] = useState<rbs.Option[]>([]);

	const [selectedOptions, setSelectedOptions] = useState<rbs.Option[]>((props.defaultSelected) ? props.defaultSelected : []);
	const [filteredOptions, setFilteredOptions] = useState<rbs.Option[]>([]);

	const [inputValue, setInputValues] = useState<string>("");

	const inputRef = createRef<HTMLInputElement>();
	const optionsRef = createRef<HTMLDivElement>();

	const [showOptions, setShowOptions] = useState(false);

	const maybeCloseOptions = useCallback((event: MouseEvent): void => {
		const test = !((event.target as HTMLElement).parentElement?.parentElement?.classList.contains("bs_select"));
		if (test) setShowOptions(false);
	}, []);

	const filterOptions = useCallback((searchValue: string): void => {
		if (props.search && searchValue.length > 0) {
			const options = { keys: ["value"], includeScore: false, threshold: (props.searchSensitivity) ? props.searchSensitivity : 0.05 };
			const result = new Fuse([...mainOptions, ...userOptions], options).search(searchValue);
			setFilteredOptions(result.map((v) => v.item));
		}
		else {
			setFilteredOptions([...mainOptions, ...userOptions]);
		}
	}, [mainOptions, props.search, props.searchSensitivity, userOptions]);

	const selectOption = useCallback((value?: rbs.Option): void => {
		if (value) {
			if (props.onOptionSelect) props.onOptionSelect(value);

			if (props.create
				&& mainOptions.findIndex((v) => v.value === value.value) === -1
				&& userOptions.findIndex((v) => v.value === value.value) === -1) {
				setUserOptions([...userOptions, value]);
				setInputValues("");
			}

			if ((props.create || mainOptions.findIndex((v) => v.value === value.value) > -1)) {
				let newSelected = [...selectedOptions];

				if (selectedOptions.findIndex((v) => v.value === value.value) === -1) {
					if (props.multi) { newSelected = [...selectedOptions, value]; }
					else { newSelected = [value]; }
				}
				else if (!props.disabled) {
					const index = newSelected.findIndex((v) => v.value === value.value);
					if (index > -1) { newSelected.splice(index, 1); }
				}

				setSelectedOptions(newSelected);
				setInputValues("");

				if (props.onSelectedChange) props.onSelectedChange(newSelected);
			}
		}
	}, [mainOptions, props, selectedOptions, userOptions]);

	const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValues(event.target.value);
		filterOptions(event.target.value);

		if (props.onInputChange) props.onInputChange(event.target.value);
	}, [filterOptions, props]);

	const selectedElements = selectedOptions.map((v) => {
		return <span key={v.name} className="bs_selected" onClick={() => selectOption(v)}>{v.name}</span>;
	});

	const selectedStrings = selectedOptions.map((v) => { return v.name; });

	const filteredElements = filteredOptions.map((v) => {
		if (v.header) {
			return <SelectOptionHeader key={v.name}>{v.name}</SelectOptionHeader>;
		}
		else if (selectedOptions.findIndex((s) => s.value === v.value) > -1) {
			return <SelectOptionSelected key={v.name} onClick={() => { selectOption(v); if (props.closeOnSelect) setShowOptions(false); }}>
				{v.name}
			</SelectOptionSelected>;
		}
		else {
			return <SelectOption key={v.name} onClick={() => { selectOption(v); if (props.closeOnSelect) setShowOptions(false); }}>
				{v.name}
			</SelectOption>;
		}
	});

	useEffect(() => {
		if (props.options.length > 0) {
			if (typeof props.options[0] === "string") {
				setMainOptions(flattenStringArray(props.options as string[]));
			}
			else if ((props.options[0] as rbs.Group).options) {
				setMainOptions(flattenGroupArray(props.options as rbs.Group[], props.appendGroupValue));
			}
			else {
				setMainOptions(props.options as rbs.Option[]);
			}
		}
		else { setMainOptions([]); }
	}, [setMainOptions, props.options, props.appendGroupValue]);

	useEffect(() => {
		setFilteredOptions([...mainOptions, ...userOptions]);
	}, [mainOptions, userOptions]);

	useEffect(() => {
		if (props.defaultSelected) {
			setUserOptions([]);
			const flattened = props.defaultSelected;
			const tempUserOptions: rbs.Option[] = [];
			for (const key in flattened) {
				if (mainOptions.findIndex((v) => v.value === flattened[key].value) === -1) {
					tempUserOptions.push(flattened[key]);
				}
			}
			setUserOptions(tempUserOptions);
		}
	}, [mainOptions, props.defaultSelected]);

	useEffect(() => {
		document.addEventListener("click", maybeCloseOptions);
		return () => { document.removeEventListener("click", maybeCloseOptions); };
	}, [mainOptions, maybeCloseOptions]);

	useEffect(() => {
		return () => { setShowOptions(false); };
	}, [setShowOptions]);

	return (
		<SelectWrapper className={"bs_select"} isDisabled={(props.disabled) ? true : false}>

			<SelectBar>

				<SelectSelectedAll>
					{(props.showAsText) ? selectedStrings.join(", ") : selectedElements}
				</SelectSelectedAll>

				<SelectInput
					ref={inputRef}
					className={"bs_input"}
					type="text"
					readOnly={(props.disabled || !(props.search || props.create)) ? true : false}
					placeholder={(props.placeholder && selectedOptions.length === 0) ? props.placeholder : undefined}
					value={inputValue}
					onChange={(e) => { onChange(e); }}
					onFocus={() => { if (!props.disabled) setShowOptions(true); }}
				/>

			</SelectBar>

			{(showOptions) ?
				<SelectOptions ref={optionsRef}>

					{(props.create && inputValue.length > 0)
						? <SelectOptionNew
							onClick={() => { if (inputRef.current) selectOption({ name: inputValue, value: inputValue.toLowerCase() }); }}>
							{(props.createString) ? props.createString : "Create:"} &quot;{inputValue}&quot;
						</SelectOptionNew>
						: null
					}

					{(props.search && filteredElements.length === 0)
						? <SelectOptionHeader>Searched value cannot be found...</SelectOptionHeader>
						: filteredElements
					}

				</SelectOptions>
				: null
			}

		</SelectWrapper>
	);
}
