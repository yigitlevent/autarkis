export function CleanData(string: string): string {
	const temp = document.createElement("textarea");
	temp.innerHTML = string;
	return temp.value;
}

export function CleanString(string: string): string {
	return string.toLowerCase().replaceAll(" ", "_").replaceAll("/", "_").replaceAll(",", "_").replaceAll("-", "_");
}

export function DirtyString(string: string): string {
	const parts = string.split("_");
	parts.map((val) => CapitalizeFirstLetter(val));
	return parts.join(" ");
}

export function CapitalizeFirstLetter(str: string): string {
	if (typeof str !== "string") return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SortObjects(array?: any[]): any[] | undefined {
	if (!array) return undefined;
	return array.sort((a, b) => { return a.name.localeCompare(b.name); });
}
