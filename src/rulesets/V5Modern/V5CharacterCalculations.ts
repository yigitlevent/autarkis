import { V5Modern } from "../V5Modern";

export const V5CharacterCalculations = (sheetData: aut.data.GenericData): aut.data.GenericData => {
	const tempData = sheetData;

	// Everything that determined by Blood Potency
	const bloodPotency = tempData.the_blood?.blood_potency.dot.current as number;
	if (bloodPotency >= 0) {
		const row = V5Modern.characterMisc.bloodPotency[bloodPotency];

		tempData.the_blood.blood_surge.text.current = row["blood_surge"].toString();
		tempData.the_blood.mend_amount.text.current = row["mend_amount"].toString();
		tempData.the_blood.power_bonus.text.current = row["power_bonus"].toString();
		tempData.the_blood.rouse_check.text.current = row["rouse_check"].toString();
		tempData.the_blood.bane_severity.text.current = row["bane_severity"].toString();
		tempData.the_blood.feeding_penalty.textarea.current = row["feeding_penalty"];
	}

	if (tempData.the_blood) {
		// Health Calculation
		tempData.the_blood.health.dot.current = 3 + (tempData.attributes.stamina.dot.current as number);

		// Willpower Calculation
		tempData.the_blood.willpower.dot.current = (tempData.attributes.composure.dot.current as number) + (tempData.attributes.resolve.dot.current as number);
	}

	return tempData;
};
