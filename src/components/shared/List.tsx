import styled from "styled-components";

export const IconBox = styled.div`
	float: right;
	margin: -26px 0 0;

	& > * {
		display: inline-block;
	}
`;

export const List = styled.div`
	margin: 0 9px;
	overflow: auto;

	& > *:nth-child(2n) {
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
	}
`;

export const EmptyListError = styled.div`
	font-size: 1em;
	font-style: italic;
	margin: 20px 12px;
	color: ${(props: aut.theme.StyleProps) => props.theme.error.color};
`;
