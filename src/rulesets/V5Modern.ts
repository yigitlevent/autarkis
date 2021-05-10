import { BinomialDistribution, Roll } from "../function/dice";
import { GetOrdinalSuffix } from "../function/utility";

import { Checkbox, Dot, PreCheckbox, PseudoCheckbox, Switch, Text, Textarea } from "./_generic";

const V5ModernBasics: aut.ruleset.Basics = {
	pseudoCheckboxInputs: {
		empty: "",
		slash: "╱",
		cross: "╳",
		square: "⯀"
	},
	attributes: [
		"Strength", "Dexterity", "Stamina",
		"Charisma", "Manipulation", "Composure",
		"Intelligence", "Wits", "Resolve",
	],
	skills: [
		"Athletics", "Brawl", "Craft", "Drive", "Firearms", "Larceny", "Melee", "Stealth", "Survival",
		"Animal Ken", "Etiquette", "Insight", "Intimidation", "Leadership", "Performance", "Persuasion", "Streetwise", "Subterfuge",
		"Academics", "Awareness", "Finance", "Investigation", "Medicine", "Occult", "Politics", "Science", "Technology"
	],
	disciplines: [
		"Animalism", "Auspex", "Blood Sorcery", "Celerity", "Dominate",
		"Fortitude", "Obfuscate", "Oblivion", "Potence", "Presence",
		"Protean", "Thin-Blood Alchemy", "Custom 0", "Custom 1", "Custom 2"
	]
};

class V5ModernCharacter {
	[key: string]: {
		[key: string]: {
			[key: string]: Text | Dot | Checkbox | PreCheckbox | PseudoCheckbox | Textarea;
		};
	};

	_primary = {
		uuid: { text: new Text() },
		chronicle_uuid: { text: new Text() },
		player_uuid: { text: new Text() },

		editable: { switch: new Switch() }, // TODO: Remove

		ruleset: { text: new Text() }, // TODO: v5Modern
		experience: { text: new Text() }, // TODO: Freeform, V5 Costs
		chargen: { text: new Text() }, // TODO: Freeform, V5 Points

		updated_at: { text: new Text() },
		created_at: { text: new Text() }
	};

	basics = {
		name: { text: new Text() },
		clan: { text: new Text() },
		sect: { text: new Text() },
		player_name: { text: new Text() },
		predator_type: { text: new Text() },
		rank_title: { text: new Text() },
		chronicle_name: { text: new Text() },
		ambition: { text: new Text() },
		desire: { text: new Text() }
	};

	attributes = {
		strength: { dot: new Dot(5) },
		dexterity: { dot: new Dot(5) },
		stamina: { dot: new Dot(5) },
		charisma: { dot: new Dot(5) },
		manipulation: { dot: new Dot(5) },
		composure: { dot: new Dot(5) },
		intelligence: { dot: new Dot(5) },
		wits: { dot: new Dot(5) },
		resolve: { dot: new Dot(5) }
	};

	skills = {
		academics: { dot: new Dot(5), text: new Text() },
		animal_ken: { dot: new Dot(5), text: new Text() },
		athletics: { dot: new Dot(5), text: new Text() },
		awareness: { dot: new Dot(5), text: new Text() },
		brawl: { dot: new Dot(5), text: new Text() },
		craft: { dot: new Dot(5), text: new Text() },
		drive: { dot: new Dot(5), text: new Text() },
		etiquette: { dot: new Dot(5), text: new Text() },
		finance: { dot: new Dot(5), text: new Text() },
		firearms: { dot: new Dot(5), text: new Text() },
		insight: { dot: new Dot(5), text: new Text() },
		intimidation: { dot: new Dot(5), text: new Text() },
		investigation: { dot: new Dot(5), text: new Text() },
		larceny: { dot: new Dot(5), text: new Text() },
		leadership: { dot: new Dot(5), text: new Text() },
		medicine: { dot: new Dot(5), text: new Text() },
		melee: { dot: new Dot(5), text: new Text() },
		occult: { dot: new Dot(5), text: new Text() },
		performance: { dot: new Dot(5), text: new Text() },
		persuasion: { dot: new Dot(5), text: new Text() },
		politics: { dot: new Dot(5), text: new Text() },
		science: { dot: new Dot(5), text: new Text() },
		stealth: { dot: new Dot(5), text: new Text() },
		streetwise: { dot: new Dot(5), text: new Text() },
		subterfuge: { dot: new Dot(5), text: new Text() },
		survival: { dot: new Dot(5), text: new Text() },
		technology: { dot: new Dot(5), text: new Text() }
	};

