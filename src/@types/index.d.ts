namespace aut {

	type DispSet<T> = React.Dispatch<React.SetStateAction<T>>;

	type Events = React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

	type ClientState = "offline" | "signedin" | "signedout" | "presign";

	type SheetDisplayType = "new" | "edit" | "view";

	type ListChange = "add" | "remove";

	type SheetCategory = "generator" | "character" | "chronicle";

}
