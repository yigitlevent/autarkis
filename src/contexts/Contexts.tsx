import { createContext } from "react";

export const ClientContext = createContext({
	clientState: "precheck" as aut.short.ClientState,
	clientUsername: undefined as undefined | string,
	setClientState: (() => { /* */ }) as aut.short.DispSet<aut.short.ClientState>,
	setClientUsername: (() => { /* */ }) as aut.short.DispSet<undefined | string>
});

export const SheetContext = createContext({
	sheetCategory: undefined as (undefined | "character" | "chronicle"),
	sheetUUID: undefined as (undefined | string),
	sheetRuleset: undefined as (undefined | aut.ruleset.Names),
	changeSheet: (() => { /* */ }) as (type: undefined | "character" | "chronicle", uuid: undefined | string, ruleset: "v5Modern" | "none" | undefined, refetch: boolean) => void
});
