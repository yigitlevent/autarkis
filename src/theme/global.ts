import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	@font-face {
        font-family: ${(props: aut.theme.StyleProps) => props.mainFont};
        src: ${(props: aut.theme.StyleProps) => `url("./assets/fonts/${props.mainFont}.ttf")`};
		font-display: block;
    };

	@font-face {
        font-family: ${(props: aut.theme.StyleProps) => props.italicFont};
        src: ${(props: aut.theme.StyleProps) => `url("./assets/fonts/${props.italicFont}.ttf")`};
		font-display: block;
    };

	* {
		box-sizing: border-box;
		tab-size: 4;

		scrollbar-width: thin;
		scrollbar-color: ${(props: aut.theme.StyleProps) => props.theme.element.backgroundLight} ${(props: aut.theme.StyleProps) => props.theme.element.background};

		color: ${(props: aut.theme.StyleProps) => props.theme.surface.color};

		font-kerning: auto;
		font-size: 1.00em;
		letter-spacing: -0.1px;
		word-spacing: normal;

		font-family: ${(props: aut.theme.StyleProps) => props.mainFont};
		font-variation-settings: 'wght' 400;
	}

	*:not(svg, g, path) {
		cursor: default;
	}

	html {
		height: 100vh;
		width: 100vw;
		
	}

	body {
		height: 100%;
		width: 100%;
	}

	html,
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props: aut.theme.StyleProps) => props.theme.surface.background};
		overflow: hidden;
	}

	textarea {
		cursor: text;
		display: block;
		border: none;
		background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
		color: ${(props: aut.theme.StyleProps) => props.theme.surface.color};
		font-size: 1em;
		resize: none;

		&:read-only {
			background: none;
			border: none;
			border-left: ${(props: aut.theme.StyleProps) => props.theme.element.border};
			border-top: ${(props: aut.theme.StyleProps) => props.theme.element.border};
		}

		&:focus,
		&:focus-visible,
		&:visited {
			text-decoration: none;
			border: ${(props: aut.theme.StyleProps) => props.theme.element.border};
			outline: none;
		}
	}

	input {
		padding: 0 3px;

		&:hover:not(.bs_input) {
			filter: brightness(140%);
		}

		&:disabled {
			&:checked {
				background: ${(props: aut.theme.StyleProps) => props.theme.element.backgroundLight} !important;
			}
			
			&:hover {
				filter: none;
				cursor: default;
			}
		}

		&:read-only:not([type="button"]):not([type="submit"]):not([type="checkbox"]) {
			&:hover {
				filter: none;
				cursor: default;
			}
		}

		&[type="button"],
		&[type="submit"] {
			cursor: pointer;
			font-size: 0.9em;
			border: none;
			color: ${(props: aut.theme.StyleProps) => props.theme.surface.color};
		}

		&[type="checkbox"] {
			height: 12px;
			width: 12px;
			margin: auto 1px !important;
			padding: 0;
			border: none;
			background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
			appearance: none;
			cursor: pointer;
			vertical-align: middle;

			&:checked {
				background: ${(props: aut.theme.StyleProps) => props.theme.element.backgroundLight};
			}

			&:disabled {
				&:hover {
					filter: none !important;
					cursor: default !important;
				}
			}
		}

		&[type="text"],
		&[type="email"],
		&[type="password"],
		&[type="number"] {
			cursor: text;
			display: block;
			border: none;
			background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
			color: ${(props: aut.theme.StyleProps) => props.theme.surface.color};
			font-size: 1em;
			padding: 0 5px;
			-moz-appearance: textfield;

			&:read-only:not(.bs_input) {
				background: none;
				border:	none;
				border-bottom: ${(props: aut.theme.StyleProps) => props.theme.element.border} !important;

				&:hover {
					filter: none !important;
					cursor: default !important;
				}
			}

			&:focus,
			&:focus-visible,
			&:visited {
				text-decoration: none;
				border: ${(props: aut.theme.StyleProps) => props.theme.element.border};
				outline: none;
			}

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	select {
		background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
		color: ${(props: aut.theme.StyleProps) => props.theme.surface.color};
		border: none;
		text-align: center;
		margin: 0 auto;
		appearance: none;

		&:hover {
			filter: brightness(140%);
		}

		&:disabled {
			background: none;
			border-bottom: 1px ${(props: aut.theme.StyleProps) => props.theme.element.background} solid;

			&:hover {
				filter: none;
			}
		}
	}

	label {
		padding: 1px 0 1px 6px;
	}

	a {
		cursor: pointer;

		&:hover {
			filter: brightness(100%);
		}

		& > span {
			height: 1px;
			width: 1px;
			position: absolute;
			overflow: hidden;
			top: -10px;
		}
	}

	svg, g, path {
		pointer-events: fill;
	}

	///// BASIC COMMON STUFF

	#root {
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden scroll;
	}

	#root:after{
		background: transparent url("./assets/logo.png") no-repeat center center;
		background-size: auto;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		display: block;
		content: "";
		z-index: 0;
		opacity: 0.2;
		top: 0;
	}

	.italic {
		font-family: ${(props: aut.theme.StyleProps) => props.italicFont};
		letter-spacing: 0.3px;
	}

	.bold {
		font-variation-settings: 'wght' 650;
		letter-spacing: 0.3px;
	}

	.bolder {
		font-variation-settings: 'wght' 900;
		letter-spacing: 1px;
	}

	.floatLeft {
		float: left;
	}

	.selected {
		filter: brightness(140%);
	}

	.hide {
		display: none;
	}

	///// PACKAGE OVERRIDE STUFF

	/** Used to define container behavior: width, position: fixed etc... **/
	.Toastify__toast-container {
	}

	/** Used to define the position of the ToastContainer **/
	.Toastify__toast-container--top-left {
	}
	.Toastify__toast-container--top-center {
	}
	.Toastify__toast-container--top-right {
		width: 300px !important;
	}
	.Toastify__toast-container--bottom-left {
	}
	.Toastify__toast-container--bottom-center {
		width: 500px !important;
	}
	.Toastify__toast-container--bottom-right {
	}

	// MASONRY

	.top-masonry {
		display: flex;
		width: auto;
		z-index: 10;
		position: relative;
	}

	.top-masonry-column {
		padding: 0 3px; 
  		background-clip: padding-box;
	}

	.bottom-masonry {
		display: flex;
		width: auto;
		z-index: 10;
		position: relative;
	}

	.bottom-masonry-column {
		padding: 0 3px; 
  		background-clip: padding-box;
	}
`;
