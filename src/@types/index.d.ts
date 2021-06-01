namespace aut {

	type DispSet<T> = React.Dispatch<React.SetStateAction<T>>;

	type ReactInputEvent = React.MouseEvent<HTMLInputElement, MouseEvent>;

	type ClientState = "offline" | "signedin" | "signedout" | "presign";

	type SheetDisplayType = "new" | "edit" | "view";

	type SheetCategory = "generator" | "character" | "chronicle";

}
