import { Checkbox, Dot, PreCheckbox, PseudoCheckbox, Text, Textarea } from "./_generic";

class V5ModernChronicle {
	[key: string]: {
		[key: string]: boolean | string | string[] | any[];
	};

	_primary = {
		uuid: "",
		updatedAt: "",
		createdAt: "",
		ruleset: "" // TODO: Remove
	};

	_rules = {
		ruleset: "", // TODO: v5Modern
		experience: "", // TODO: Freeform, V5 Costs
		chargen: "" // TODO: Freeform, V5 Points
	};

	basics = {
		name: "",
		storyteller: ""
	};

	discord = {
		enabled: false,
		server: "",
		channel: ""
	};
}

class V5ModernCharacter {
	[key: string]: {
		[key: string]: {
			[key: string]: Text | Dot | Checkbox | PreCheckbox | PseudoCheckbox | Textarea;
		};
	};

	_primary = {
		uuid: { text: new Text() },
		chronicleUUID: { text: new Text() },
		updatedAt: { text: new Text() },
		createdAt: { text: new Text() },
		ruleset: { text: new Text() }, // TODO: Remove
		editable: { text: new Text() } // TODO: Remove
	};

	_rules = {
		ruleset: { text: new Text() }, // TODO: v5Modern
		experience: { text: new Text() }, // TODO: Freeform, V5 Costs
		chargen: { text: new Text() } // TODO: Freeform, V5 Points
	};

	basics = {
		name: { text: new Text() },
		clan: { text: new Text() },
		sect: { text: new Text() },
		player: { text: new Text() },
		predatorType: { text: new Text() },
		ranktitle: { text: new Text() },
		chronicle: { text: new Text() },
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
		animalKen: { dot: new Dot(5), text: new Text() },
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
		animalism1: { text: new Text() },
		animalism2: { text: new Text() },
		animalism3: { text: new Text() },
		animalism4: { text: new Text() },
		animalism5: { text: new Text() },

		auspex: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		auspex1: { text: new Text() },
		auspex2: { text: new Text() },
		auspex3: { text: new Text() },
		auspex4: { text: new Text() },
		auspex5: { text: new Text() },

		bloodSorcery: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		bloodSorcery1: { text: new Text() },
		bloodSorcery2: { text: new Text() },
		bloodSorcery3: { text: new Text() },
		bloodSorcery4: { text: new Text() },
		bloodSorcery5: { text: new Text() },

		celerity: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		celerity1: { text: new Text() },
		celerity2: { text: new Text() },
		celerity3: { text: new Text() },
		celerity4: { text: new Text() },
		celerity5: { text: new Text() },

		dominate: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		dominate1: { text: new Text() },
		dominate2: { text: new Text() },
		dominate3: { text: new Text() },
		dominate4: { text: new Text() },
		dominate5: { text: new Text() },

		fortitude: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		fortitude1: { text: new Text() },
		fortitude2: { text: new Text() },
		fortitude3: { text: new Text() },
		fortitude4: { text: new Text() },
		fortitude5: { text: new Text() },

		obfuscate: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		obfuscate1: { text: new Text() },
		obfuscate2: { text: new Text() },
		obfuscate3: { text: new Text() },
		obfuscate4: { text: new Text() },
		obfuscate5: { text: new Text() },

		oblivion: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		oblivion1: { text: new Text() },
		oblivion2: { text: new Text() },
		oblivion3: { text: new Text() },
		oblivion4: { text: new Text() },
		oblivion5: { text: new Text() },

		potence: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		potence1: { text: new Text() },
		potence2: { text: new Text() },
		potence3: { text: new Text() },
		potence4: { text: new Text() },
		potence5: { text: new Text() },

		presence: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		presence1: { text: new Text() },
		presence2: { text: new Text() },
		presence3: { text: new Text() },
		presence4: { text: new Text() },
		presence5: { text: new Text() },

		protean: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		protean1: { text: new Text() },
		protean2: { text: new Text() },
		protean3: { text: new Text() },
		protean4: { text: new Text() },
		protean5: { text: new Text() },

		thinbloodAlchemy: { precheckbox: new PreCheckbox(), dot: new Dot(5) },
		thinbloodAlchemy1: { text: new Text() },
		thinbloodAlchemy2: { text: new Text() },
		thinbloodAlchemy3: { text: new Text() },
		thinbloodAlchemy4: { text: new Text() },
		thinbloodAlchemy5: { text: new Text() },

		custom0: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom01: { text: new Text() },
		custom02: { text: new Text() },
		custom03: { text: new Text() },
		custom04: { text: new Text() },
		custom05: { text: new Text() },

		custom1: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom11: { text: new Text() },
		custom12: { text: new Text() },
		custom13: { text: new Text() },
		custom14: { text: new Text() },
		custom15: { text: new Text() },

		custom2: { precheckbox: new PreCheckbox(), text: new Text(), dot: new Dot(5) },
		custom21: { text: new Text() },
		custom22: { text: new Text() },
		custom23: { text: new Text() },
		custom24: { text: new Text() },
		custom25: { text: new Text() }
	};

