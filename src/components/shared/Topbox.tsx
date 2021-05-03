import styled from "styled-components";

import { useAnimations } from "../../hooks/useAnimations";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background: ${(props: aut.theme.StyleProps) => props.theme.transparent};
	position: fixed;
	top: 0;
	left: 0;
	opacity: 0;
	z-index: 2000;
`;

const Form = styled.form`
	width: 360px;
	max-width: 100%;
	height: auto;
	margin: 4px auto 0;

	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	grid-auto-rows: 30px;
`;

export const TopboxTitle = styled.div`
	width: 100%;
	font-size: 1.6em;
	padding: 0 4px;
	border-bottom: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	margin: 4px 0;

	grid-column: span 2;
`;

export const TopboxChildren = styled.div<{ columns: -1 | 0 | 1 | 2 | 3; topBorder?: boolean; span?: number; }>`
	grid-column: span ${p => (p.span ? p.span : 1)};

	display: grid;
	grid-template-rows: 24px;
	${p => (p.columns === -1 ? "grid-template-columns: 1fr 1fr 1fr;" : "")}	
	${p => (p.columns === 0 ? "grid-template-columns: 1fr 1fr;" : "")}	
	${p => (p.columns === 1 ? "grid-template-columns: 1fr;" : "")}	
	${p => (p.columns === 2 ? "grid-template-columns: 1fr 24px;" : "")}	
	${p => (p.columns === 3 ? "grid-template-columns: 1fr 18px 24px;" : "")}	

	justify-items: center;
	
	padding: 2px 4px;
	border-top: ${p => (p.topBorder ? (props: aut.theme.StyleProps) => props.theme.box.border : "none")};	

	& > label {
		width: 100%;
		height: 100%;
		text-align: left;
		padding: 4px 4px;
	}
	
	& > select {
		width: 100%;
		text-align: left;
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

export function Topbox({ children, title, formRef, otherChildren }: aut.props.Topbox): JSX.Element {
	const { fadeIn } = useAnimations();

	return (
		<Wrapper ref={fadeIn.ref}>
			<Form ref={formRef}>
				<TopboxTitle>{title}</TopboxTitle>

				{children}

			</Form>

			{otherChildren}

		</Wrapper>
	);
}
