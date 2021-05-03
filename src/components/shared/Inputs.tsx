import styled from "styled-components";

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

export const PseudoCheckbox = styled.input.attrs({ type: "text" })`
	height: 14px !important;
	width: 14px !important;
	border: none!important;
	background-color: ${(props: aut.theme.StyleProps) => props.theme.element.background}!important;
	appearance: none;
	cursor: pointer !important;
	margin: auto 1px !important;
	vertical-align: middle;
	display: inline-block !important;
	text-align: center;
	padding: 0 !important;
	user-select: none;
	caret-color: transparent;

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