	theBlood = {
		health: { dot: new Dot(15), pseudocheckbox: new PseudoCheckbox(15, ["empty", "slash", "cross"], "v5Modern") },
		willpower: { dot: new Dot(15), pseudocheckbox: new PseudoCheckbox(15, ["empty", "slash", "cross"], "v5Modern") },
		hunger: { checkbox: new Checkbox(5) },
		resonance: { text: new Text(), checkbox: new Checkbox(3) },
		humanity: { pseudocheckbox: new PseudoCheckbox(10, ["empty", "slash", "square"], "v5Modern") },
		bloodPotency: { dot: new Dot(10) },
		generation: { text: new Text() },

		total: { textarea: new Text() },
		spent: { textarea: new Text() },
		current: { textarea: new Text() },
		notes: { textarea: new Textarea() },

		rouseCheck: { text: new Text() },
		bloodSurge: { text: new Text() },
		mendAmount: { text: new Text() },
		powerBonus: { text: new Text() },
		baneSeverity: { text: new Text() },
		feedingPenalty: { textarea: new Textarea() }
	};

	advantages = {
		advantages0: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages1: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages2: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages3: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages4: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages5: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages6: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages7: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		advantages8: { text: new Text(), dot: new Dot(5), textarea: new Textarea() }
	};

	clan = {
		bane: { textarea: new Textarea() },
		compulsion: { textarea: new Textarea() },
		notes: { textarea: new Textarea() }
	};

	profile = {
		mortalDays: { textarea: new Textarea() },
		description: { textarea: new Textarea() },
		kindredNights: { textarea: new Textarea() },
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
		haven0: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		haven1: { text: new Text(), dot: new Dot(5), textarea: new Textarea() },
		haven2: { text: new Text(), dot: new Dot(5), textarea: new Textarea() }
	};

	equipment = {
		weapon0: { text: new Text(), dot: new Dot(5) },
		weapon1: { text: new Text(), dot: new Dot(5) },
		weapon2: { text: new Text(), dot: new Dot(5) },
		weapon3: { text: new Text(), dot: new Dot(5) },
		weapon4: { text: new Text(), dot: new Dot(5) },
		armor0: { text: new Text(), dot: new Dot(6) },
		armor1: { text: new Text(), dot: new Dot(6) },
		armor2: { text: new Text(), dot: new Dot(6) },
		armor3: { text: new Text(), dot: new Dot(6) },
		armor4: { text: new Text(), dot: new Dot(6) },
		other0: { text: new Text() },
		other1: { text: new Text() },
		other2: { text: new Text() },
		other3: { text: new Text() },
		other4: { text: new Text() },
	};
}

