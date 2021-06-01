import { Topbox, TopboxBox, TopboxTitle, TopboxButton, TopboxChildren } from "./Topbox";

export function ConfirmBox({ title, innerHTML, button, callback, close }: aut.props.ConfirmBox): JSX.Element {
	return (
		<Topbox>
			<TopboxBox>
				<TopboxTitle>{title}</TopboxTitle>

				<TopboxChildren columns={1} span={2}>
					{innerHTML}
				</TopboxChildren>

				{(callback || close)
					? <TopboxChildren columns={0} span={2} topBorder>
						{(callback) ? <TopboxButton id="r.misc.offline" value={button} onClick={callback} /> : null}
						{(close) ? <TopboxButton id="r.misc.close" value="Cancel" onClick={close} /> : null}
					</TopboxChildren>
					: null
				}
			</TopboxBox>
		</Topbox>
	);
}
