import styled from "styled-components";

export const SmallBoxWrapper = styled.div`
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
`;

export function SmallBox({ children }: { children?: JSX.Element | JSX.Element[]; }): JSX.Element {
	return (
		<SmallBoxWrapper>
			{children}
		</SmallBoxWrapper>
	);
}

export const LargeBoxWrapper = styled.div`
	background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
	outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
`;

export function LargeBox({ children }: { children?: JSX.Element | JSX.Element[]; }): JSX.Element {
	return (
		<LargeBoxWrapper>
			{children}
		</LargeBoxWrapper>
	);
}
