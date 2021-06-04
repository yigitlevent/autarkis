import styled from "styled-components";

export const Title = styled.div`
	font-size: 1.6em;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 6px 10px 0;
	padding-top: 3px;

	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	align-items: center;
`;

export const Subtitle = styled.div<{ isClickable?: boolean; }>`
	font-size: 1.3em;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 6px 10px 0;
	${p => (p.isClickable ? "cursor: pointer;" : "")}
`;

export const Dashboard = styled.div`
	width: 100%;
`;

export const Extras = styled.div`
	width: max-content;
`;

export const ColumnsWrapper = styled.div<{ display?: string; }>`
	line-height: 1.5em;
	width: 100%;
	padding: 6px 4px 6px;
	font-size: 0.9em;
	text-align: center;
	display: ${p => (p.display ? p.display : "block")};
`;

export const RowsWrapper = styled.div`
	width: 314px;
	display: inline-grid;
	margin: 0;
	vertical-align: top;
`;
