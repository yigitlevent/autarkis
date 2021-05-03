import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToast = styled(ToastContainer)`
	/** Classes for the displayed toast **/
	.Toastify__toast {
		z-index: 1000;
		border-radius: 0;
		background: ${(props: aut.theme.StyleProps) => props.theme.box.background};
		font-size: 0.9em;
		cursor: default;
		min-height: 32px;
	}
	.Toastify__toast--rtl {
	}
	.Toastify__toast--dark {
	}
	.Toastify__toast--default {
		border: ${(props: aut.theme.StyleProps) => props.theme.box.border};
	}
	.Toastify__toast--info {
		border: ${(props: aut.theme.StyleProps) => props.theme.info.border};
		color: ${(props: aut.theme.StyleProps) => props.theme.info.color};
	}
	.Toastify__toast--success {
		border: ${(props: aut.theme.StyleProps) => props.theme.success.border};
		color: ${(props: aut.theme.StyleProps) => props.theme.success.color};
	}
	.Toastify__toast--warning {
		border: ${(props: aut.theme.StyleProps) => props.theme.warning.border};
		color: ${(props: aut.theme.StyleProps) => props.theme.warning.color};
	}
	.Toastify__toast--error {
		border: ${(props: aut.theme.StyleProps) => props.theme.error.border};
		color: ${(props: aut.theme.StyleProps) => props.theme.error.color};
	}
	.Toastify__toast-body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		white-space: pre-line;
	}

	/** Classes for the close button. Better use your own closeButton **/
	.Toastify__close-button {
		position: absolute;
		right: 6px;
		top: 6px;
	}
	.Toastify__close-button--default {
	}
	.Toastify__close-button > svg {
	}
	.Toastify__close-button:hover, .Toastify__close-button:focus {
	}

	/** Classes for the progress bar **/
	.Toastify__progress-bar {
		background: ${(props: aut.theme.StyleProps) => props.theme.row.background};
	}
	.Toastify__progress-bar--animated {
	}
	.Toastify__progress-bar--controlled {
	}
	.Toastify__progress-bar--rtl {
	}
	.Toastify__progress-bar--default {
	}
	.Toastify__progress-bar--dark {
	}
`;
