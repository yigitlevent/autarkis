import { createContext } from "react";

export const ClientContext = createContext({
	clientState: "precheck" as aut.short.ClientState,
	clientUsername: undefined as undefined | string,
	setClientState: (() => { /* */ }) as aut.short.DispSet<aut.short.ClientState>,
	setClientUsername: (() => { /* */ }) as aut.short.DispSet<undefined | string>
});

export const SheetContext = createContext({
	sheetCategory: undefined as (undefined | aut.short.SheetCategory),
	sheetUUID: undefined as (undefined | string),
	sheetRuleset: undefined as (undefined | aut.ruleset.Names),
	changeSheet: (() => { /* */ }) as (category: undefined | aut.short.SheetCategory, uuid: undefined | string, ruleset: aut.ruleset.Names | "none" | undefined, refetch: boolean) => void
});
