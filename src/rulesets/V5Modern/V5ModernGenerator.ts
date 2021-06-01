import { CapitalizeFirstLetter, CleanString } from "../../function/utility";

import { V5ModernCharacterAdvantages, V5ModernCharacterAdvantagesFlat, V5ModernClans, V5ModernPredatorTypes } from "./V5ModernMisc";

export const V5ModernGenerator: aut.ruleset.GeneratorConditions = [
	{
		text: "Choose your Generation",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			return [
				characterData.the_blood.generation.select.current.length === 1,
				"Generation select is located under 'The Blood'."
			];
		}
	},
	{
		text: "Choose your Clan",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			return [
				characterData.basics.clan.select.current.length === 1,
				"Clan select is located at the top of the sheet."
			];
		}
	},
	{
		text: "Choose your Predator type",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			const clan = characterData.basics.clan.select.current;
			const generation = characterData.the_blood.generation.select.current;
			const predatorTypeName = characterData.basics.predator_type.select.current?.[0];

			if ((clan.length === 1 && clan[0].value === "thin_blooded") || (generation.length === 1 && generation[0].value.search("childe") > -1)) {
				if (predatorTypeName) { return [true, ""]; }
				else { return [false, "Thin-Blooded and/or Childe characters cannot chose a Predator type."]; }
			}

			return [
				(predatorTypeName !== undefined),
				"Predator type select is located near the Clan."
			];
		}
	},
	{
		text: "Choose your Attributes",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			const attributeDots = [0, 1, 4, 3, 1, 0];

			for (const keys in characterData.attributes) {
				const idx = characterData.attributes[keys].dot.current;
				attributeDots[idx] = attributeDots[idx] - 1;
			}

			if (attributeDots.every(v => v === 0)) { return [true, ""]; }

			return [false, "1×4-dots, 3×3-dots, 4×2-dots, 1×1-dot"];
		}
	},
	{
		text: "Choose your Skills",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			const skillJackDots = [0, 10, 8, 1, 0, 0];
			const skillBalancedDots = [0, 7, 5, 3, 0, 0];
			const skillSpecialistDots = [0, 3, 3, 3, 1, 0];

			for (const keys in characterData.skills) {
				const idx = characterData.skills[keys].dot.current;
				if (idx === 0) continue;

				skillJackDots[idx] = skillJackDots[idx] - 1;
				skillBalancedDots[idx] = skillBalancedDots[idx] - 1;
				skillSpecialistDots[idx] = skillSpecialistDots[idx] - 1;
			}

			if (skillJackDots.every(v => v === 0) || skillBalancedDots.every(v => v === 0) || skillSpecialistDots.every(v => v === 0)) {
				return [true, ""];
			}

			return [
				false,
				`Get your skills in one of these distributions:
				Jack-of-all-trades: 1x3-dot, 8×2-dot, 10×1-dot
				Balanced: 3×3-dot, 5×2-dot, 7×1-dot
				Specialist: 1×4-dot, 3×3-dot, 3×2-dot, 3×1-dot`
			];
		}
	},
	{
		text: "Add Free Specialities",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			// 1) We create a list of skills with specialities and their dots
			const charSkills = characterData.skills;
			const characterSkills: { [key: string]: { dots: number; specialities: rbs.Option[]; }; } = {};

			for (const key in charSkills) {
				const select = charSkills[key].select.current;
				const dot = charSkills[key].dot.current;

				if (select.length > 0 || dot > 0) { characterSkills[key] = { dots: dot, specialities: select }; }
			}

			// 2) We check if ONE of the listed specialities listed on predator type has been added
			const predatorTypeName = characterData.basics.predator_type.select.current?.[0];
			const hasPredatorType = (predatorTypeName);

			let hasPredatorSpeciality = false;

			if (hasPredatorType) {
				const predatorTypeSpecialities = V5ModernPredatorTypes[predatorTypeName.value].speciality.map(v => v.split(": "));

				for (const key in predatorTypeSpecialities) {
					const speciality = predatorTypeSpecialities[key];
					const skill = characterSkills?.[CleanString(speciality[0])];

					if (skill) {
						const hasSpeciality = skill.specialities.map(v => v.value).includes(CleanString(speciality[1]));
						if (hasSpeciality) {
							hasPredatorSpeciality = true;
							break;
						}
					}
					else console.log(`cannot find skill "${CleanString(speciality[0])}"`);
				}

				if (hasPredatorSpeciality) return [false, "Add one speciality from your Predator type."];
			}

			// 3) Now we check how many of Academics/Crafts/Performance/Science skills have 1-dot
			const freeSkills = ["academics", "crafts", "performance", "science"];
			let freeSkillsAmount = 0;
			for (const index in freeSkills) {
				if (freeSkills[index] in characterSkills) {
					if (characterSkills[freeSkills[index]].specialities.length === 0) {
						return [false, `Add one free speciality to ${CapitalizeFirstLetter(freeSkills[index])} skill.`];
					}
					else freeSkillsAmount++;

				}
			}

			// 4) We check if all skills with specialities have at least one dot
			const dotlessSpecialities = Object.values(characterSkills).filter(x => (x.specialities.length > 0 && x.dots === 0));
			if (dotlessSpecialities.length > 0) return [false, "Characters cannot have specialities on the skills that have no dots."];

			// 5) Now we check the how many additional specialities the character has
			const additionalSpecialityCount =
				Object.values(characterSkills).reduce((n, x) => n + (x.specialities.length), 0) // total number of specialities
				- ((hasPredatorType && hasPredatorSpeciality) ? 1 : 0) // predator speciality?
				- freeSkillsAmount; // academics/etc specialities

			if (additionalSpecialityCount === 1) return [true, ""];

			return [
				false,
				`Add one speciality each to Academics, Craft, Performance and Science if they have at least one dot. 
				Then add an additional free Speciality to any skill with at least one dot.`
			];
		}
	},
	{
		text: "Add Advantages",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			const charAdvantages = characterData.advantages;

			// 1) We create an object that keeps the advantages the character has
			const selectedAdvantages: { [key: string]: { dots: number; category: string; type: "merit" | "flaw"; }; } = {};
			for (const key in charAdvantages) {
				if (charAdvantages[key].select.current.length === 1 && charAdvantages[key].select.current.length > 0) {
					const advName = charAdvantages[key].select.current[0].value;
					const advDots = charAdvantages[key].dot.current;
					const adv = V5ModernCharacterAdvantagesFlat[key];
					selectedAdvantages[advName] = { dots: advDots, type: adv.type, category: (adv.category) ? adv.category : "" };
				}
			}

			// 2) We check for the Predator type, if the character has one
			const predatorTypeName = characterData.basics.predator_type.select.current?.[0];
			let totalPredatorMeritDots = 0;
			let totalPredatorFlawDots = 0;

			const checkList = (predatorTypeAdvantageList: aut.ruleset.PredatorTypeAdvantageEntry[], breakAfterFirst: boolean): void => {
				for (const key in predatorTypeAdvantageList) {
					const predatorTypeAdvantage = predatorTypeAdvantageList[key];
					const name = CleanString(predatorTypeAdvantage.name[1]);
					const costList = V5ModernCharacterAdvantages[CleanString(predatorTypeAdvantage.name[0])][name].cost;

					if (name in selectedAdvantages) {
						let valueToAdd = 0;

						if (predatorTypeAdvantage.dots && selectedAdvantages[name].dots >= predatorTypeAdvantage.dots) valueToAdd = predatorTypeAdvantage.dots;
						else if (costList.length === 1 && costList[0] === selectedAdvantages[name].dots) valueToAdd = costList[0];
						else if (costList.includes(selectedAdvantages[name].dots)) valueToAdd = selectedAdvantages[name].dots;

						if (selectedAdvantages[name].type === "flaw") {
							totalPredatorFlawDots += valueToAdd;
							if (breakAfterFirst) break;
						}
						else if (selectedAdvantages[name].type === "merit") {
							totalPredatorMeritDots += valueToAdd;
							if (breakAfterFirst) break;
						}
					}
				}
			};

			if (predatorTypeName) {
				const predatorTypeAdvantages = V5ModernPredatorTypes[predatorTypeName.value].advantages;

				const ptAndAdv = predatorTypeAdvantages.filter(x => x.type === "AND");
				for (const key in ptAndAdv) {
					const predatorTypeAdvantageList = ptAndAdv[key].list;

					const hasAll = predatorTypeAdvantageList.every(entry => Object.keys(selectedAdvantages).includes(CleanString(entry.name[1])));
					if (!hasAll) {
						return [
							false,
							`You must add all of the required Advantages listed on your Predator type. 
							List: ${predatorTypeAdvantageList.join(", ")}`
						];
					}

					checkList(predatorTypeAdvantageList, false);
				}

				const ptOrAdv = predatorTypeAdvantages.filter(x => x.type === "OR");
				for (const key in ptOrAdv) {
					const predatorTypeAdvantageList = ptOrAdv[key].list;

					const hasAny = predatorTypeAdvantageList.some(entry => Object.keys(selectedAdvantages).includes(CleanString(entry.name[1])));
					if (!hasAny) {
						return [
							false,
							`You must add at least one of the optional Advantages listed on your Predator type. 
							List: ${predatorTypeAdvantageList.join(", ")}`
						];
					}

					checkList(predatorTypeAdvantageList, true);
				}

				const ptSplitAdv = predatorTypeAdvantages.filter(x => x.type === "SPLIT");
				for (const key in ptSplitAdv) {
					const predatorTypeAdvantageList = ptSplitAdv[key].list;

					const hasAny = predatorTypeAdvantageList.some(entry => Object.keys(selectedAdvantages).includes(CleanString(entry.name[1])));
					if (!hasAny) {
						return [
							false,
							`You must add at least one of the optional Advantages listed on your Predator type. 
							List: ${predatorTypeAdvantageList.join(", ")}`
						];
					}

					const totalSplitAmount = ptSplitAdv[key].amount;
					let remainingSplitAmount = ptSplitAdv[key].amount;

					if (totalSplitAmount && remainingSplitAmount) {
						for (const listKey in predatorTypeAdvantageList) {
							const name = CleanString(predatorTypeAdvantageList[listKey].name[1]);

							if (name in selectedAdvantages) {
								if (selectedAdvantages[name].dots < remainingSplitAmount) remainingSplitAmount -= selectedAdvantages[name].dots;
								else remainingSplitAmount = 0;

								if (selectedAdvantages[name].type === "flaw") totalPredatorFlawDots += selectedAdvantages[name].dots;
								else if (selectedAdvantages[name].type === "merit") totalPredatorMeritDots += selectedAdvantages[name].dots;
							}
						}

						if (remainingSplitAmount !== 0) {
							return [
								false,
								`You have to spend the dots that are given by your Predator type to split between ${predatorTypeAdvantageList.join(", ")}.`
							];
						}
					}
				}
			}

			// 3) Now we check if character has the right amount of additional Advantage dots
			const additionalMeritDots = Object.values(selectedAdvantages).reduce((n, x) => n + ((x.type === "merit") ? x.dots : 0), 0) - totalPredatorMeritDots;
			const additionalFlawDots = Object.values(selectedAdvantages).reduce((n, x) => n + ((x.type === "flaw") ? x.dots : 0), 0) - totalPredatorFlawDots;

			const clan = characterData.basics.clan.select.current?.[0];
			const isAncillae = characterData.the_blood.generation?.select.current[0]?.value.search("ancillae") > -1;

			if (clan) {
				if (additionalMeritDots === additionalFlawDots
					&& additionalMeritDots > 0 && additionalFlawDots > 0
					&& additionalMeritDots < 4 && additionalFlawDots < 4) {
					return [true, ""];
				}

				return [false, "Thin-Blood characters must get equal amounts of Flaws and Merits, and they must get 1-3 from each."];
			}
			else {
				if (additionalMeritDots === ((isAncillae) ? 9 : 7) && additionalFlawDots === ((isAncillae) ? 4 : 2)) { return [true, ""]; }
			}

			return [false, "Characters must start with some Advantages."];
		}
	},
	{
		text: "Add Disciplines",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			const charDisciplines = characterData.disciplines;
			const charClan = characterData.basics.clan.select.current?.[0];
			const predatorTypeName = characterData.basics.predator_type.select.current?.[0];
			const hasPredator = (predatorTypeName);

			if (!charClan) return [false, "Select clan before selecting Disciplines."];

			// 1) We create an object that keeps the advantages the character has
			const selectedDisciplines: { name: string; dots: number; isPredator: boolean; isClan: boolean; }[] = [];
			const totalDots = selectedDisciplines.reduce((n, x) => n + x.dots, 0);

			for (const key in charDisciplines) {
				const disp = Object.values(charDisciplines).find(x => x.select)?.select.current;

				if (disp && disp.length > 0) {
					const dispName = disp[0].value;
					const cleanName = CleanString(dispName);
					const dispDots = charDisciplines[key].dot.current;

					selectedDisciplines.push({
						name: cleanName,
						dots: dispDots,
						isPredator: (hasPredator) ? V5ModernPredatorTypes[predatorTypeName.value].disciplines.includes(dispName) : false,
						isClan: V5ModernClans[key].disciplines.includes(dispName)
					});
				}
			}

			if (charClan.value !== "thin_blooded") {
				if (hasPredator && (totalDots !== 4 || (selectedDisciplines.length !== 2 && selectedDisciplines.length !== 3))) {
					return [false, "Character must have 2 or 3 Disciplines, one 2-dot and one 1-dot Discipline, and get one dot from one of your Pretador type Disciplines."];
				}
				if (!hasPredator && (totalDots !== 3 || selectedDisciplines.length !== 2)) {
					return [false, "Character must have 2 Disciplines, one 2-dot and one 1-dot."];
				}
			}

			if (charClan.value === "thin_blooded") {
				const charAdvantages = characterData.advantages;

				const selectedAdvantages: { [key: string]: number; } = {};
				for (const key in charAdvantages) {
					if (charAdvantages[key].select.current.length === 1 && charAdvantages[key].select.current[0]) {
						const advName = charAdvantages[key].select.current[0].value;
						const advDots = charAdvantages[key].dot.current;
						selectedAdvantages[advName] = advDots;
					}
				}

				const hasAlchemy = ("thin_blood_alchemist" in selectedAdvantages)
					&& selectedDisciplines.findIndex((x) => (x.name === "thin_blood_alchemy" && x.dots === 1));

				const hasDiscipline = ("discipline_affinity" in selectedAdvantages)
					&& selectedDisciplines.findIndex((x) => (x.name !== "thin_blood_alchemy" && x.dots === 1));

				if (selectedDisciplines.length === 2 && hasAlchemy && hasDiscipline) return [true, ""];
				else if (selectedDisciplines.length === 1 && hasAlchemy === !hasDiscipline) return [true, ""];
				else if (selectedDisciplines.length === 0 && !hasAlchemy && !hasDiscipline) return [true, ""];

				return [false, "Thin-Blooded Characters cannot start with Disciplines."];
			}
			else if (charClan.value === "caitiff") {
				if (!hasPredator && totalDots === 3 && selectedDisciplines.length === 2) return [true, ""];
				else if (hasPredator && totalDots === 4) {
					const predatorDisp = selectedDisciplines.findIndex((x) => (x.isPredator && x.dots === 1));

					if (selectedDisciplines.length === 2 && predatorDisp === -1) return [true, ""];
					else if (selectedDisciplines.length === 3 && predatorDisp > -1) return [true, ""];

					return [false, "Character must have 2 or 3 Disciplines, one 2-dot and one 1-dot Discipline, and get one dot from one of your Pretador type Disciplines."];
				}
			}
			else {
				const clanListAmount = selectedDisciplines.reduce((n, x) => n + ((x.isClan) ? 1 : 0), 0);

				if (!hasPredator && totalDots === 3 && selectedDisciplines.length === 2) {
					if (clanListAmount === 2) return [true, ""];

					return [false, "Character must have 2 disciplines, one 2-dot and one 1-dot."];
				}
				else if (hasPredator && totalDots === 4) {
					const clanDisp = selectedDisciplines.findIndex((x) => (x.isClan && x.dots === 2));
					const predatorDisp = selectedDisciplines.findIndex((x) => (x.isPredator && x.dots === 1));

					if (clanListAmount >= 2 && selectedDisciplines.length === 2 && predatorDisp === -1) return [true, ""];
					else if (clanListAmount >= 2 && selectedDisciplines.length === 3 && predatorDisp > -1 && clanDisp > -1) return [true, ""];

					return [false, "Character must have 2 or 3 Disciplines, one 2-dot and one 1-dot Discipline, and get one dot from one of your Pretador type Disciplines."];
				}
			}

			return [false, "Character must have 2 Disciplines, one 2-dot and one 1-dot, plus one dot from Predator type if the character as any."];
		}
	},
	{
		text: "Add Convictions and Touchstones",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			// const charConvictions = characterData;
			// const charTouchstones = characterData;

			// Select one to three Convictions
			// Create an equal number of Touchstones

			return [false, ""];
		}
	},
	{
		text: "Add Name, Ambition, and Desire",
		condition: (characterData: aut.data.GenericData): [boolean, string] => {
			if (characterData.basics.name.text.current === "") return [false, "Character name cannot be empty."];
			if (characterData.basics.ambition.text.current === "") return [false, "Character ambition cannot be empty."];
			if (characterData.basics.desire.text.current === "") return [false, "Character desire cannot be empty."];

			return [true, ""];
		}
	}
];
