import styled from "styled-components";

export const Link = styled.a`
	border: none;
	background: none;
	filter: brightness(60%);
	cursor: pointer;
	padding: 1px 0 0;
	font-size: 1.2em;

	color: ${(props: aut.theme.StyleProps) => props.theme.link.color};

	&:active,
	&:focus {
		border: none;
		appearance: none;
	}
`;

export const IconLink = styled(Link)`
	display: inline-block;
	width: 24px;
	height: 24px;
	margin: 3px 3px;
	padding: 0;

	& > svg {
		cursor: pointer;

		&:hover {
			filter: brightness(100%);
		}
	}
`;
