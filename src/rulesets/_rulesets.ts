import { V5Modern } from "./V5Modern";

class RulesetsManager {
	private list: { [key: string]: typeof V5Modern; } = {
		v5_modern: V5Modern
	};

	getRuleset(rulesetName: aut.ruleset.Names): (typeof V5Modern) {
		return this.list[rulesetName];
	}

	getRulesetNames(): string[] {
		return Object.keys(this.list);
	}
}

export const Rulesets = new RulesetsManager();
