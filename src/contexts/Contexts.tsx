import { createContext } from "react";

export const ClientContext = createContext({
	clientState: "precheck" as aut.short.ClientState,
	clientUsername: undefined as undefined | string,
	setClientState: (() => { /* */ }) as aut.short.DispSet<aut.short.ClientState>,
	setClientUsername: (() => { /* */ }) as aut.short.DispSet<undefined | string>
});