const V5ModernRules: aut.ruleset.Basics = {
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

const V5ModernCharacterSheet: aut.ruleset.SheetLayout = [
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
				{ title: "Health", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "Health", align: "center", isReadOnly: true, inputs: ["dot"], dot: { amount: 15 } },
				{ title: "Health", align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 15, possibleValues: ["empty", "slash", "cross"] } },

				{ title: "empty0", inputs: [] },

				{ title: "Willpower", showTitle: true, boldTitle: true, isRollable: true, align: "center", inputs: [] },
				{ title: "Willpower", align: "center", isReadOnly: true, inputs: ["dot"], dot: { amount: 15 } },
				{ title: "Willpower", align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 15, possibleValues: ["empty", "slash", "cross"] } },

				{ title: "empty1", inputs: [] },

				{ title: "Humanity", showTitle: true, isRollable: true, align: "center", inputs: ["pseudocheckbox"], pseudocheckbox: { amount: 10, possibleValues: ["empty", "slash", "square"] } },
				{ title: "Hunger", showTitle: true, inputs: ["checkbox"], checkbox: { amount: 5 } },
				{ title: "Resonance", showTitle: true, inputs: ["text", "checkbox"], checkbox: { amount: 3 } },
			],
			[
				{ title: "Blood Potency", showTitle: true, inputs: ["dot"], dot: { amount: 10 } },
				{ title: "Generation", showTitle: true, inputs: ["text"] },

				{ title: "empty3", inputs: [] },

				{ title: "Experience", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "Total", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Spent", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Current", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Notes", showTitle: true, inputs: ["textarea"], textarea: { amount: 3 } }
			],
			[
				{ title: "Rouse Check", showTitle: true, isReadOnly: true, isRollable: true, inputs: ["text"] },
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
				{ title: "Compulsion", showTitle: true, isRollable: true, inputs: ["textarea"], textarea: { amount: 5 } }
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
		bloodSurge: 1, mendAmount: 1, powerBonus: 0, rouseCheck: 0, baneSeverity: 0,
		feedingPenalty: "No effect"
	},
	{ // 1
		bloodSurge: 2, mendAmount: 1, powerBonus: 0, rouseCheck: 1, baneSeverity: 2,
		feedingPenalty: "No effect"
	},
	{ // 2
		bloodSurge: 2, mendAmount: 2, powerBonus: 1, rouseCheck: 1, baneSeverity: 2,
		feedingPenalty: "Animal and bagged blood slakes half Hunger."
	},
	{ // 3
		bloodSurge: 3, mendAmount: 2, powerBonus: 1, rouseCheck: 2, baneSeverity: 3,
		feedingPenalty: "Animal and bagged blood slakes no Hunger."
	},
	{ // 4
		bloodSurge: 3, mendAmount: 3, powerBonus: 2, rouseCheck: 2, baneSeverity: 3,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 1 less Hunger per human."
	},
	{ // 5
		bloodSurge: 4, mendAmount: 3, powerBonus: 2, rouseCheck: 3, baneSeverity: 4,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 1 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 6
		bloodSurge: 4, mendAmount: 3, powerBonus: 3, rouseCheck: 3, baneSeverity: 4,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 7
		bloodSurge: 5, mendAmount: 3, powerBonus: 3, rouseCheck: 4, baneSeverity: 5,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 2."
	},
	{ // 8
		bloodSurge: 5, mendAmount: 4, powerBonus: 4, rouseCheck: 4, baneSeverity: 5,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
	{ // 9
		bloodSurge: 6, mendAmount: 4, powerBonus: 4, rouseCheck: 5, baneSeverity: 6,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 2 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
	{ // 10
		bloodSurge: 6, mendAmount: 5, powerBonus: 5, rouseCheck: 5, baneSeverity: 6,
		feedingPenalty: "Animal and bagged blood slakes no Hunger. Slake 3 less Hunger per human. Must drain and kill a human to reduce Hunger below 3."
	},
];

export const V5Modern: aut.ruleset.Ruleset<typeof V5ModernChronicle, typeof V5ModernCharacter> = {
	chronicle: V5ModernChronicle,
	character: V5ModernCharacter,
	basics: V5ModernRules,
	characterSheet: V5ModernCharacterSheet,
	misc: {
		bloodPotency: V5BloodPotency
	}
};
