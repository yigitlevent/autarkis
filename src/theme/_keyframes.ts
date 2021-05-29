import { keyframes } from "styled-components";

export const Spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

export const HideLeft = keyframes`
	from {
		left: 0;
	}
	to {
		left: -250px;
	}
`;
