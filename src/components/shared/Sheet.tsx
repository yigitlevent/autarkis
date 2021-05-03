import styled from "styled-components";

export const Title = styled.div`
	font-size: 1.6em;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 6px 10px 0;
`;

export const Subtitle = styled.div<{ isClickable?: boolean; }>`
	font-size: 1.3em;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 6px 10px 0;
	${p => (p.isClickable ? "cursor: pointer;" : "")}
`;

export const DashboardForm = styled.form`
	width: 100%;
`;

export const EntranceForm = styled.form`
	width: 50%;
	margin: 0 auto 20px;

	grid-row: span 2;
	height: max-content;
	align-self: center;

	& > input[type="text"],
	& > input[type="email"],
	& > input[type="password"],
	& > input[type="number"] {
		margin: 0 0 6px;
		padding: 2px 5px;
	}
`;

export const Extras = styled.span`
	float: right;
	width: auto;
	height: auto;
	padding: 0;
	position: relative;
	right: 10px;
	top: -28px;
	height: 0;
`;

export const BlockWrapper = styled.div`
	line-height: 1.5em;
	width: 100%;
	padding: 6px 10px 6px;
	font-size: 0.9em;
	text-align: center;
`;

export const ColumnWrapper = styled.div`
	width: 326px;
	display: inline-grid;
	margin: 5px 0;
	vertical-align: top;
`;
