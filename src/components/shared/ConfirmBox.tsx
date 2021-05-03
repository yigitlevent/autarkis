import { Topbox, TopboxButton, TopboxChildren } from "./Topbox";

export function ConfirmBox({ title, innerHTML, button, callback, close }: aut.props.ConfirmBox): JSX.Element {
	return (
		<Topbox title={title}>
			<TopboxChildren columns={1} span={2}>
				{innerHTML}
			</TopboxChildren>

			<TopboxChildren columns={0} span={2} topBorder>
				<TopboxButton name="r.misc.offline" value={button} onClick={() => callback()} />
				<TopboxButton name="r.misc.close" value="Cancel" onClick={() => { close(); }} />
			</TopboxChildren>
		</Topbox>
	);
}
