import { Topbox, TopboxBox, TopboxTitle, TopboxButton, TopboxChildren } from "./Topbox";

export function ConfirmBox({ title, innerHTML, button, callback, close }: aut.props.ConfirmBox): JSX.Element {
	return (
		<Topbox>
			<TopboxBox>
				<TopboxTitle>{title}</TopboxTitle>

				<TopboxChildren columns={1} span={2}>
					{innerHTML}
				</TopboxChildren>

				<TopboxChildren columns={0} span={2} topBorder>
					<TopboxButton id="r.misc.offline" value={button} onClick={() => callback()} />
					<TopboxButton id="r.misc.close" value="Cancel" onClick={() => close()} />
				</TopboxChildren>
			</TopboxBox>
		</Topbox>
	);
}
