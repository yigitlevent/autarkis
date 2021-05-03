import styled from "styled-components";

import { CapitalizeFirstLetter } from "../../function/utility";

export const IconWrapper = styled.div<{ size: number; name: string; hover?: boolean; brightness?: boolean; float?: string; }>`
	width: ${p => p.size}px;
	height: ${p => p.size}px;
	background: transparent url("./assets/icons/${p => p.name}.svg") no-repeat center center;
	background-size: contain;
	margin: auto;
	${p => (p.float === "right" ? "float: right;" : (p.float === "left") ? "float: left;" : "")}

	${p => (p.brightness ? "filter: brightness(60%);" : "")}

	&:hover {
		${p => (p.brightness ? "filter: brightness(100%);" : "")}
		${p => (p.hover ? "cursor: pointer;" : "")}
	}

	& > svg {
		fill: white;
	}

	& > * {
		height: 100% !important;
		width: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
	}
`;

export function Icon({ children, size, name, hover, brightness, float, title }: aut.props.Icon): JSX.Element {
	return (
		<IconWrapper size={size} name={name} hover={hover} brightness={brightness} float={float} title={(title) ? CapitalizeFirstLetter(name.replaceAll("_", " ")) : undefined}>
			{(children) ? children : null}
		</IconWrapper>
	);
}
