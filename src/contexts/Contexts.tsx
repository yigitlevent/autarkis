import { createContext } from "react";

export const ClientContext = createContext({
	clientState: "precheck" as aut.ClientState,
	clientUsername: undefined as undefined | string,
	setClientState: (() => { /* */ }) as aut.DispSet<aut.ClientState>,
	setClientUsername: (() => { /* */ }) as aut.DispSet<undefined | string>
});
