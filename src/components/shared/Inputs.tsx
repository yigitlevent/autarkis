import { useState } from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

export const InputGroup = styled.div`
	cursor: default;
	justify-self: end;
`;

export const Input = styled.input<{ align?: string; columns?: number; }>`
	height: 21px !important;
	width: 99% !important;
	text-align: ${p => (p.align) ? p.align : "initial"};
	grid-column: span ${p => p.columns};
`;

export const NumberInput = styled(Input)`
	padding: 0 !important;
	text-align: center;
`;

export const Textarea = styled.textarea<{ columns: number; height?: number; }>`
	width: 100% !important;
	height:  ${p => (p.height) ? `${p.height}px` : "100%"} !important;
	grid-column: span ${p => p.columns};
	padding: 5px;
`;

const InputButtonShared = styled.input`
	font-size: 0.9em!important;
	margin: 0 auto;
	display: block;
	border: none !important;
`;

export const Button = styled(InputButtonShared).attrs({ type: "button" })`
	background: none;
	margin: 14px auto;
`;

export const Submit = styled(InputButtonShared).attrs({ type: "submit" }) <{ noBg?: boolean; }>`
	padding: 3px 5px;
	background: ${p => (p.noBg) ? "none" : (props: aut.theme.StyleProps) => props.theme.element.background};
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
	&:nth-child(5n+1):not(:last-child, :first-child) {
		margin-left: 5px !important;
	}
`;

export const Dot = styled(Checkbox)`
	border-radius: 100%;
`;

export const Toggle = styled(Checkbox)`
	&::after {
		content: "✘";
		margin: -4px 1px 0px;
		font-size: 0.95em;
		display: block;
	}
	
	&:checked {
		background: ${(props: aut.theme.StyleProps) => props.theme.element.background}!important;

		&::after {
			content: "✔";
		}
	}
`;

const PseudoCheckboxWrapper = styled.div`
	height: 12px !important;
	width: 12px !important;
	border: none!important;
	background: ${(props: aut.theme.StyleProps) => props.theme.element.background}!important;
	cursor: pointer !important;
	margin: auto 1px !important;
	vertical-align: middle;
	display: inline-block !important;
	padding: 0 !important;

	&:read-only {
		&:hover {
			filter: none !important;
			cursor: default !important;
		}
	}
	
	&:nth-child(5n+1):not(:last-child, :first-child) {
		margin-left: 5px !important;
	}
`;

export function PseudoCheckbox({ id, defaultValue, onClick }: { id: string, defaultValue?: string; onClick: () => string; }): JSX.Element {
	const [value, setValue] = useState(defaultValue);

	return (
		<PseudoCheckboxWrapper id={id} onClick={() => { setValue(onClick()); }}>
			<Icon size={12} name={`pcheck/${value}`} />
		</PseudoCheckboxWrapper>
	);
}
