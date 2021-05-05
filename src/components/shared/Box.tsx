import styled from "styled-components";

export const BoxWrapper = styled.div<{ width?: string; zIndex: number; }>`
	width: ${p => (p.width ? p.width : "100%")};
	max-width: 100%;
	height: 100%;
	margin: 0 auto;
	padding: 0;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	outline-offset: 2px;

	z-index: ${p => (p.zIndex ? p.zIndex : 0)};
`;

export function Box({ children, width, zIndex }: aut.props.Box): JSX.Element {
	return (
		<BoxWrapper width={width} zIndex={zIndex}>
			{children}
		</BoxWrapper>
	);
}

export const MainBoxWrapper = styled.div`
	width: 600px;
	max-width: 100%;
	height: 400px;
	margin: 0 auto;
	padding: 0;
	
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	outline-offset: 2px;

	z-index: 1;

	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;

	@media only screen and (max-width: 600px) {
		height: 600px;
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 1fr 1fr 1fr;
	}
`;

export function MainBox({ children }: { children: JSX.Element | JSX.Element[] | undefined; }): JSX.Element {
	return (
		<MainBoxWrapper>
			{children}
		</MainBoxWrapper>
	);
}
