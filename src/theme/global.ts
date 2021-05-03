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

	html,
	body {
		margin: 0;
		padding: 0;
		min-height: 100%;
		width: 100%;
		background-color: ${(props: aut.theme.StyleProps) => props.theme.surface.background};
	}

	body {
		overflow-y: scroll;
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

		&:hover {
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
			height: 14px;
			width: 14px;
			margin: auto 1px !important;
			padding: 0;
			border: none;
			background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
			appearance: none;
			cursor: pointer;
			vertical-align: middle;

			&:checked {
				background: ${(props: aut.theme.StyleProps) => props.theme.element.backgroundLight} !important;
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

			&:read-only {
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

	.grecaptcha-badge { visibility: hidden; }

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

	// Basic Select
	.bs_select {
		width: 352px;
		height: inherit;
		background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
		display: block;
		font-size: 1em;
		overflow: hidden;
	}

	.bs_bar {
		width: inherit;
		height: 100%;
		padding: 2px;
		display: grid;
		grid-template-columns: max-content 1fr;
		grid-template-rows: 1fr;
	}

	.bs_selectedall {
		height: 100%;
		width: 100%;
		line-height: 1.3em;
		padding: 0 2px;
	}

	.bs_selected {
		width: max-content;
		height: 26px;
		outline: ${(props: aut.theme.StyleProps) => props.theme.row.border};
		margin: 0 2px 0 0;
		padding: 2px 4px;
		cursor: pointer;
		display: inline-block;
		line-height: 1.4em;
		background: transparent;
	}

	.bs_input {
		min-width: 60px;
		display: inline-block;
		background: inherit;
		border: none;
	}

	.bs_options {
		display: block;
		position: fixed;
		max-height: 240px;
		outline: ${(props: aut.theme.StyleProps) => props.theme.box.border};
		overflow-y: auto;
		overflow-x: hidden;
		width: inherit;
	}

	.bs_optionnew {
		cursor: pointer;
		width: inherit;
		padding: 2px 4px;
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
		border-bottom: 1px #aaa dashed;
	}

	.bs_header {
		font-size: 1.1em;
		width: inherit;
		padding: 2px 4px;
		text-transform: uppercase;
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
		border-bottom: 1px #aaa dashed;
	}

	.bs_option {
		cursor: pointer;
		width: inherit;
		padding: 2px 4px;
		background: ${(props: aut.theme.StyleProps) => props.theme.element.background};
		border-bottom: ${(props: aut.theme.StyleProps) => props.theme.element.border};

		&:hover:after {
			content: " +";
		}
	}

	.bs_option_selected {
		color: ${(props: aut.theme.StyleProps) => props.theme.success.color};
		
		&:hover:after {
			content: " –";
		}
	}
`;
