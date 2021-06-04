import { SmallBox as LargeBox } from "../shared/Box";
import { Title } from "../shared/Sheet";
import { Spinner } from "../shared/Spinner";

export function TestWrapper({ sheetID, sheet, characterData }: aut.props.TestWrapper): JSX.Element {

	console.log(sheetID);
	console.log(sheet);
	console.log(characterData);

	return (
		(!characterData.isLoaded)
			? <Spinner />
			: <LargeBox>
				<Title>
					<div>TEST WRAPPER</div>
					<div></div>
				</Title>

			</LargeBox >
	);
}
