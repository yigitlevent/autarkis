import { V5ModernBloodPotency, V5ModernClans, V5ModernDisciplines, V5ModernSkillDistributions, V5ModernPredatorTypes, V5ModernCharacterAdvantages } from "./V5Modern/V5ModernMisc";
import { V5Tests } from "./V5Modern/V5ModernTests";
import { V5ModernCharacterSheet } from "./V5Modern/V5ModernCharacter";
import { V5ModernGenerator } from "./V5Modern/V5ModernGenerator";
import { V5CharacterCalculations } from "./V5Modern/V5CharacterCalculations";

const V5ModernBasicLists: aut.ruleset.BasicLists = {
	attributes: V5ModernCharacterSheet[2].columns.flat().map((v) => v.title),
	skills: V5ModernCharacterSheet[3].columns.flat().map((v) => v.title),
	skill_distributions: Object.keys(V5ModernSkillDistributions),
	clans: Object.values(V5ModernClans).map((v) => v.name),
	disciplines: Object.values(V5ModernDisciplines).map((v) => v.name),
	predator_types: Object.values(V5ModernPredatorTypes).map((v) => v.name),
	advantages: Object.values(V5ModernCharacterAdvantages).map(v => Object.values(v)).flat().map(v => v.name),
	generations: [
		"16th (Childe)", "15th (Childe)", "14th (Childe)",
		"13th (Childe)", "12th (Childe)",
		"13th (Neonate)", "12th (Neonate)",
		"11th (Neonate)", "10th (Ancillae)"
	],
	experience_systems: ["Freeform", "V5 Modern Costs"],
	character_types: ["Freeform", "V5 Modern Generated"],
};

export const V5Modern: aut.ruleset.Ruleset = {
	namings: {
		campaign: "Chronicle",
		character: "Character",
		group: "Coterie"
	},
	basicLists: V5ModernBasicLists,
	characterSheet: V5ModernCharacterSheet,
	generatorConditions: V5ModernGenerator,
	characterMisc: {
		bloodPotency: V5ModernBloodPotency,
		clans: V5ModernClans,
		predator_types: V5ModernPredatorTypes,
		character_advantages: V5ModernCharacterAdvantages,
		disciplines: V5ModernDisciplines,
		skill_distributions: V5ModernSkillDistributions
	},
	tests: V5Tests,
	characterCalculations: V5CharacterCalculations
};
