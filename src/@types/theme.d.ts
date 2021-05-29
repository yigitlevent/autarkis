namespace aut {

	namespace theme {

		interface StyleProps extends ThemedStyledProps {
			theme: Palette;
			mainFont?: string;
			italicFont?: string;
		}

		interface Palette {
			surface: {
				background: string;
				color: string;
			};
			box: {
				background: string;
				border: string;
			};
			row: {
				background: string;
				border: string;
			};
			element: {
				background: string;
				backgroundLight: string;
				border: string;
			};
			link: {
				color: string;
			};
			success: {
				color: string;
				border: string;
			};
			warning: {
				color: string;
				border: string;
			};
			error: {
				color: string;
				border: string;
			};
			info: {
				color: string;
				border: string;
			};
			transparent: string;
			gradient: string;
		}

	}

}
