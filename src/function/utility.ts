export function CleanData(string: string): string {
	const temp = document.createElement("textarea");
	temp.innerHTML = string;
	return temp.value;
}

export function CleanString(string: string): string {
	const temp = string.split(" ");
	temp[0] = temp[0].toLowerCase();
	return temp.join().replaceAll("&", "").replaceAll("/", "").replaceAll(",", "").replaceAll("-", "");
}

export function CapitalizeFirstLetter(str: string): string {
	if (typeof str !== "string") return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SortObjects(array?: any[]): any[] | undefined {
	if (!array) return undefined;
	return array.sort((a, b) => { return a.name.localeCompare(b.name); });
}
