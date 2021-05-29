import styled from "styled-components";

export const Topbox = styled.div<{ clickThrough?: boolean; }>`
	width: 100vw;
	height: 100vh;
	background: ${p => (p.clickThrough) ? "none" : (props: aut.theme.StyleProps) => props.theme.transparent};
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2000;
	${p => (p.clickThrough) ? "pointer-events: none;" : ""}
`;

export const TopboxBox = styled.div<{ columns?: number; }>`
	width: 360px;
	max-width: 100%;
	height: auto;
	margin: 4px auto 0;

	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	border: ${(props: aut.theme.StyleProps) => props.theme.box.border};

	display: grid;
	${p => (p.columns === 3 ? "grid-template-columns: 1fr 1fr 1fr;" : "grid-template-columns: 1fr 1fr;")}
	grid-template-columns: ${p => (p.columns) ? `repeat(${p.columns}, 1fr)` : "1fr 1fr"};
	grid-template-rows: auto;
	grid-auto-rows: minmax(30px, auto);

	pointer-events: all;
`;

export const TopboxTitle = styled.div<{ columns?: number; }>`
	width: 100%;
	font-size: 1.6em;
	padding: 0 4px;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 4px 0;

	grid-column: span ${p => (p.columns) ? p.columns : "2"};
`;

export const TopboxChildren = styled.div<{ columns: -3 | -2 | -1 | 0 | 1 | 2 | 3; topBorder?: boolean; span?: number; center?: boolean; }>`
	grid-column: span ${p => (p.span ? p.span : 1)};

	display: grid;
	grid-template-rows: 24px;
	${p => (p.columns === -3 ? "grid-template-columns: max-content 1fr;" : "")}	
	${p => (p.columns === -2 ? "grid-template-columns: 1fr 1fr 1fr 1fr;" : "")}	
	${p => (p.columns === -1 ? "grid-template-columns: 1fr 1fr 1fr;" : "")}	
	${p => (p.columns === 0 ? "grid-template-columns: 1fr 1fr;" : "")}	
	${p => (p.columns === 1 ? "grid-template-columns: 1fr;" : "")}	
	${p => (p.columns === 2 ? "grid-template-columns: 1fr 24px;" : "")}	
	${p => (p.columns === 3 ? "grid-template-columns: 1fr 18px 24px;" : "")}	

	justify-items: center;
	align-self: start;

	${p => (p.center ? "text-align: center;" : "text-align: left;")}

	border-top: ${p => (p.topBorder ? (props: aut.theme.StyleProps) => props.theme.box.border : "none")};	

	& > *:not(input[type="button"], .bs_select) {
		justify-self: stretch;
		justify-content: space-between;
	}

	& > label {
		width: 100%;
		height: 100%;
		text-align: left;
		padding: 4px 4px;
	}
	
	& > * > select {
		width: 100%;
		text-align: left;
		grid-column: span 2;
	}

	& > input[type="number"] {
		width: 24px;
		height: 24px;
		text-align: center;
	}

	& > input[type="text"] {
		width: 100%;
		height: 100%;
		text-align: left;
	}

	& > input[type="checkbox"] {
	}
`;

export const TopboxButton = styled.input.attrs({ type: "button" })`
	background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
	width: 80px;
	margin-top: 1px;
`;
