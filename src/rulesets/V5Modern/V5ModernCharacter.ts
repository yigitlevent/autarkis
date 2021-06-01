export const V5ModernCharacterSheet: aut.sheet.Sheet = [
	{
		title: "_primary",
		showTitle: false,
		display: false,
		columns: [
			[
				{ title: "uuid", showTitle: true, inputs: ["text"] },
				{ title: "user_uuid", showTitle: true, inputs: ["text"] },
				{ title: "chronicle_uuid", showTitle: true, inputs: ["text"] }
			],
			[
				{ title: "experience", showTitle: true, inputs: ["text"] },
				{ title: "generated", showTitle: true, inputs: ["text"] },
				{ title: "ruleset", showTitle: true, inputs: ["text"] }
			],
			[
				{ title: "editable", showTitle: true, inputs: ["postcheckbox"] },
				{ title: "created_at", showTitle: true, inputs: ["text"] },
				{ title: "updated_at", showTitle: true, inputs: ["text"] }
			]
		]
	},
	{
		title: "Basics",
		showTitle: false,
		columns: [
			[
				{ title: "Name", showTitle: true, inputs: ["text"] },
				{ title: "Clan", showTitle: true, inputs: ["select"], select: { categories: ["Clans"], search: true, placeholder: "Select Clan" } },
				{ title: "Sect", showTitle: true, inputs: ["text"] },
			],
			[
				{ title: "User", showTitle: true, isReadOnly: true, inputs: ["text"] },
				{ title: "Predator Type", showTitle: true, inputs: ["select"], select: { categories: ["Predator Types"], search: true, placeholder: "Select Predator type" } },
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
				{ title: "Athletics", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Brawl", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Craft", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Drive", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Firearms", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Larceny", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Melee", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Stealth", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Survival", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
			],
			[
				{ title: "Animal Ken", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Etiquette", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Insight", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Intimidation", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Leadership", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Performance", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Persuasion", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Streetwise", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Subterfuge", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
			],
			[
				{ title: "Academics", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Awareness", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Finance", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Investigation", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Medicine", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Occult", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Politics", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Science", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
				{ title: "Technology", showTitle: true, inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: [], multi: true, create: true } },
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
				{ title: "Generation", showTitle: true, inputs: ["select"], select: { categories: ["Generations"], placeholder: "Select Generation" } },

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
				{ title: "Discipline 0", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 0 1", inputs: ["text"] },
				{ title: "Discipline 0 2", inputs: ["text"] },
				{ title: "Discipline 0 3", inputs: ["text"] },
				{ title: "Discipline 0 4", inputs: ["text"] },
				{ title: "Discipline 0 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Discipline 1", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 1 1", inputs: ["text"] },
				{ title: "Discipline 1 2", inputs: ["text"] },
				{ title: "Discipline 1 3", inputs: ["text"] },
				{ title: "Discipline 1 4", inputs: ["text"] },
				{ title: "Discipline 1 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Discipline 2", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 2 1", inputs: ["text"] },
				{ title: "Discipline 2 2", inputs: ["text"] },
				{ title: "Discipline 2 3", inputs: ["text"] },
				{ title: "Discipline 2 4", inputs: ["text"] },
				{ title: "Discipline 2 5", inputs: ["text"] },
			],
			[
				{ title: "Discipline 3", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 3 1", inputs: ["text"] },
				{ title: "Discipline 3 2", inputs: ["text"] },
				{ title: "Discipline 3 3", inputs: ["text"] },
				{ title: "Discipline 3 4", inputs: ["text"] },
				{ title: "Discipline 3 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Discipline 4", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 4 1", inputs: ["text"] },
				{ title: "Discipline 4 2", inputs: ["text"] },
				{ title: "Discipline 4 3", inputs: ["text"] },
				{ title: "Discipline 4 4", inputs: ["text"] },
				{ title: "Discipline 4 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Discipline 5", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 5 1", inputs: ["text"] },
				{ title: "Discipline 5 2", inputs: ["text"] },
				{ title: "Discipline 5 3", inputs: ["text"] },
				{ title: "Discipline 5 4", inputs: ["text"] },
				{ title: "Discipline 5 5", inputs: ["text"] },
			],
			[
				{ title: "Discipline 6", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 6 1", inputs: ["text"] },
				{ title: "Discipline 6 2", inputs: ["text"] },
				{ title: "Discipline 6 3", inputs: ["text"] },
				{ title: "Discipline 6 4", inputs: ["text"] },
				{ title: "Discipline 6 5", inputs: ["text"] },

				{ title: "empty0", inputs: [] },

				{ title: "Discipline 7", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 7 1", inputs: ["text"] },
				{ title: "Discipline 7 2", inputs: ["text"] },
				{ title: "Discipline 7 3", inputs: ["text"] },
				{ title: "Discipline 7 4", inputs: ["text"] },
				{ title: "Discipline 7 5", inputs: ["text"] },

				{ title: "empty1", inputs: [] },

				{ title: "Discipline 8", inputs: ["select", "dot"], dot: { amount: 5 }, select: { categories: ["Disciplines"], search: true } },
				{ title: "Discipline 8 1", inputs: ["text"] },
				{ title: "Discipline 8 2", inputs: ["text"] },
				{ title: "Discipline 8 3", inputs: ["text"] },
				{ title: "Discipline 8 4", inputs: ["text"] },
				{ title: "Discipline 8 5", inputs: ["text"] },
			]
		]
	},
	{
		title: "Advantages",
		showTitle: true,
		columns: [
			[
				{ title: "Advantages 0", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 1", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 2", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
			],
			[
				{ title: "Advantages 3", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 4", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 5", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
			],
			[
				{ title: "Advantages 6", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 7", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
				{ title: "Advantages 8", inputs: ["select", "dot", "textarea"], dot: { amount: 5 }, textarea: { amount: 5 }, select: { categories: ["Advantages"], search: true } },
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
				{ title: "Tenets", showTitle: true, inputs: ["textarea"], textarea: { amount: 6 } }
			],
			[
				{ title: "Convictions", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "convictions 0", inputs: ["text"] },
				{ title: "convictions 1", inputs: ["text"] },
				{ title: "convictions 2", inputs: ["text"] },
				{ title: "convictions 3", inputs: ["text"] },
				{ title: "convictions 4", inputs: ["text"] },
			],
			[
				{ title: "Touchstones", showTitle: true, boldTitle: true, align: "center", inputs: [] },
				{ title: "touchstones 0", inputs: ["text"] },
				{ title: "touchstones 1", inputs: ["text"] },
				{ title: "touchstones 2", inputs: ["text"] },
				{ title: "touchstones 3", inputs: ["text"] },
				{ title: "touchstones 4", inputs: ["text"] },
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