	disciplines = {
		animalism: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		animalism_1: { text: new Text() },
		animalism_2: { text: new Text() },
		animalism_3: { text: new Text() },
		animalism_4: { text: new Text() },
		animalism_5: { text: new Text() },

		auspex: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		auspex_1: { text: new Text() },
		auspex_2: { text: new Text() },
		auspex_3: { text: new Text() },
		auspex_4: { text: new Text() },
		auspex_5: { text: new Text() },

		blood_sorcery: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		blood_sorcery1: { text: new Text() },
		blood_sorcery2: { text: new Text() },
		blood_sorcery3: { text: new Text() },
		blood_sorcery4: { text: new Text() },
		blood_sorcery5: { text: new Text() },

		celerity: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		celerity_1: { text: new Text() },
		celerity_2: { text: new Text() },
		celerity_3: { text: new Text() },
		celerity_4: { text: new Text() },
		celerity_5: { text: new Text() },

		dominate: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		dominate_1: { text: new Text() },
		dominate_2: { text: new Text() },
		dominate_3: { text: new Text() },
		dominate_4: { text: new Text() },
		dominate_5: { text: new Text() },

		fortitude: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		fortitude_1: { text: new Text() },
		fortitude_2: { text: new Text() },
		fortitude_3: { text: new Text() },
		fortitude_4: { text: new Text() },
		fortitude_5: { text: new Text() },

		obfuscate: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		obfuscate_1: { text: new Text() },
		obfuscate_2: { text: new Text() },
		obfuscate_3: { text: new Text() },
		obfuscate_4: { text: new Text() },
		obfuscate_5: { text: new Text() },

		oblivion: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		oblivion_1: { text: new Text() },
		oblivion_2: { text: new Text() },
		oblivion_3: { text: new Text() },
		oblivion_4: { text: new Text() },
		oblivion_5: { text: new Text() },

		potence: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		potence_1: { text: new Text() },
		potence_2: { text: new Text() },
		potence_3: { text: new Text() },
		potence_4: { text: new Text() },
		potence_5: { text: new Text() },

		presence: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		presence_1: { text: new Text() },
		presence_2: { text: new Text() },
		presence_3: { text: new Text() },
		presence_4: { text: new Text() },
		presence_5: { text: new Text() },

		protean: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		protean_1: { text: new Text() },
		protean_2: { text: new Text() },
		protean_3: { text: new Text() },
		protean_4: { text: new Text() },
		protean_5: { text: new Text() },

		thin_blood_alchemy: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		thin_blood_alchemy_1: { text: new Text() },
		thin_blood_alchemy_2: { text: new Text() },
		thin_blood_alchemy_3: { text: new Text() },
		thin_blood_alchemy_4: { text: new Text() },
		thin_blood_alchemy_5: { text: new Text() },

		custom_0: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom_0_1: { text: new Text() },
		custom_0_2: { text: new Text() },
		custom_0_3: { text: new Text() },
		custom_0_4: { text: new Text() },
		custom_0_5: { text: new Text() },

		custom_1: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom_1_1: { text: new Text() },
		custom_1_2: { text: new Text() },
		custom_1_3: { text: new Text() },
		custom_1_4: { text: new Text() },
		custom_1_5: { text: new Text() },

		custom_2: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom_2_1: { text: new Text() },
		custom_2_2: { text: new Text() },
		custom_2_3: { text: new Text() },
		custom_2_4: { text: new Text() },
		custom_2_5: { text: new Text() }
	};

	the_blood = {
		health: { dot: new Dot(15), pseudocheckbox: new PseudoCheckbox(15, ["empty", "slash", "cross"], "v5_modern") },
		willpower: { dot: new Dot(15), pseudocheckbox: new PseudoCheckbox(15, ["empty", "slash", "cross"], "v5_modern") },
		hunger: { checkbox: new Checkbox(5) },
		resonance: { text: new Text(), checkbox: new Checkbox(3) },
		humanity: { pseudocheckbox: new PseudoCheckbox(10, ["empty", "slash", "square"], "v5_modern") },
		blood_potency: { dot: new Dot(10) },
		generation: { text: new Text() },

		total: { textarea: new Text() },
		spent: { textarea: new Text() },
		current: { textarea: new Text() },
		notes: { textarea: new Textarea() },

		rouse_check: { text: new Text() },
		blood_surge: { text: new Text() },
		mend_amount: { text: new Text() },
		power_bonus: { text: new Text() },
		bane_severity: { text: new Text() },
		feeding_penalty: { textarea: new Textarea() }
	};

	advantages = {
		advantages_0: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_1: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_2: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_3: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_4: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_5: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_6: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_7: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages_8: { text: new Text(), dot: new Dot(5), textarea: new Textarea() }
	};

	clan = {
		bane: { textarea: new Textarea() },
		compulsion: { textarea: new Textarea() },
		notes: { textarea: new Textarea() }
	};

	profile = {
		mortal_days: { textarea: new Textarea() },
		description: { textarea: new Textarea() },
		kindred_nights: { textarea: new Textarea() },
		bane: { textarea: new Textarea() },
		compulsion: { textarea: new Textarea() },
		notes: { textarea: new Textarea() }
	};

	beliefs = {
		tenets: { textarea: new Textarea() },
		convictions: { textarea: new Textarea() },
		touchstones: { textarea: new Textarea() }
	};

	haven = {
		haven_0: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		haven_1: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		haven_2: { text: new Text(), dot: new Dot(5), textarea: new Textarea() }
	};

