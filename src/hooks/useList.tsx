import { useCallback, useEffect, useState } from "react";

import { DatabaseClient } from "../index";

export function useList(isOnline: boolean, tableName: aut.server.TableNames, userUUID?: string): [aut.server.DataReturn[] | undefined, boolean, boolean, () => Promise<void>] {
	const [list, setList] = useState<undefined | aut.server.DataReturn[]>();
	const [error, setError] = useState(false);
	const [done, setDone] = useState(false);

	const requestList = useCallback(async () => {
		if (isOnline && userUUID) {
			const templist = await DatabaseClient.from<aut.server.DataReturn>(tableName)
				.select("*").eq("user_uuid", userUUID);

			if (templist.data) {
				setList(templist.data);
				setError(false);
			}
			else {
				setList(undefined);
				setError(true);
			}
		}
		else {
			setList(undefined);
			setError(false);
		}

		setDone(true);
	}, [isOnline, tableName, userUUID]);

	useEffect(() => {
		if (isOnline && userUUID) { requestList(); }
	}, [isOnline, requestList, tableName, userUUID]);

	return [list, error, done, requestList];
}
