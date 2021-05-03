import styled from "styled-components";

import { useAnimations } from "../../hooks/useAnimations";

const SpinnerWrapper = styled.div<{ overlay?: boolean; size?: [string, string]; }>`
	width: ${p => (p.size ? p.size[0] : "100%")};
	height: ${p => (p.size ? p.size[1] : "auto")};

	${p => (p.overlay ? (props: aut.theme.StyleProps) => props.theme.transparent : "")}	
	${p => (p.overlay ? "position: fixed;" : "")}	

	z-index: 20;
	text-align: center;

	margin: 0;
	padding: 0;
	top: 0;
	left: 0;
`;

const SpinnerInner = styled.div`
	width: 49px;
	height: 49px;
	margin: 0 auto;
	border: 3px solid rgb(236, 30, 36);
	border-radius: 50%;
	border-left-color: transparent;
	border-right-color: transparent;
	translate: 0 40%;
`;

export function Spinner({ overlay, size }: { overlay?: boolean; size?: [string, string]; }): JSX.Element {
	const { spin } = useAnimations();

	return (
		<SpinnerWrapper overlay={overlay} size={size}>
			<SpinnerInner ref={spin.ref} />
		</SpinnerWrapper>
	);
}