	equipment = {
		weapon_0: { text: new Text(), dot: new Dot(5) },
		weapon_1: { text: new Text(), dot: new Dot(5) },
		weapon_2: { text: new Text(), dot: new Dot(5) },
		weapon_3: { text: new Text(), dot: new Dot(5) },
		weapon_4: { text: new Text(), dot: new Dot(5) },
		armor_0: { text: new Text(), dot: new Dot(6) },
		armor_1: { text: new Text(), dot: new Dot(6) },
		armor_2: { text: new Text(), dot: new Dot(6) },
		armor_3: { text: new Text(), dot: new Dot(6) },
		armor_4: { text: new Text(), dot: new Dot(6) },
		other_0: { text: new Text() },
		other_1: { text: new Text() },
		other_2: { text: new Text() },
		other_3: { text: new Text() },
		other_4: { text: new Text() },
	};
}

const V5ModernCharacterSheet: aut.ruleset.CharacterSheetLayout = [
	{
		title: "Basics",
		showTitle: false,
		columns: [
			[
				{ title: "Name", showTitle: true, inputs: ["text"] },
				{ title: "Clan", showTitle: true, inputs: ["text"] },
				{ title: "Sect", showTitle: true, inputs: ["text"] },
			],
			[
				{ title: "Player", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Predator Type", showTitle: true, inputs: ["text"] },
				{ title: "Rank/Title", showTitle: true, inputs: ["text"] },
			],
			[
				{ title: "Chronicle", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Ambition", showTitle: true, inputs: ["text"] },
				{ title: "Desire", showTitle: true, inputs: ["text"] },
			]

		]
	},
	{
		title: "Attributes",
		showTitle: true,
		columns: [
			[
				{ title: "Strength", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Dexterity", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Stamina", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
			],
			[
				{ title: "Charisma", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Manipulation", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Composure", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
			],
			[
				{ title: "Intelligence", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Wits", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
				{ title: "Resolve", showTitle: true, inputs: ["dot"], dot: { amount: 5 } },
			]
		]
	},
	{
		title: "Skills",
		showTitle: true,
		columns: [
			[
				{ title: "Athletics", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Brawl", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Craft", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Drive", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Firearms", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Larceny", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Melee", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Stealth", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Survival", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
			],
			[
				{ title: "Animal Ken", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Etiquette", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Insight", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Intimidation", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Leadership", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Performance", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Persuasion", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Streetwise", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Subterfuge", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
			],
			[
				{ title: "Academics", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Awareness", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Finance", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Investigation", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Medicine", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Occult", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Politics", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Science", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "Technology", showTitle: true, inputs: ["text", "dot"], dot: { amount: 5 } },
			]
		]
	},
	{
		title: "The Blood",
		showTitle: true,
		columns: [
			[
				{ title: "Health", showTitle: true, boldTitle: true, isTestable: true, align: "center", inputs: [] },
				{ title: "Health", align: "center", isReadOnly: true, inputs: ["dot"], dot: { amount: 15 } },
				{ title: "Health", align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 15, possibleValues: ["empty", "slash", "cross"] } },

				{ title: "empty 0", inputs: [] },

				{ title: "Willpower", showTitle: true, boldTitle: true, isTestable: true, align: "center", inputs: [] },
				{ title: "Willpower", align: "center", isReadOnly: true, inputs: ["dot"], dot: { amount: 15 } },
				{ title: "Willpower", align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 15, possibleValues: ["empty", "slash", "cross"] } },

				{ title: "empty 1", inputs: [] },

				{ title: "Humanity", showTitle: true, isTestable: true, align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 10, possibleValues: ["empty", "slash", "square"] } },
				{ title: "Hunger", showTitle: true, inputs: ["checkbox"], checkbox: { amount: 5 } },
				{ title: "Resonance", showTitle: true, inputs: ["text", "checkbox"], checkbox: { amount: 3 } },
			],
			[
				{ title: "Blood Potency", showTitle: true, inputs: ["dot"], dot: { amount: 10 } },
				{ title: "Generation", showTitle: true, inputs: ["text"] },

				{ title: "empty 3", inputs: [] },

				{ title: "Experience", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "Total", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Spent", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Current", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Notes", showTitle: true, inputs: ["textarea"], textarea: { amount: 3 } }
			],
			[
				{ title: "Rouse Check", showTitle: true, isReadOnly: true, isTestable: true, inputs: ["text"] },
				{ title: "Blood Surge", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Mend Amount", showTitle: true, isReadOnly: true, inputs: ["text"] },

				{ title: "Power Bonus", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Bane Severity", showTitle: true, isReadOnly: true, inputs: ["text"] },

				{ title: "empty2", inputs: [] },

				{ title: "Feeding Penalty", showTitle: true, isReadOnly: true, inputs: ["textarea"], textarea: { amount: 4 } }
			]
		]
	},
	{
		title: "Disciplines",
		showTitle: true,
		columns: [
			[
				{ title: "Animalism", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Animalism 1", inputs: ["text"] },
				{ title: "Animalism 2", inputs: ["text"] },
				{ title: "Animalism 3", inputs: ["text"] },
				{ title: "Animalism 4", inputs: ["text"] },
				{ title: "Animalism 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Auspex", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Auspex 1", inputs: ["text"] },
				{ title: "Auspex 2", inputs: ["text"] },
				{ title: "Auspex 3", inputs: ["text"] },
				{ title: "Auspex 4", inputs: ["text"] },
				{ title: "Auspex 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Blood Sorcery", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Blood Sorcery 1", inputs: ["text"] },
				{ title: "Blood Sorcery 2", inputs: ["text"] },
				{ title: "Blood Sorcery 3", inputs: ["text"] },
				{ title: "Blood Sorcery 4", inputs: ["text"] },
				{ title: "Blood Sorcery 5", inputs: ["text"] },

				{ title: "empty2", inputs: [] },

				{ title: "Celerity", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Celerity 1", inputs: ["text"] },
				{ title: "Celerity 2", inputs: ["text"] },
				{ title: "Celerity 3", inputs: ["text"] },
				{ title: "Celerity 4", inputs: ["text"] },
				{ title: "Celerity 5", inputs: ["text"] },

				{ title: "empty3", inputs: [] },

				{ title: "Dominate", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Dominate 1", inputs: ["text"] },
				{ title: "Dominate 2", inputs: ["text"] },
				{ title: "Dominate 3", inputs: ["text"] },
				{ title: "Dominate 4", inputs: ["text"] },
				{ title: "Dominate 5", inputs: ["text"] }
			],
			[
				{ title: "Fortitude", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Fortitude 1", inputs: ["text"] },
				{ title: "Fortitude 2", inputs: ["text"] },
				{ title: "Fortitude 3", inputs: ["text"] },
				{ title: "Fortitude 4", inputs: ["text"] },
				{ title: "Fortitude 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Obfuscate", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Obfuscate 1", inputs: ["text"] },
				{ title: "Obfuscate 2", inputs: ["text"] },
				{ title: "Obfuscate 3", inputs: ["text"] },
				{ title: "Obfuscate 4", inputs: ["text"] },
				{ title: "Obfuscate 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Oblivion", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Oblivion 1", inputs: ["text"] },
				{ title: "Oblivion 2", inputs: ["text"] },
				{ title: "Oblivion 3", inputs: ["text"] },
				{ title: "Oblivion 4", inputs: ["text"] },
				{ title: "Oblivion 5", inputs: ["text"] },

				{ title: "empty2", inputs: [] },

				{ title: "Potence", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Potence 1", inputs: ["text"] },
				{ title: "Potence 2", inputs: ["text"] },
				{ title: "Potence 3", inputs: ["text"] },
				{ title: "Potence 4", inputs: ["text"] },
				{ title: "Potence 5", inputs: ["text"] },

				{ title: "empty3", inputs: [] },

				{ title: "Presence", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Presence 1", inputs: ["text"] },
				{ title: "Presence 2", inputs: ["text"] },
				{ title: "Presence 3", inputs: ["text"] },
				{ title: "Presence 4", inputs: ["text"] },
				{ title: "Presence 5", inputs: ["text"] }
			],
			[
				{ title: "Protean", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Protean 1", inputs: ["text"] },
				{ title: "Protean 2", inputs: ["text"] },
				{ title: "Protean 3", inputs: ["text"] },
				{ title: "Protean 4", inputs: ["text"] },
				{ title: "Protean 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Thin-Blood Alchemy", showTitle: true, inputs: ["precheckbox", "dot"], dot: { amount: 5 } },
				{ title: "Thin-Blood Alchemy 1", inputs: ["text"] },
				{ title: "Thin-Blood Alchemy 2", inputs: ["text"] },
				{ title: "Thin-Blood Alchemy 3", inputs: ["text"] },
				{ title: "Thin-Blood Alchemy 4", inputs: ["text"] },
				{ title: "Thin-Blood Alchemy 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Custom 0", inputs: ["precheckbox", "text", "dot"], dot: { amount: 5 } },
				{ title: "Custom 0 1", inputs: ["text"] },
				{ title: "Custom 0 2", inputs: ["text"] },
				{ title: "Custom 0 3", inputs: ["text"] },
				{ title: "Custom 0 4", inputs: ["text"] },
				{ title: "Custom 0 5", inputs: ["text"] },

				{ title: "empty2", inputs: [] },

				{ title: "Custom 1", inputs: ["precheckbox", "text", "dot"], dot: { amount: 5 } },
				{ title: "Custom 1 1", inputs: ["text"] },
				{ title: "Custom 1 2", inputs: ["text"] },
				{ title: "Custom 1 3", inputs: ["text"] },
				{ title: "Custom 1 4", inputs: ["text"] },
				{ title: "Custom 1 5", inputs: ["text"] },

				{ title: "empty3", inputs: [] },

				{ title: "Custom 2", inputs: ["precheckbox", "text", "dot"], dot: { amount: 5 } },
				{ title: "Dominate 1", inputs: ["text"] },
				{ title: "Dominate 2", inputs: ["text"] },
				{ title: "Dominate 3", inputs: ["text"] },
				{ title: "Dominate 4", inputs: ["text"] },
				{ title: "Dominate 5", inputs: ["text"] }
			]
		]
	},
	{
		title: "Advantages",
		showTitle: true,
		columns: [
			[
				{ title: "Advantages 0", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 1", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 2", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
			],
			[
				{ title: "Advantages 3", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 4", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 5", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
			],
			[
				{ title: "Advantages 6", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 7", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
				{ title: "Advantages 8", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } },
			]
		]
	},
	{
		title: "Clan",
		showTitle: true,
		columns: [
			[
				{ title: "Bane", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			],
			[
				{ title: "Compulsion", showTitle: true, isTestable: true, inputs: ["textarea"], textarea: { amount: 5 } }
			],
			[
				{ title: "Notes", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			]
		]
	},
	{
		title: "Profile",
		showTitle: true,
		columns: [
			[
				{ title: "Mortal Days", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
				{ title: "Description", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
			],
			[
				{ title: "Kindred Nights", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
				{ title: "Appearance", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
			],
			[
				{ title: "Features", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
				{ title: "Embrace", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } },
			]
		]
	},
	{
		title: "Beliefs",
		showTitle: true,
		columns: [
			[
				{ title: "Tenets", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			],
			[
				{ title: "Convictions", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			],
			[
				{ title: "Touchstones", showTitle: true, inputs: ["textarea"], textarea: { amount: 5 } }
			]
		]
	},
	{
		title: "Haven",
		showTitle: true,
		columns: [
			[
				{ title: "Haven 0", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } }
			],
			[
				{ title: "Haven 1", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } }
			],
			[
				{ title: "Haven 2", inputs: ["text", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 } }
			]
		]
	},
	{
		title: "Equipment",
		showTitle: true,
		columns: [
			[
				{ title: "Weapons", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "weapon 0", inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "weapon 1", inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "weapon 2", inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "weapon 3", inputs: ["text", "dot"], dot: { amount: 5 } },
				{ title: "weapon 4", inputs: ["text", "dot"], dot: { amount: 5 } },
			],
			[
				{ title: "Armor", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "armor 0", inputs: ["text", "dot"], dot: { amount: 6 } },
				{ title: "armor 1", inputs: ["text", "dot"], dot: { amount: 6 } },
				{ title: "armor 2", inputs: ["text", "dot"], dot: { amount: 6 } },
				{ title: "armor 3", inputs: ["text", "dot"], dot: { amount: 6 } },
				{ title: "armor 4", inputs: ["text", "dot"], dot: { amount: 6 } },
			],
			[
				{ title: "Other", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "other 0", inputs: ["text"] },
				{ title: "other 1", inputs: ["text"] },
				{ title: "other 2", inputs: ["text"] },
				{ title: "other 3", inputs: ["text"] },
				{ title: "other 4", inputs: ["text"] },
			]
		]
	},
];

const V5BloodPotency: aut.ruleset.BloodPotency = [
	{ // 0
		blood_surge: 1, mend_amount: 1, power_bonus: 0, rouse_check: 0, bane_severity: 0,
		feeding_penalty: "No effect"
	},
	{ // 1
		blood_surge: 2, mend_amount: 1, power_bonus: 0, rouse_check: 1, bane_severity: 2,
		feeding_penalty: "No effect"
	},
	{ // 2
		blood_surge: 2, mend_amount: 2, power_bonus: 1, rouse_check: 1, bane_severity: 2,
		feeding_penalty: "Animal and bagged blood slakes half Hunger."
	},
	{ // 3
		blood_surge: 3, mend_amount: 2, power_bonus: 1, rouse_check: 2, bane_severity: 3,
		feeding_penalty: "Animal and bagged blood slakes no Hunger."
	},
	{ // 4
		blood_surge: 3, mend_amount: 3, power_bonus: 2, rouse_check: 2, bane_severity: 3,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 1 less Hunger per human."
	},
	{ // 5
		blood_surge: 4, mend_amount: 3, power_bonus: 2, rouse_check: 3, bane_severity: 4,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 1 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 6
		blood_surge: 4, mend_amount: 3, power_bonus: 3, rouse_check: 3, bane_severity: 4,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 7
		blood_surge: 5, mend_amount: 3, power_bonus: 3, rouse_check: 4, bane_severity: 5,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 8
		blood_surge: 5, mend_amount: 4, power_bonus: 4, rouse_check: 4, bane_severity: 5,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
	{ // 9
		blood_surge: 6, mend_amount: 4, power_bonus: 4, rouse_check: 5, bane_severity: 6,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
	{ // 10
		blood_surge: 6, mend_amount: 5, power_bonus: 5, rouse_check: 5, bane_severity: 6,
		feeding_penalty: "Animal and bagged blood slakes no Hunger. Slake 3 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
];

const StandardTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: Math.max(testData.misc.difficulty, 1)
		},
		info: []
	};

	const rolls: { [key: string]: aut.data.Roll; } = {};

	if (testData.pools.total_pool < 1) testData.pools.total_pool = 1;

	if (testData.flags.hunger) {
		rolls["normal"] = Roll(Math.max(0, testData.pools.total_pool - testData.pools.hunger));
		rolls["hunger"] = Roll(Math.min(testData.pools.total_pool, testData.pools.hunger));
	}
	else {
		rolls["normal"] = Roll(Math.max(testData.pools.total_pool));
	}

	for (const key in rolls) {
		rollResult.test.results[key] = rolls[key].results;
	}

	const totalSuccesses: number = rolls.normal.successes + ((rolls.hunger) ? rolls.hunger.successes : 0) + Math.floor(rolls.normal.tens / 2);

	if (totalSuccesses < rollResult.test.difficulty) {
		if (rolls.hunger && rolls.hunger.ones > 0) {
			rollResult.test.result = "Bestial Failure";
		}
		else {
			rollResult.test.result = "Failure";
		}
	}
	else {
		if ((rolls.hunger && rolls.normal.tens > 0 && rolls.hunger.tens > 0) || rolls.hunger.tens > 1) {
			rollResult.test.result = "Messy Critical";
		}
		else if (rolls.normal.tens > 1) {
			rollResult.test.result = "Critical";
		}
		else {
			rollResult.test.result = "Success";
		}
	}

	if (testData.flags.blood_surge) { } // TODO
	if (testData.flags.rouse_check) { } // TODO

	return rollResult;
};

const StandardProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const difficulty = testData.misc.difficulty;
	const dist: { [key: string]: aut.data.Distributions; } = {};
	dist["total"] = BinomialDistribution(testData.pools.total_pool);
	dist["normal"] = BinomialDistribution(Math.max(0, testData.pools.total_pool - ((testData.flags.hunger) ? testData.pools.hunger : 0)));
	dist["hunger"] = BinomialDistribution(Math.min(testData.pools.total_pool, (testData.flags.hunger) ? testData.pools.hunger : 0));

	const probabilities: { [key: string]: number; } = {
		messy_critical: 0,
		critical_success: 0,
		success: 0,
		failure: 0,
		bestial_failure: 0
	};

	if (testData.flags.hunger) {
		// TODO: There probably is a better way of combining binomial distributions
		for (let ss = 0; ss < dist.total.success.length; ss++) {
			for (let hc = 0; hc < dist.hunger.critical.length; hc++) {
				for (let nc = 0; nc < dist.normal.critical.length; nc++) {
					const probability = dist.total.success[ss] * dist.hunger.critical[hc] * dist.normal.critical[nc];

					if ((hc > 1 || (hc > 0 && nc > 0)) && (Math.floor((hc + nc) / 2) * 4) + ss >= difficulty) {
						probabilities.messy_critical += probability;
					}
					else if (nc > 1 && hc === 0 && ((Math.floor(nc / 2) * 4) >= difficulty || (Math.floor(nc / 2) * 4) + ss >= difficulty)) {
						probabilities.critical_success += probability;
					}
					else if (hc < 2 && nc < 2 && ss >= difficulty) {
						probabilities.success += probability;
					}
					else if (hc > 0 && ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
						probabilities.bestial_failure += probability;
					}
					else if (hc === 0 && ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
						probabilities.failure += probability;
					}
					else { console.log(`Logic Error -- ss: ${ss}, hc: ${hc}, nc: ${nc}`); }
				}
			}
		}
	}
	else {
		// TODO: There probably is a better way of combining binomial distributions
		for (let ss = 0; ss < dist.total.success.length; ss++) {
			for (let nc = 0; nc < dist.normal.critical.length; nc++) {
				const probability = dist.total.success[ss] * dist.normal.critical[nc];

				if (nc > 1 && ((Math.floor(nc / 2) * 4) >= difficulty || (Math.floor(nc / 2) * 4) + ss >= difficulty)) {
					probabilities.critical_success += probability;
				}
				else if (nc < 2 && ss >= difficulty) {
					probabilities.success += probability;
				}
				else if (ss < difficulty && (Math.floor(nc / 2) * 4) + ss < difficulty) {
					probabilities.bestial_failure += probability;
				}
				else { console.log(`Logic Error -- ss: ${ss}, nc: ${nc}`); }
			}
		}
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }
	probabilities["_sum"] = Object.values(probabilities).reduce((a, b) => a + b, 0);

	return probabilities;
};

const RouseCheck = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const rolls: { [key: string]: aut.data.Roll; } = {};

	for (let i = 0; i < testData.pools.check_amount; i++) {
		rolls[i] = Roll(V5BloodPotency[testData.character.blood_potency].rouse_check);
	}

	let successes = 0;
	let failures = 0;

	for (const key in rolls) {
		rollResult.test.results[`${key}${GetOrdinalSuffix(parseInt(key))}`] = rolls[key].results;
		if (rolls[key].successes >= 1) { successes++; }
		else { failures++; }
	}

	const result = [];
	if (successes > 0) { result.push(`${successes} Success${(successes > 1) ? "es" : ""}`); }
	if (failures > 0) { result.push(`${failures} Failure${(failures > 1) ? "s" : ""}`); }

	rollResult.test.result = result.join(", ");

	return rollResult;
};

const RouseProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist: number[] = [];
	for (let i = 0; i < testData.pools.check_amount; i++) {
		dist.push(
			BinomialDistribution(V5BloodPotency[testData.character.blood_potency].rouse_check)
				.success.slice(1).reduce((a, b) => a + b)
		);
	}

	const probabilities: { [key: string]: number; } = {};

	for (const key in dist) {
		const num = parseInt(key);
		probabilities[`${num} Success${(num > 1) ? "es" : ""}`] = dist.slice(0, num + 1).reduce((a, b) => a * b);
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const CripplingInjury = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const roll = Roll(1);
	const result = roll.results[0] + testData.character.aggravated_damage;

	if (result < 7) rollResult.test.result = "Stunned: Spend 1 point of Willpower or lose a turn.";
	else if (result < 9) rollResult.test.result = "Severe head trauma: Make Physical rolls at -1; Mental rolls at -2.";
	else if (result < 11) rollResult.test.result = "Broken limb or joint: Make rolls at -3 when using the affected limb.\nBlinded: Make vision-related rolls (including combat) at -3.\nStoryteller decides which makes most sense for this combat.";
	else if (result < 12) rollResult.test.result = "Massive wound: Make all rolls at -2, add +1 to all additional damage suffered.";
	else if (result < 13) rollResult.test.result = "Crippled: Same effects as Broken, but limb is lost or mangled beyond use.";
	else rollResult.test.result = "Death for mortals or immediate torpor for vampires.";

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const InjuryProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const probabilities: { [key: string]: number; } = {
		stunned: 0,
		severe_trauma: 0,
		broken_or_blinded: 0,
		massive_wound: 0,
		crippled: 0,
		death_or_torpor: 0
	};

	const min = testData.pools.aggravated;

	for (let i = 0; i < 10; i++) {
		if (min + i < 7) probabilities.stunned += 0.1;
		else if (min + i < 9) probabilities.severe_trauma += 0.1;
		else if (min + i < 11) probabilities.broken_or_blinded += 0.1;
		else if (min + i < 12) probabilities.massive_wound += 0.1;
		else if (min + i < 13) probabilities.crippled += 0.1;
		else probabilities.death_or_torpor += 0.1;
	}

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const FrenzyTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: Math.max(testData.misc.difficulty, 1)
		},
		info: []
	};

	const roll = Roll(testData.pools.total_pool);

	const totalSuccesses: number = roll.successes + Math.floor(roll.tens / 2);

	if (totalSuccesses >= rollResult.test.difficulty) {
		if (roll.tens >= 2) { rollResult.test.result = `Critical. ${rollResult.character.name} resists the frenzy without losing a turn.`; }
		else { rollResult.test.result = `Success. ${rollResult.character.name} must spend a turn to suppress the impulse.`; }
	}
	else { rollResult.test.result = "Failure. The Beast has the control now."; }

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const FrenzyProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist = BinomialDistribution(testData.pools.total_pool);
	const difficulty = testData.misc.difficulty;

	const probabilities: { [key: string]: number; } = {};

	probabilities["critical"] = dist.critical.slice(Math.ceil(difficulty / 2)).reduce((a, b) => a + b);
	probabilities["success"] = dist.success.slice(difficulty).reduce((a, b) => a + b);
	probabilities["failure"] = 1 - probabilities["success"];

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const RemorseTest = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 1
		},
		info: []
	};

	const roll = Roll(testData.pools.total_pool);

	const totalSuccesses: number = roll.successes + Math.floor(roll.tens / 2);
	if (totalSuccesses > 0) {
		rollResult.test.result = `${rollResult.character.name} has suffered enough guilt, shame, or regret to retain their current Humanity. They remove all Stains.`;
	}
	else {
		rollResult.test.result = `The Beast has won. ${rollResult.character.name} must lose 1 point of Humanity and then remove all Stains.`;
	}

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const RemorseProbabilities = (testData: aut.data.TestData): aut.data.ProbabilityResult => {
	const dist = BinomialDistribution(testData.pools.total_pool);

	const probabilities: { [key: string]: number; } = {};

	probabilities["success"] = dist.success.slice(1).reduce((a, b) => a + b);
	probabilities["failure"] = 1 - probabilities["success"];

	for (const key in probabilities) { probabilities[key] = Math.round(probabilities[key] * 100000) / 1000; }

	return probabilities;
};

const Compulsion = (testData: aut.data.TestData): aut.data.TestResult => {
	const rollResult: aut.data.TestResult = {
		character: {
			uuid: testData.character.uuid,
			name: testData.character.name,
		},
		title: testData.title,
		type: testData.type,
		test: {
			results: {},
			result: "",
			difficulty: 0
		},
		info: []
	};

	const roll = Roll(1);
	const result = roll.results;

	if (result[0] < 4) rollResult.test.result = "Hunger";
	else if (result[0] < 6) rollResult.test.result = "Dominance";
	else if (result[0] < 8) rollResult.test.result = "Harm";
	else if (result[0] < 10) rollResult.test.result = "Paranoia";
	else rollResult.test.result = "Clan Compulsion"; // TODO: maybe figure this out when clan stuff are added

	rollResult.test.results["normal"] = roll.results;

	return rollResult;
};

const CompulsionProbabilities = (): aut.data.ProbabilityResult => {
	const probabilities: { [key: string]: number; } = {
		hunger: 30,
		dominance: 20,
		harm: 20,
		paranoia: 20,
		clan_compulsion: 10,
	};

	return probabilities;
};

export const V5Modern: aut.ruleset.Ruleset<typeof V5ModernCharacter> = {
	basics: V5ModernBasics,
	character: V5ModernCharacter,
	characterSheet: V5ModernCharacterSheet,
	characterMisc: {
		bloodPotency: V5BloodPotency
	},
	tests: {
		standard: {
			title: "Standard Test",
			testFunction: StandardTest,
			probabilityFunction: StandardProbabilities,
			children: [
				{
					title: "Select Abilities",
					inputs: ["select"],
					select: { categories: ["Attributes", "Skills", "Disciplines"] },
				},
				{
					title: "Ability Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["0"]
				},
				{
					title: "Modifier",
					showTitle: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["0"]
				},
				{
					title: "Speciality",
					showTitle: true,
					isReadOnly: true,
					inputs: ["postcheckbox", "number"],
					addTo: "total_pool",
					defaultValue: ["1"]
				},
				{
					title: "Blood Surge",
					showTitle: true,
					isReadOnly: true,
					inputs: ["postcheckbox", "number"],
					addTo: "total_pool",
					defaultValue: ["the_blood", "blood_surge", "text"]
				},
				{
					title: "Hunger",
					showTitle: true,
					isReadOnly: true,
					inputs: ["postcheckbox", "number"],
					isPool: true,
					addTo: "hunger",
					defaultChecked: true,
					defaultValue: ["the_blood", "hunger", "checkbox"]
				},
				{
					title: "Rouse Check",
					showTitle: true,
					inputs: ["postcheckbox", "number"],
					isPool: true,
					addTo: "rouse_check",
					defaultValue: ["1"]
				},
				{
					title: "Difficulty",
					showTitle: true,
					inputs: ["number"],
					difficulty: true,
					defaultValue: ["1"]
				},
				{
					title: "Total Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					isPool: true,
					defaultValue: ["0"]
				}
			]
		},
		rouse_check: {
			title: "Rouse Check",
			testFunction: RouseCheck,
			probabilityFunction: RouseProbabilities,
			children: [
				{
					title: "Check Amount",
					showTitle: true,
					inputs: ["number"],
					defaultValue: ["0"],
					isPool: true,
					addTo: "check_amount"
				},
				{
					title: "empty",
					isReadOnly: true,
					inputs: []
				}
			]
		},
		health: {
			title: "Crippling Injury",
			testFunction: CripplingInjury,
			probabilityFunction: InjuryProbabilities,
			children: [
				{
					title: "Dice",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					defaultValue: ["1"],
					isPool: true,
					addTo: "dice"
				},
				{
					title: "Aggravated",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					defaultValue: ["the_blood", "health", "pseudocheckbox", "cross", "count"],
					isPool: true,
					addTo: "aggravated"
				}
			]
		},
		willpower: {
			title: "Frenzy Test",
			testFunction: FrenzyTest,
			probabilityFunction: FrenzyProbabilities,
			children: [
				{
					title: "Willpower Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["the_blood", "willpower", "pseudocheckbox", "square", "unmarked"]
				},
				{
					title: "Modifier",
					showTitle: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["0"]
				},
				{
					title: "Humanity",
					showTitle: true,
					isReadOnly: true,
					inputs: ["postcheckbox", "number"],
					addTo: "total_pool",
					defaultChecked: true,
					defaultValue: ["the_blood", "humanity", "pseudocheckbox", "empty", "count/3"]
				},
				{
					title: "empty",
					isReadOnly: true,
					inputs: []
				},
				{
					title: "Difficulty",
					showTitle: true,
					inputs: ["number"],
					difficulty: true,
					defaultValue: ["1"]
				},
				{
					title: "Total Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					isPool: true,
					defaultValue: ["0"]
				}
			]
		},
		humanity: {
			title: "Remorse Test",
			testFunction: RemorseTest,
			probabilityFunction: RemorseProbabilities,
			children: [
				{
					title: "Humanity Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["the_blood", "humanity", "pseudocheckbox", "square", "count"]
				},
				{
					title: "Modifier",
					showTitle: true,
					inputs: ["number"],
					addTo: "total_pool",
					defaultValue: ["0"]
				},
				{
					title: "Difficulty",
					showTitle: true,
					inputs: ["number"],
					difficulty: true,
					defaultValue: ["1"]
				},
				{
					title: "Total Pool",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					isPool: true,
					defaultValue: ["0"]
				}
			]
		},
		compulsion: {
			title: "Compulsion",
			testFunction: Compulsion,
			probabilityFunction: CompulsionProbabilities,
			children: [
				{
					title: "Dice",
					showTitle: true,
					isReadOnly: true,
					inputs: ["number"],
					defaultValue: ["1"],
					isPool: true
				},
				{
					title: "empty",
					isReadOnly: true,
					inputs: []
				}
			]
		}
	}
};
