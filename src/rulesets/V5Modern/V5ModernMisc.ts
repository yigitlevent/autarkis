export const V5ModernBloodPotency: aut.ruleset.BloodPotency = [
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

export const V5ModernClans: aut.ruleset.Clans = {
	brujah: {
		name: "Brujah",
		disciplines: ["Celerity", "Potence", "Presence"],
		bane: "The Blood of the Brujah simmers with barely contained rage, exploding at the slightest provocation. Subtract dice equal to the Bane Severity of the Brujah from any roll to resist fury frenzy. This cannot take the pool below one die.",
		compulsion: "Rebellion: The vampire takes a stand against whatever or whomever they see as the status quo in the situation, whether that's their leader, a viewpoint expressed by a potential vessel, or just the task they were supposed to do at the moment.Until they've gone against their orders or expectations, perceived or real, the vampire receives a two-dice penalty to all rolls. This Compulsion ends once they've managed to either make someone change their minds (by force if necessary) or done the opposite of what was expected of them."
	},
	gangrel: {
		name: "Gangrel",
		disciplines: ["Animalism", "Fortitude", "Protean"],
		bane: "Gangrel relate to their Beast much as other Kindred relate to the Gangrel: suspicious partnership. In frenzy, Gangrel gain one or more animal features: a physical trait, a smell, or a behavioral tic. These features last for one more night afterward, lingering like a hangover following debauchery. Each feature reduces one Attribute by 1 point – the Storyteller may decide that a forked tongue or bearlike musk reduces Charisma, while batlike ears reduce Resolve ('all those distracting sounds'). If nothing immediately occurs to you, the feature reduces Intelligence or Manipulation. The number of features a Gangrel manifests equals their Bane Severity. If your character Rides the Wave of their frenzy (see Core Rulebook, p. 219) you can choose only one feature to manifest, thus taking only one penalty to their Attributes.",
		compulsion: "Feral Impulses: Returning to an animalistic state, the vampire regresses to a point where speech is hard, clothes are uncomfortable, and arguments are best settled with teeth and claws. For one scene, the vampire gains a three-dice penalty to all rolls involving Manipulation and Intelligence. They can only speak in one-word sentences during this time."
	},
	malkavian: {
		name: "Malkavian",
		disciplines: ["Auspex", "Dominate", "Obfuscate"],
		bane: "Afflicted by their lineage, all Malkavians are cursed with at least one type of mental derangement. Depending on their history and the state of their mind at death, they may experience delusions, visions of terrible clarity, or something entirely different.When the Malkavian suffers a Bestial Failure or a Compulsion, their curse comes to the fore. Suffer a penalty equal to your character's Bane Severity to one category of dice pools (Physical, Social, or Mental) for the entire scene. This is in addition to any penalties incurred by Compulsions.You and the Storyteller decide the type of penalty and the exact nature of the character's affliction during character creation.",
		compulsion: "Delusion: Their extrasensory gifts running wild, the vampire experiences what might be truths or portents, but what others call figments of imagination, dredged up by Hunger.While still functional, the vampire's mind and perceptions are skewed. They receive a two-dice penalty to rolls involving Dexterity, Manipulation, Composure, and Wits as well as on rolls to resist terror frenzy, for one scene."
	},
	nosferatu: {
		name: "Nosferatu",
		disciplines: ["Animalism", "Obfuscate", "Potence"],
		bane: "Hideous and vile, all Nosferatu count as having the Repulsive Flaw (-2) and can never increase their rating in the Looks Merit.  In addition, any attempt to disguise themselves as human incur a penalty to your dice pool equal to your character's Bane Severity (this includes the Obfuscate powers Mask of a Thousand Faces and Impostor's Guise).",
		compulsion: "Cryptophilia: The need to know permeates the vampire. They become consumed with a hunger for secrets, to know that which few or no one knows, almost as strong as that for blood. They also refuse to share secrets with others, except in strict trade for greater ones.All actions not spent working toward learning a secret, no matter how big or small, receive a two-dice penalty. The Compulsion ends when the vampire learns a secret big enough to be considered useful. Sharing this secret is optional."
	},
	toreador: {
		name: "Toreador",
		disciplines: ["Auspex", "Celerity", "Presence"],
		bane: "Toreador exemplify the old saying that art in the blood takes strange forms. They desire beauty so intensely that they suffer in its absence. While your character finds itself in less than beautiful surroundings, lose the equivalent of their Bane Severity in dice from dice pools to use Disciplines. The Storyteller decides specifically how the beauty or ugliness of the Toreador's environment (including clothing, blood dolls, etc.) penalizes them, based on the character's aesthetics. That said, even devotees of the Ashcan School never find normal streets perfectly beautiful. This obsession with aesthetics also causes divas to lose themselves in moments of beauty and a bestial failure often results in a rapt trance, as detailed in the Compulsion rules (Core Rulebook, p. 208).",
		compulsion: "Obsession: Enraptured by beauty, the vampire becomes temporarily obsessed with a singular gorgeous thing, able to think of nothing else. Pick one feature, such as a person, a song, an artwork, blood spatter, or even a sunrise. Enraptured, the vampire can hardly take their attention from it, and if spoken to, they only talk about that subject. Any other actions receive a two-dice penalty. This Compulsion lasts until they can no longer perceive the beloved object, or the scene ends."
	},
	tremere: {
		name: "Tremere",
		disciplines: ["Auspex", "Blood Sorcery", "Dominate"],
		bane: "Once the clan was defined by a rigid hierarchy of Blood Bonds reaching from the top to the bottom of the Pyramid. But after the fall of Vienna, their Blood has recoiled and aborted all such connections. Tremere vitae can no longer Blood Bond other Kindred, though they themselves can be Bound by Kindred from other clans. A Tremere can still bind mortals and ghouls, though the corrupted vitae must be drunk an additional number of times equal to the vampire's Bane Severity for the bond to form. Some theorize this change is the revenge of the Antediluvian devoured by Tremere, others attribute it to a simple mutation. Regardless, the clan studies their vitae intently to discover if the process can be reversed, and, indeed, determine if they would want to do so.",
		compulsion: "Perfectionism: Nothing but the best satisfies the vampire. Anything less than exceptional performance instills a profound sense of failure, and they often repeat tasks obsessively to get them “just right.”Until the vampire scores a critical win on a Skill roll or the scene ends, the vampire labors under a two-dice penalty to all dice pools. Reduce the penalty to one die for a repeated action, and remove it entirely on a second repeat."
	},
	ventrue: {
		name: "Ventrue",
		disciplines: ["Dominate", "Fortitude", "Presence"],
		bane: "The Ventrue are in possession of rarefied palates. When a Ventrue drinks blood from any mortal outside their preference, a profound exertion of will is required or the blood taken surges back up as scarlet vomit. Preferences range greatly, from Ventrue who can only feed from genuine brunettes, individuals of Swiss descent, or homosexuals, to others who can only feed from soldiers, mortals who suffer from PTSD, or methamphetamine users. With a Resolve + Awareness test (Difficulty 4 or more) your character can sense if a mortal possesses the blood they require.If you want your character to feed from anything but their preferred victim, you must spend Willpower points equal to the character's Bane Severit",
		compulsion: "Arrogance: The need to rule rears its head in the vampire. They stop at nothing to assume command of a situation.Someone must obey an order from the vampire. Any action not directly associated with leadership receives a two-dice penalty. This Compulsion lasts until an order has been obeyed, though the order must not be supernaturally enforced, such as through Dominate."
	},
	caitiff: {
		name: "Caitiff",
		disciplines: [],
		bane: "Untouched by the Antediluvians, the Caitiff share no common bane. Caitiff characters begin with the Suspect (•) Flaw and you may not purchase positive Status for them during character creation. The Storyteller may always impose a one or two dice penalty on Social tests against fellow Kindred who know they are Caitiff, regardless of their eventual Status. Further, to improve one of the Disciplines of a Caitiff costs six times the level purchased in experience point.",
		compulsion: ""
	},
	thin_blooded: {
		name: "Thin-Blooded",
		disciplines: ["Thin-Blood Alchemy"],
		bane: "",
		compulsion: ""
	},
	ravnos: {
		name: "Ravnos",
		disciplines: ["Animalism", "Obfuscate", "Presence"],
		bane: "The Ravnos are doomed. The sun's fire that incinerated their founder rages through the Blood of the clan, erupting from their very flesh if they ever settle down for long. If they slumber in the same place more than once in seven nights, roll a number of dice equal to their Bane Severity. They receive aggravated damage equal to the number of 10's (critical results) rolled as they are scorched from within. This happens every time they spend the day in a location they've already slumbered less than a week before. What constitutes a location in this regard depends on the scope of the chronicle, but unless otherwise stated, two resting places need to be at least a mile apart to avoid triggering the Bane. Furthermore, a mobile haven, such as a movers' truck, is safe so long as the place where the truck is parked is at least a mile from the last location. Ravnos characters cannot take the No Haven Flaw at character creation.",
		compulsion: "Tempting Fate: The vampire is driven by their Blood to court danger. Haunted as they are by righteous fire burning its way up their lineage, why not? The next time the vampire is faced with a problem to solve, any attempt at a solution short of the most daring or dangerous incurs a two-dice penalty. (Suitably flashy and risky attempts can even merit bonus dice for this occasion.) The Daredevil is free to convince any fellows to do things their way, but is just as likely to go at it alone. The Compulsion persists until the problem is solved or further attempts become impossible."
	},
	salubri: {
		name: "Salubri",
		disciplines: ["Auspex", "Dominate", "Fortitude"],
		bane: "The Salubri are hunted: Kindred of other clans are especially... appreciative of Salubri vitae. When a non-Salubri partakes of the blood of a Cyclops, they often find it difficult to pull themselves away. Consuming enough to abate at least one Hunger level requires a Hunger Frenzy test (See Vampire: The Masquerade, p. 220) at a Difficulty 2 + the Salubri's Bane Severity (difficulty 3 + the Salubri's Bane Severity for Banu Haqim). If the test fails, they just keep consuming, to the point that they may have to be physically fought off. Additionally, the third eye that Saulot opened while on one of his many journeys passes down through the bloodline every time a Salubri Embraces. This third eye is not always recognizably human in origin, and rumors persist of vertical, serpentine pupils, or even wormlike eyespots. While this third eye can be physically covered, such as with a headscarf or hood, it is always present, and no supernatural power can obscure it. Any time a Salubri activates a Discipline power, the third eye weeps vitae, its intensity correlating to the level of the Discipline being used, from welling up to a torrential flow. The blood flow from the third eye triggers a Hunger Frenzy test from nearby vampires with Hunger 4 or more.",
		compulsion: "Affective Empathy: When a Salubri suffers a Compulsion, the Kindred becomes overwhelmed with empathy for a personal problem that afflicts someone in the scene, seeking to further its resolution. The scale of the personal problem isn't important; the Salubri understands that sometimes suffering is part of a cumulative situation and not an isolated stimulus. Any action not taken toward mitigating that personal tragedy incurs a two-dice penalty. The Compulsion persists until the sufferer's burden is eased or a more immediate crisis supersedes it, or the end of the scene."
	},
	tzimisce: {
		name: "Tzimisce",
		disciplines: ["Animalism", "Dominate", "Protean"],
		bane: "The Tzimisce are grounded: Each Tzimisce must choose a specific charge — a physical domain, a group of people, an organization, or even something more esoteric — but clearly defined and limited. The Kindred must spend their daysleep surrounded by their chosen charge. Historically this has often meant slumbering in the soil of their land, but it can also mean being surrounded by that which they tonight rule: a certain kind of people, a building deeply tied to their obsession, a local counterculture faction, or other, more outlandish elements. If they do not, they sustain aggravated Willpower damage equal to their Bane Severity upon waking the following night.",
		compulsion: "Covetousness: When a Tzimisce suffers a Compulsion, the Kindred becomes obsessed with possessing something in the scene, desiring to add it to their proverbial hoard. This can be anything from an object to a piece of property to an actual person. Any action not taken toward this purpose incurs a two-dice penalty. The Compulsion persists until ownership is established (the Storyteller decides what constitutes ownership in the case of a non-object) or the object of desire becomes unattainable."
	},
	hecata: {
		name: "Hecata",
		disciplines: ["Auspex", "Fortitude", "Oblivion"],
		bane: "Steeped in death, the fangs of the Hecata bring not bliss, but agony. Victims caught unawares will violently resist unless restrained, and few people submit willingly to the torture that is the Hecata Kiss.When drinking directly from a victim, Hecata may only take harmful drinks, resulting in blood loss (Vampire: The Masquerade, p.212). Unwilling mortals not restrained will try to escape, and even those coerced or willing must succeed in a Stamina + Resolve test against Difficulty 2 + Bane Severity in order not to recoil. Coerced or willing vampire victims of the Hecata bite must make a frenzy test against Difficulty 3 to avoid falling into a terror frenzy.",
		compulsion: "Morbidity: The Hecata are possessed of a peculiar curiosity paired with detachment from compassion and empathy, likely due to their frequent dealings with corpses and the wraiths of those who died tragic deaths. Their Blood urges them to study the individuals around them for signs of illness, frailty, or impending death. Until they have either predicted a death without supernatural means or solved the cause of a local one, the vampire suffers a three-dice penalty to other rolls until the scene ends. Note that their conclusions do not need to be absolutely correct, but should stay within the boundaries of the possible. "
	},
	banu_haqim: {
		name: "Banu Haqim",
		disciplines: ["Blood Sorcery", "Celerity", "Obfuscate"],
		bane: "Banu Haqim are drawn to feed from those deserving punishment. This is especially true for vampire Blood, the very essence of transgression. When one of the Judges tastes the Blood of another Cainite, they find it very hard to stop. Slaking at least one Hunger level with vampiric vitae provokes a Hunger Frenzy test (See Core Rules p. 220) at a Difficulty 2 + Bane Severity. If the test is failed they attempt to gorge themselves on vampire Blood, sometimes until they diablerize their Kindred victim. This presents many problems as the Banu Haqim integrate with the Camarilla, who tend to see the Amaranth as anathema.",
		compulsion: "Judgement: The vampire is compelled to punish anyone seen to transgress against their personal creed, taking their blood as just vengeance for the crime. For one scene, the vampire must slake at least one Hunger from anyone, friend or foe,  that acts against a Conviction of theirs. Failing to do so results in a three-dice penalty to all rolls until the Compulsion is satisfied or the scene ends. (If the one fed from is also a vampire, don't forget to test for Bane-induced Hunger frenzy.)"
	},
	lasombra: {
		name: "Lasombra",
		disciplines: ["Dominate", "Oblivion", "Potence"],
		bane: "Anyone seeing the reflection or recording (live and otherwise) of a Lasombra vampire can instantly recognize them for what they are, provided they know what they're looking for. People with no prior knowledge will know something is wrong, but likely attribute the distortion to irregularities in the reflecting surface or recording errors. Note that this will not hide the identity of the vampire with any certainty, and the Lasombra are no less likely to be caught on surveillance than any other vampire. In addition, use of modern communication technology, including making a simple phone call, requires a Technology test at Difficulty 2 + Bane Severity as microphones have similar problems with the voice of a Lasombra as cameras with their image. Avoiding electronic vampire detection systems is also done at a penalty equal to Bane Severity",
		compulsion: "Ruthlessness: To the Lasombra, failure is not an option. Their Blood will urge them to any act conceivable to reach their goals, whether in the moment or in Byzantine plots lasting centuries. Any setback is felt profoundly and they quickly escalate to the most ruthless of methods until they achieve their aims.The next time the vampire fails any action they receive a two-dice penalty to any and all rolls until a future attempt at the same action succeeds. Note that the above penalty applies to future attempts at the triggering action as well."
	},
	the_ministry: {
		name: "The Ministry",
		disciplines: ["Obfuscate", "Presence", "Protean"],
		bane: "The Blood of a Minister abhors the light. When exposed to direct illumination – whether natural or artificial – members of the clan recoil. Ministers receive a penalty equal to their Bane Severity to all dice pools when subjected to bright light directed straight at them. Also, add their Bane Severity to Aggravated damage taken from sunlight. ",
		compulsion: "Transgression: Set teaches that everyone's mind and spirit are bound by invisible chains of their own making. Their Blood chafing at these bindings, the Minister suffers a burning need to break them. The vampire receives a two-dice penalty to all dice pools not relating to enticing someone (including themselves) to break a Chronicle Tenet or personal Conviction, causing at least one Stain and ending this Compulsion. "
	}
};

export const V5ModernDisciplines: aut.ruleset.Disciplines = {
	animalism: {
		name: "Animalism",
		powers: [
			{
				bond_famulus: { name: "Bond Famulus", attribute: "Charisma", cost: "OOO", description: "Bond to an animal to make other Animalism powers more effective" },
				sense_the_beast: { name: "Sense the Beast", attribute: "Resolve", cost: "–", description: "Sense anger, hunger, and Beasts" },
			},
			{
				atavism: { name: "Atavism", attribute: "Composure", cost: "O", description: "Force an animal into fear or rage frenzy" },
				feral_whispers: { name: "Feral Whispers", attribute: "Manipulation, Charisma", cost: "O / –", description: "Speak to and summon animals" },
			},
			{
				animal_succulence: { name: "Animal Succulence", attribute: "–", cost: "–", description: "Feed more effectively on animals" },
				quell_the_beast: { name: "Quell the Beast", attribute: "Charisma", cost: "O", description: "Shut down a target's drives and desires" },
				unliving_hive: { name: "Unliving Hive", attribute: "–", cost: "–", description: "Other Animalism powers affect insects", prerequisite: "Obfuscate 2" },
			},
			{
				subsume_the_spirit: { name: "Subsume the Spirit", attribute: "Manipulation", cost: "O / –", description: "Possess an animal" },
			},
			{
				animal_dominion: { name: "Animal Dominion", attribute: "Charisma", cost: "OO", description: "Control large groups of animals" },
				drawing_out_the_beast: { name: "Drawing Out the Beast", attribute: "Wits", cost: "O", description: "When you would frenzy, make someone else frenzy instead" },
			}
		]
	},
	auspex: {
		name: "Auspex",
		powers: [
			{
				heightened_senses: { name: "Heightened Senses", attribute: "Wits, Resolve", cost: "–", description: "Augment natural senses" },
				sense_the_unseen: { name: "Sense the Unseen", attribute: "Wits, Resolve", cost: "–", description: "Detect supernatural effects" },
			},
			{
				obeah: { name: "Obeah", attribute: "Composure", cost: "O / OW+", description: "Calm mortals and heal willpower", prerequisite: "Fortitude 1" },
				premonition: { name: "Premonition", attribute: "Resolve", cost: "O / –", description: "Receive prophetic visions" },
			},
			{
				eyes_of_beasts: { name: "Eyes of Beasts", attribute: "–", cost: "O", description: "See through the eyes of animals", prerequisite: "Animalism 2" },
				scry_the_soul: { name: "Scry the Soul", attribute: "Intelligence", cost: "O", description: "See the aura of a person's soul" },
				share_the_senses: { name: "Share the Senses", attribute: "Resolve", cost: "O", description: "Borrow another's senses" },
			},
			{
				spirit_s_touch: { name: "Spirit's Touch", attribute: "Intelligence", cost: "O", description: "View impressions of past events" },
			},
			{
				clairvoyance: { name: "Clairvoyance", attribute: "Intelligence", cost: "O", description: "Know everything about an area" },
				possession: { name: "Possession", attribute: "Resolve", cost: "OO", description: "Possess a human", prerequisite: "Dominate 3" },
				telepathy: { name: "Telepathy", attribute: "Resolve", cost: "O / OW", description: "Read minds and project thoughts" },
				unburdening_the_bestial_soul: { name: "Unburdening the Bestial Soul", attribute: "Composure", cost: "OOS", description: "Remove/shield against Stains, make Dominate easier, restore Humanity", prerequisite: "Dominate 3, Obeah" },
			},
		]
	},
	blood_sorcery: {
		name: "Blood Sorcery",
		powers: [
			{
				corrosive_vitae: { name: "Corrosive Vitae", attribute: "–", cost: "O+", description: "Corrode inorganic material" },
				shape_the_sanguine_sacrament: { name: "Shape the Sanguine Sacrament", attribute: "Manipulation", cost: "–", description: "Sculpt blood into any desired shape" },
				a_taste_for_blood: { name: "A Taste for Blood", attribute: "Resolve", cost: "–", description: "Get information from blood" },
			},
			{
				extinguish_vitae: { name: "Extinguish Vitae", attribute: "Intelligence", cost: "O", description: "Make another vampire hungrier" },
			},
			{
				blood_of_potency: { name: "Blood of Potency", attribute: "Resolve", cost: "O", description: "Increase Blood Potency temporarily" },
				scorpion_s_touch: { name: "Scorpion's Touch", attribute: "Strength", cost: "O+", description: "Turn blood into venom" },
			},
			{
				theft_of_vitae: { name: "Theft of Vitae", attribute: "Wits", cost: "O", description: "Steal blood from a distance" },
			},
			{
				baal_s_caress: { name: "Baal's Caress", attribute: "Strength", cost: "O+", description: "Turn blood into stronger venom", prerequisite: "(Scorpion's Touch?)" },
				cauldron_of_blood: { name: "Cauldron of Blood", attribute: "Resolve, Dexterity", cost: "OS", description: "Boil blood inside a target's body" },
			},
		],
		ritual_name: ["Ritual", "Rituals"],
		rituals: [
			{
				blood_walk: { name: "Blood Walk", attribute: "Intelligence", cost: "O", description: "Learn a subject's name, gen, and sire" },
				bloody_message: { name: "Bloody Message", attribute: "Intelligence", cost: "O", description: "Show a message to a type of person" },
				clinging_of_the_insect: { name: "Clinging of the Insect", attribute: "Intelligence", cost: "O", description: "Walk on walls and ceilings" },
				coax_the_garden: { name: "Coax the Garden", attribute: "Intelligence", cost: "O", description: "Awaken plants to hinder enemies", prerequisite: "Bahari" },
				craft_bloodstone: { name: "Craft Bloodstone", attribute: "Intelligence", cost: "O", description: "Create a magical tracking beacon" },
				dampen_the_fear: { name: "Dampen the Fear", attribute: "Intelligence", cost: "O", description: "Suppress natural fear of fire", prerequisite: "Cainite" },
				herd_ward_minor: { name: "Herd Ward (Minor)", attribute: "Intelligence", cost: "O", description: "Ward a person against others' feeding" },
				letter_ward: { name: "Letter Ward", attribute: "Intelligence", cost: "O", description: "Ward a letter so only the intended receipient can read it" },
				wake_with_evening_s_freshness: { name: "Wake with Evening's Freshness", attribute: "Intelligence", cost: "O", description: "Wake up if disturbed during the day" },
				ward_against_ghouls: { name: "Ward against Ghouls", attribute: "Intelligence", cost: "O", description: "Create a ward against ghouls" },
			},
			{
				calling_the_aura_s_remnants: { name: "Calling the Aura's Remnants", attribute: "Intelligence", cost: "O", description: "Interrogate the memories of the dead", prerequisite: "Chicago" },
				communicate_with_kindred_sire: { name: "Communicate with Kindred Sire", attribute: "Intelligence", cost: "O", description: "Speak telepathically to your Sire" },
				eyes_of_babel: { name: "Eyes of Babel", attribute: "Intelligence", cost: "S", description: "Eat someone's eyes and tongue to know all languages they know" },
				illuminate_the_trail_of_prey: { name: "Illuminate the Trail of Prey", attribute: "Intelligence", cost: "O", description: "See a target's path" },
				ishtar_s_touch: { name: "Ishtar's Touch", attribute: "Intelligence", cost: "O", description: "Intoxicate a target to lower inhibitions" },
				truth_of_blood: { name: "Truth of Blood", attribute: "Resolve", cost: "O", description: "Learn whether statements are truthful" },
				unseen_underground: { name: "Unseen Underground", attribute: "Intelligence", cost: "O", description: "Become invisible while underground" },
				ward_against_spirits: { name: "Ward against Spirits", attribute: "Intelligence", cost: "O", description: "Create a ward against intangible things" },
				warding_circle_against_ghouls: { name: "Warding Circle against Ghouls", attribute: "Intelligence", cost: "OOO", description: "Create a warding circle against ghouls" },
				web_of_hunger: { name: "Web of Hunger", attribute: "Intelligence", cost: "O", description: "Steal blood from everyone underground", prerequisite: "Special artifact" },
			},
			{
				bladed_hands: { name: "Bladed Hands", attribute: "Intelligence", cost: "OO", description: "Turn your hands into knives", prerequisite: "Milwaukee" },
				dagon_s_call: { name: "Dagon's Call", attribute: "Resolve", cost: "O - OOO", description: "Rupture blood vessels remotely" },
				deflection_of_the_wooden_doom: { name: "Deflection of the Wooden Doom", attribute: "Intelligence", cost: "O", description: "Prevent one staking attempt" },
				essence_of_air: { name: "Essence of Air", attribute: "Intelligence, Strength", cost: "O", description: "Fly for a limited time" },
				eyes_of_the_past: { name: "Eyes of the Past", attribute: "Intelligence", cost: "O", description: "See a scene from the past", prerequisite: "Chicago" },
				fire_in_the_blood: { name: "Fire in the Blood", attribute: "Intelligence", cost: "O", description: "Torture someone by heating their blood", prerequisite: "Cainite" },
				firewalker: { name: "Firewalker", attribute: "Intelligence", cost: "O", description: "Protect targets against fire" },
				gentle_mind: { name: "Gentle Mind", attribute: "Intelligence", cost: "O", description: "Prevent another vampire from frenzying", prerequisite: "Chicago" },
				haunted_house: { name: "Haunted House", attribute: "Intelligence", cost: "OOO", description: "Make people think a building is haunted", prerequisite: "Milwaukee" },
				herd_ward_major: { name: "Herd Ward (Major)", attribute: "Intelligence", cost: "O", description: "Ward a herd against others' feeding" },
				illusion_of_peaceful_death: { name: "Illusion of Peaceful Death", attribute: "Intelligence", cost: "O", description: "Conceal the cause of death, as long as it's not exsanguination", prerequisite: "Chicago" },
				illusion_of_perfection: { name: "Illusion of Perfection", attribute: "Intelligence", cost: "O", description: "= Mask of 1000 Faces (Obfuscate 3)", prerequisite: "Milwaukee" },
				one_with_the_blade: { name: "One with the Blade", attribute: "Intelligence", cost: "O+", description: "Make a weapon impervious to harm" },
				sanguine_watcher: { name: "Sanguine Watcher", attribute: "Intelligence", cost: "O", description: "Create an animal spy", prerequisite: "Milwaukee" },
				sleep_of_judas: { name: "Sleep of Judas", attribute: "Intelligence", cost: "(Unknown)", description: "Put a vampire into a drugged sleep", prerequisite: "Special" },
				the_unseen_change: { name: "The Unseen Change", attribute: "Intelligence", cost: "O", description: "Lupines entering an area are forced into wolf form", prerequisite: "Chicago" },
				ward_against_lupines: { name: "Ward against Lupines", attribute: "Intelligence", cost: "O", description: "Create a ward against werewolves" },
				warding_circle_against_spirits: { name: "Warding Circle against Spirits", attribute: "Intelligence", cost: "OOO", description: "Create a warding circle against intangible things" },
			},
			{
				defense_of_the_sacred_haven: { name: "Defense of the Sacred Haven", attribute: "Intelligence", cost: "O", description: "Protect an area against sunlight" },
				eyes_of_the_nighthawk: { name: "Eyes of the Nighthawk", attribute: "Intelligence", cost: "O", description: "See through a raptor's eyes" },
				incorporeal_passage: { name: "Incorporeal Passage", attribute: "Intelligence", cost: "O", description: "Become insubstantial" },
				innocence_of_the_child_s_heart: { name: "Innocence of the Child's Heart", attribute: "Intelligence", cost: "O", description: "Conceal diablerie and vampirism from Scry the Soul (Auspex 3)", prerequisite: "Nicolai's secret" },
				protean_curse: { name: "Protean Curse", attribute: "Intelligence", cost: "O", description: "Turn someone into a bat", prerequisite: "Chicago" },
				rending_the_sweet_earth: { name: "Rending the Sweet Earth", attribute: "Intelligence", cost: "O", description: "Unearth a vampire using Earth Meld (Protean 3)", prerequisite: "Chicago" },
				ward_against_cainites: { name: "Ward against Cainites", attribute: "Intelligence", cost: "O", description: "Create a ward against vampires" },
				warding_circle_against_lupines: { name: "Warding Circle against Lupines", attribute: "Intelligence", cost: "OOO", description: "Create a warding circle against werewolves" },
			},
			{
				creatio_ignis: { name: "Creatio Ignis", attribute: "Intelligence", cost: "O", description: "Ignite your arms without taking damage", prerequisite: "Cainite" },
				eden_s_bounty: { name: "Eden's Bounty", attribute: "Intelligence", cost: "O", description: "Drain blood from a one-mile radius", prerequisite: "Bahari" },
				escape_to_true_sanctuary: { name: "Escape to True Sanctuary", attribute: "Intelligence", cost: "OOOOOOOOOOOO (12)", description: "Set up two circles, allowing you to teleport from one to the other" },
				heart_of_stone: { name: "Heart of Stone", attribute: "Intelligence", cost: "OA", description: "Remove emotions and prevent staking" },
				shaft_of_belated_dissolution: { name: "Shaft of Belated Dissolution", attribute: "Intelligence", cost: "OO", description: "Enchant a stake to cause Final Death, even if it misses the heart" },
				transferring_the_soul: { name: "Transferring the Soul", attribute: "Intelligence", cost: "O", description: "Let a Diablerized vampire take control", prerequisite: "Oblivion 5" },
				warding_circle_against_cainites: { name: "Warding Circle against Cainites", attribute: "Intelligence", cost: "OOO", description: "Create a warding circle against vampires" },
			},
		]
	},
	celerity: {
		name: "Celerity",
		powers: [
			{
				cat_s_grace: { name: "Cat's Grace", attribute: "–", cost: "–", description: "Always keep your balance" },
				rapid_reflexes: { name: "Rapid Reflexes", attribute: "–", cost: "–", description: "Dodge against Firearms and take minor actions for free" },
			},
			{
				fleetness: { name: "Fleetness", attribute: "–", cost: "O", description: "Add Celerity to Dexterity checks" },
			},
			{
				blink: { name: "Blink", attribute: "Dexterity", cost: "O", description: "Move far before taking an action" },
				traversal: { name: "Traversal", attribute: "Dexterity", cost: "O", description: "Run across liquids or walls" },
			},
			{
				draught_of_elegance: { name: "Draught of Elegance", attribute: "–", cost: "O", description: "Give Celerity to others" },
				unerring_aim: { name: "Unerring Aim", attribute: "–", cost: "O", description: "Make ranged attacks at Difficulty 1", prerequisite: "Auspex 2" },
			},
			{
				lightning_strike: { name: "Lightning Strike", attribute: "–", cost: "O", description: "Make melee attacks at Difficulty 1" },
				split_second: { name: "Split Second", attribute: "–", cost: "O", description: "Retcon the ST's narration of events" },
			},
		]
	},
	dominate: {
		name: "Dominate",
		powers: [
			{
				cloud_memory: { name: "Cloud Memory", attribute: "Charisma", cost: "–", description: "Remove a few minutes of memories" },
				compel: { name: "Compel", attribute: "Charisma", cost: "–", description: "Force someone to take one action" },
			},
			{
				mesmerize: { name: "Mesmerize", attribute: "Manipulation", cost: "O", description: "Impose a command" },
				dementation: { name: "Dementation", attribute: "Manipulation", cost: "O", description: "Inflict willpower damage in conversation", prerequisite: "Obfuscate 2" },
				domitor_s_favor: { name: "Domitor's Favor", attribute: "–", cost: "O", description: "Prevent thralls from defying the bond" },
				slavish_devotion: { name: "Slavish Devotion", attribute: "–", cost: "–", description: "Penalize attempts to affect your thralls", prerequisite: "Presence 1" },
			},
			{
				the_forgetful_mind: { name: "The Forgetful Mind", attribute: "Manipulation", cost: "O", description: "Rewrite memories" },
				submerged_directive: { name: "Submerged Directive", attribute: "–", cost: "–", description: "Set a trigger for Mesmerize", prerequisite: "(Mesmerize?)" },
			},
			{
				ancestral_dominion: { name: "Ancestral Dominion", attribute: "Manipulation", cost: "O", description: "Control your direct descendants", prerequisite: "Sorcery 3" },
				rationalize: { name: "Rationalize", attribute: "–", cost: "–", description: "Victims rationalize their behavior" },
			},
			{
				mass_manipulation: { name: "Mass Manipulation", attribute: "–", cost: "O", description: "Affect groups with other powers" },
				terminal_decree: { name: "Terminal Decree", attribute: "–", cost: "–", description: "Dominate commands can be suicidal" },
			},
		]
	},
	fortitude: {
		name: "Fortitude",
		powers: [
			{
				resilience: { name: "Resilience", attribute: "–", cost: "–", description: "Add Fortitude to health levels" },
				unswayable_mind: { name: "Unswayable Mind", attribute: "–", cost: "–", description: "Add Fortitude to mental resistance" },
			},
			{
				enduring_beasts: { name: "Enduring Beasts", attribute: "Stamina", cost: "O / –", description: "Give Fortitude to animals", prerequisite: "Animalism 1" },
				obdurate: { name: "Obdurate", attribute: "Wits, Stamina", cost: "O", description: "Become briefly immovable", prerequisite: "Potence 2" },
				toughness: { name: "Toughness", attribute: "–", cost: "O", description: "Subtract Fortitude from superficial damage before halving" },
				valeren: { name: "Valeren", attribute: "Intelligence", cost: "O / OD+", description: "Heal other vampires' health", prerequisite: "Auspex 1" },
			},
			{
				defy_bane: { name: "Defy Bane", attribute: "Wits", cost: "O", description: "Turn aggravated damage to superficial" },
				fortify_the_inner_façade: { name: "Fortify the Inner Façade", attribute: "–", cost: "–", description: "Resist Auspex and similar powers" },
			},
			{
				draught_of_endurance: { name: "Draught of Endurance", attribute: "–", cost: "O", description: "Give Fortitude to others" },
				shatter: { name: "Shatter", attribute: "Stamina", cost: "O", description: "Damage removed by Toughness is redirected to the attacker", prerequisite: "Toughness" },
			},
			{
				flesh_of_marble: { name: "Flesh of Marble", attribute: "–", cost: "OO", description: "Ignore one source of damage per turn" },
				prowess_from_pain: { name: "Prowess from Pain", attribute: "–", cost: "O", description: "Add physical damage to attributes" },
			},
		]
	},
	obfuscate: {
		name: "Obfuscate",
		powers: [
			{
				cloak_of_shadows: { name: "Cloak of Shadows", attribute: "–", cost: "–", description: "Go invisible, but cannot move" },
				silence_of_death: { name: "Silence of Death", attribute: "–", cost: "–", description: "Silence all sounds" },
			},
			{
				chimerstry: { name: "Chimerstry", attribute: "Manipulation", cost: "O", description: "Create distracting hallucinations", prerequisite: "Presence 1" },
				unseen_passage: { name: "Unseen Passage", attribute: "–", cost: "O", description: "Go invisible and move around" },
				ventriloquism: { name: "Ventriloquism", attribute: "Wits", cost: "O", description: "Project your voice to one person only", prerequisite: "Auspex 2" },
			},
			{
				fata_morgana: { name: "Fata Morgana", attribute: "Manipulation", cost: "O", description: "Create elaborate hallucinations", prerequisite: "Presence 2" },
				ghost_in_the_machine: { name: "Ghost in the Machine", attribute: "–", cost: "–", description: "Obfuscate affects technology" },
				mask_of_a_thousand_faces: { name: "Mask of a Thousand Faces", attribute: "–", cost: "O", description: "Appear visible but unremarkable" },
				mental_maze: { name: "Mental Maze", attribute: "Charisma", cost: "O / OOO", description: "Prevent someone from perceiving any exits or means of escape", prerequisite: "Dominate 1" },
			},
			{
				conceal: { name: "Conceal", attribute: "Intelligence", cost: "O", description: "Conceal objects (up to house-sized)", prerequisite: "Auspex 3" },
				vanish: { name: "Vanish", attribute: "Wits", cost: "–", description: "Disappear even while directly observed", prerequisite: "Cloak of Shadows" },
			},
			{
				cloak_the_gathering: { name: "Cloak the Gathering", attribute: "Wits", cost: "O", description: "Affect groups with Obfuscate" },
				imposter_s_guise: { name: "Imposter's Guise", attribute: "Wits, Manipulation", cost: "O", description: "Appear as a specific individual", prerequisite: "Mask of a Thousand Faces" },
			},
		]
	},
	oblivion: {
		name: "Oblivion",
		powers: [
			{
				ashes_to_ashes: { name: "Ashes to Ashes", attribute: "Stamina", cost: "O", description: "Disintegrate a corpse" },
				binding_fetter: { name: "Binding Fetter", attribute: "Wits", cost: "–", description: "Detect ghostly fetters" },
				shadow_cloak: { name: "Shadow Cloak", attribute: "–", cost: "–", description: "Manipulate shadows (gives bonuses)" },
				oblivion_s_sight: { name: "Oblivion's Sight", attribute: "–", cost: "–", description: "See in darkness and perceive ghosts" },
			},
			{
				arms_of_ahriman: { name: "Arms of Ahriman", attribute: "Wits", cost: "O", description: "Use shadows to attack", prerequisite: "Potence 2" },
				fatal_precognition: { name: "Fatal Precognition", attribute: "Resolve", cost: "O", description: "Prophesize someone's death", prerequisite: "Auspex 2" },
				shadow_cast: { name: "Shadow Cast", attribute: "–", cost: "O", description: "Create shadows (gives bonuses)" },
				where_the_shroud_thins: { name: "Where the Shroud Thins", attribute: "Wits", cost: "O", description: "Sense the strength of the Shroud, and reduce ceremony difficulties if it's thin" },
			},
			{
				aura_of_decay: { name: "Aura of Decay", attribute: "Stamina", cost: "O", description: "Decay everything around" },
				passion_feast: { name: "Passion Feast", attribute: "–", cost: "–", description: "Feed on wraiths, draining Passion", prerequisite: "Fortitude 2" },
				shadow_perspective: { name: "Shadow Perspective", attribute: "–", cost: "O", description: "Project senses through shadows" },
				touch_of_oblivion: { name: "Touch of Oblivion", attribute: "Strength", cost: "O", description: "Decay a living or unliving body" },
			},
			{
				necrotic_plague: { name: "Necrotic Plague", attribute: "Intelligence", cost: "O", description: "Cause damage over time" },
				stygian_shroud: { name: "Stygian Shroud", attribute: "–", cost: "O", description: "Impose darkness on an area" },
			},
			{
				shadow_step: { name: "Shadow Step", attribute: "–", cost: "O", description: "Teleport between shadows" },
				skuld_fulfilled: { name: "Skuld Fulfilled", attribute: "Stamina", cost: "OO", description: "Re-impose old injury or sickness" },
				tenebrous_avatar: { name: "Tenebrous Avatar", attribute: "–", cost: "OO", description: "Become a shadow" },
				withering_spirit: { name: "Withering Spirit", attribute: "Resolve", cost: "OO", description: "Erode a target's will" },
			},
		],
		ritual_name: ["Ceremony", "Ceremonies"],
		rituals: [
			{
				gift_of_false_life: { name: "Gift of False Life", attribute: "Resolve", cost: "O", description: "Reanimate a corpse to perform one task", prerequisite: "Ashes to Ashes" },
				knowing_stone: { name: "Knowing Stone", attribute: "Resolve", cost: "O", description: "Scry a ghost's location from its name", prerequisite: "(Unknown)" },
				summon_spirit: { name: "Summon Spirit", attribute: "Resolve", cost: "O", description: "Summon a ghost with its fetter", prerequisite: "Binding Fetter" },
				traveler_s_call: { name: "Traveler's Call", attribute: "Resolve", cost: "O", description: "Alert another Shalimite to your location", prerequisite: "Oblivion Sight, Shalimite" },
			},
			{
				awaken_the_homuncular_servant: { name: "Awaken the Homuncular Servant", attribute: "Resolve", cost: "O", description: "Create a small programmable minion", prerequisite: "Where the Shroud Thins" },
				compel_spirit: { name: "Compel Spirit", attribute: "Resolve", cost: "O", description: "Force a spirit to obey", prerequisite: "Where the Shroud Thins" },
			},
			{
				host_spirit: { name: "Host Spirit", attribute: "Resolve, Composure", cost: "O", description: "Invite a spirit into your body for power", prerequisite: "Aura of Decay" },
				name_of_the_father: { name: "Name of the Father", attribute: "Resolve", cost: "O", description: "Paralyze someone with despair", prerequisite: "Shadow Perspective, Shalimite" },
				shambling_hordes: { name: "Shambling Hordes", attribute: "Resolve", cost: "OH", description: "Reanimate obedient, long-lasting zombies", prerequisite: "Aura of Decay" },
			},
			{
				bind_the_spirit: { name: "Bind the Spirit", attribute: "Resolve", cost: "OH", description: "Anchor a ghost to haunt a person or location", prerequisite: "Necrotic Plague" },
				split_the_shroud: { name: "Split the Shroud", attribute: "Resolve", cost: "OH", description: "Tear open the Shroud", prerequisite: "Necrotic Plague" },
			},
			{
				ex_nihilo: { name: "Ex Nihilo", attribute: "Resolve", cost: "OOOW", description: "Cross into the Shadowlands", prerequisite: "Withering Spirit, Split the Shroud" },
				lazarene_blessing: { name: "Lazarene Blessing", attribute: "Resolve", cost: "OH", description: "Put a wraith in a body and bring it to life", prerequisite: "Skuld Fulfilled" },
				pit_of_contemplation: { name: "Pit of Contemplation", attribute: "Resolve", cost: "OH", description: "Create a doorway into Oblivion itself", prerequisite: "Tenebrous Avatar, Shalimite" },
			},
		]
	},
	potence: {
		name: "Potence",
		powers: [
			{
				lethal_body: { name: "Lethal Body", attribute: "–", cost: "–", description: "Unarmed attacks do agg to mortals" },
				soaring_leap: { name: "Soaring Leap", attribute: "–", cost: "–", description: "Jump enormous distances" },
			},
			{
				prowess: { name: "Prowess", attribute: "Strength", cost: "O", description: "Add Potence to damage dealt" },
			},
			{
				brutal_feed: { name: "Brutal Feed", attribute: "–", cost: "–", description: "Drain a person in seconds" },
				spark_of_rage: { name: "Spark of Rage", attribute: "Manipulation", cost: "O", description: "Add Potence to rolls to induce rage", prerequisite: "Presence 3" },
				uncanny_grip: { name: "Uncanny Grip", attribute: "–", cost: "O", description: "Hold onto any surface" },
			},
			{
				draught_of_might: { name: "Draught of Might", attribute: "–", cost: "O", description: "Give Potence to others" },
			},
			{
				earthshock: { name: "Earthshock", attribute: "–", cost: "OO", description: "Create a shockwave" },
				fist_of_caine: { name: "Fist of Caine", attribute: "–", cost: "O", description: "Unarmed attacks do agg to everything" },
			},
		]
	},
	presence: {
		name: "Presence",
		powers: [
			{
				awe: { name: "Awe", attribute: "Manipulation", cost: "–", description: "Add Presence to Charisma" },
				daunt: { name: "Daunt", attribute: "–", cost: "–", description: "Intimidate people and ward off attacks" },
				eyes_of_the_serpent: { name: "Eyes of the Serpent", attribute: "Charisma", cost: "–", description: "Paralyze someone with eye contact", prerequisite: "Protean 1" },
			},
			{
				lingering_kiss: { name: "Lingering Kiss", attribute: "–", cost: "–", description: "Biting gives bonuses but also addiction" },
			},
			{
				clear_the_field: { name: "Clear the Field", attribute: "Composure", cost: "O", description: "Force everyone to leave the area", prerequisite: "Dominate 3" },
				dread_gaze: { name: "Dread Gaze", attribute: "Charisma", cost: "O", description: "Terrify an individual" },
				entrancement: { name: "Entrancement", attribute: "Charisma", cost: "O", description: "Cause infatuation" },
				true_love_s_face: { name: "True Love's Face", attribute: "Manipulation", cost: "O", description: "Appear as whoever the target loves", prerequisite: "Obfuscate 3" },
			},
			{
				irresistable_voice: { name: "Irresistable Voice", attribute: "–", cost: "–", description: "Dominate doesn't require eye contact", prerequisite: "Dominate 1" },
				magnum_opus: { name: "Magnum Opus", attribute: "(Unclear)", cost: "O+", description: "Imbue Awe or Daunt into an artwork", prerequisite: "Auspex 3" },
				summon: { name: "Summon", attribute: "Manipulation", cost: "O", description: "Summon a specific person" },
			},
			{
				majesty: { name: "Majesty", attribute: "Charisma", cost: "OO", description: "Prevent all opposition and aggression" },
				star_magnetism: { name: "Star Magnetism", attribute: "–", cost: "O", description: "Presence works through technology" },
			},
		]
	},
	protean: {
		name: "Protean",
		powers: [
			{
				eyes_of_the_beast: { name: "Eyes of the Beast", attribute: "–", cost: "–", description: "Transform eyes to see in darkness" },
				weight_of_the_feather: { name: "Weight of the Feather", attribute: "Wits", cost: "–", description: "Become weightless" },
			},
			{
				feral_weapons: { name: "Feral Weapons", attribute: "–", cost: "O", description: "Grow claws or enhance natural fangs" },
				vicissitude: { name: "Vicissitude", attribute: "Resolve", cost: "O", description: "Reshape your body in various ways" },
			},
			{
				earth_meld: { name: "Earth Meld", attribute: "–", cost: "O", description: "Meld into soil" },
				fleshcrafting: { name: "Fleshcrafting", attribute: "Resolve", cost: "O", description: "Apply Vicissitude to others", prerequisite: "Dominate 2, Vicissitude" },
				shapechange: { name: "Shapechange", attribute: "–", cost: "O", description: "Turn into a human-sized animal" },
			},
			{
				horrid_form: { name: "Horrid Form", attribute: "–", cost: "O", description: "Turn into a monstrosity", prerequisite: "Dominate 2, Vicissitude" },
				metamorphosis: { name: "Metamorphosis", attribute: "–", cost: "O", description: "Turn into any animal", prerequisite: "Shapechange" },
			},
			{
				heart_of_darkness: { name: "Heart of Darkness", attribute: "–", cost: "AA / OO", description: "Remove your heart to prevent staking", prerequisite: "Fortitude 2" },
				mist_form: { name: "Mist Form", attribute: "–", cost: "O - OOO", description: "Turn into a cloud of mist" },
				one_with_the_land: { name: "One with the Land", attribute: "Wits, Resolve", cost: "OO", description: "Experience everything in a one-mile radius while melded", prerequisite: "Animalism 2, Earth Meld" },
				the_unfettered_heart: { name: "The Unfettered Heart", attribute: "–", cost: "– / O", description: "Prevent staking or get free from it" },
			},
		]
	},
	thin_blood_alchemy: {
		name: "Thin-Blood Alchemy",
		ritual_name: ["Formula", "Formulas"],
		rituals: [
			{
				far_reach: { name: "Far Reach", attribute: "Resolve", cost: "O", description: "Minor telekinesis" },
				haze: { name: "Haze", attribute: "–", cost: "O", description: "Create a cloud of mist" },
			},
			{
				envelop: { name: "Envelop", attribute: "Wits", cost: "O", description: "Blind and suffocate a target" },
				counterfeit_1: { name: "Counterfeit 1", attribute: "–", cost: "–", description: "Counterfeit a first-level discipline" },
			},
			{
				chemically_induced_flashback: { name: "Chemically-Induced Flashback", attribute: "–", cost: "O", description: "Imbue memories into Ashe", prerequisite: "Concoct Ashe" },
				concoct_ashe: { name: "Concoct Ashe", attribute: "Intelligence", cost: "–", description: "Produce Ashe from a vampire's ashes", prerequisite: "Ashfinder" },
				defractionate: { name: "Defractionate", attribute: "–", cost: "–", description: "Turn fractionated blood drinkable again" },
				profane_hieros_gamos: { name: "Profane Hieros Gamos", attribute: "Resolve", cost: "O", description: "Transform a target into their ideal self" },
				counterfeit_2: { name: "Counterfeit 2", attribute: "–", cost: "–", description: "Counterfeit a second-level discipline" },
			},
			{
				airborne_momentum: { name: "Airborne Momentum", attribute: "Strength", cost: "O", description: "Fly for a limited time" },
				discipline_channelling: { name: "Discipline Channelling", attribute: "–", cost: "–", description: "Imbue disciplines into Ashe", prerequisite: "Concoct Ashe" },
				counterfeit_3: { name: "Counterfeit 3", attribute: "–", cost: "–", description: "Counterfeit a third-level discipline" },
			},
			{
				awaken_the_sleeper: { name: "Awaken the Sleeper", attribute: "–", cost: "–", description: "End a vampire's torpor early" },
				counterfeit_4: { name: "Counterfeit 4", attribute: "–", cost: "–", description: "Counterfeit a fourth-level discipline" },
			},
		]
	},
};

export const V5ModernPredatorTypes: aut.ruleset.PredatorTypes = {
	alleycat: {
		name: "Alleycat",
		description: "Assaulting people for their blood",
		pool: "Strength + Brawl",
		disciplines: ["Celerity", "Potence"],
		speciality: ["Intimidation: Stickups", "Brawl: Grappling"],
		humanity: -1,
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["contact", "contact"], description: "Criminal", dots: 3 }
				]
			}
		]
	},
	bagger: {
		name: "Bagger",
		description: "Stealing or procuring processed blood",
		pool: "Intelligence + Streetwise",
		disciplines: ["Obfuscate", "Oblivion", "Blood Sorcery"],
		speciality: ["Larceny: Lock-picking", "Streetwise: Black Market"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["feeding", "iron_gullet"] },
					{ name: ["ally", "enemy"], description: "Either someone believes you owe them, or there's another reason you keep off the streets.", dots: 2 }

				]
			}
		]
	},
	blood_leech: {
		name: "Blood Leech",
		description: "Feeding only on Kindred",
		pool: "[Cannot be abstracted]",
		disciplines: ["Celerity", "Protean"],
		speciality: ["Brawl: Kindred", "Stealth: against Kindred"],
		humanity: -1,
		blood_potency: 1,
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["feeding", "prey_exclusion"], description: "Mortals" },
				]
			},
			{
				type: "OR",
				list: [
					{ name: ["status", "shunned"], dots: 2 },
					{ name: ["fame", "dark_secret"], description: "Diablerist", dots: 2 },
				]
			}
		]
	},
	cleaver: {
		name: "Cleaver",
		description: "Maintaining a family to feed from",
		pool: "Manipulation + Subterfuge",
		disciplines: ["Animalism", "Dominate"],
		speciality: ["Persuasion: Gaslighting", "Subterfuge: Coverups"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["fame", "dark_secret"], description: "Cleaver", dots: 1 },
					{ name: ["herd", "4_7_mortals"] },
				]
			}
		]
	},
	consensualist: {
		name: "Consensualist",
		description: "Getting vessels' consent before feeding",
		pool: "Manipulation + Persuasion",
		disciplines: ["Auspex", "Fortitude"],
		speciality: ["Medicine: Phlebotomy", "Persuasion: Victims"],
		humanity: 1,
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["fame", "dark_secret"], description: "Masquerade Breacher", dots: 1 },
					{ name: ["feeding", "prey_exclusion"], description: "non-consenting" },
				]
			}
		]
	},
	extortionist: {
		name: "Extortionist",
		description: "Taking blood in exchange for services",
		pool: "Strength or Manipulation + Intimidation",
		disciplines: ["Dominate", "Potence"],
		speciality: ["Indimidation: Coercion", "Larceny: Security"],
		advantages: [
			{
				type: "SPLIT",
				amount: 3,
				list: [
					{ name: ["contacts", "contacts"] },
					{ name: ["resources", "resources"] },
				]
			},
			{
				type: "AND",
				list: [
					{ name: ["ally", "enemy"], dots: 2 }
				]
			}
		]
	},
	farmer: {
		name: "Farmer",
		description: "Feeding only on animals",
		pool: "Composure + Animal Ken",
		disciplines: ["Animalism", "Protean"],
		speciality: ["Animal Ken: (Specific Animal)", " Survival: Hunting"],
		humanity: 1,
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["feeding", "vegan"] }
				]
			}
		]
	},
	graverobber: {
		name: "Graverobber",
		description: "Feeding on cadavers and/or mourners",
		pool: "Resolve + Medicine, Manipulation + Insight",
		disciplines: ["Fortitude", "Oblivion"],
		speciality: ["Occult: Grave Rituals", "Medicine: Cadavers"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["feeding", "iron_gullet"] },
					{ name: ["haven", "base_haven"], dots: 1 },
					{ name: ["herd", "obvious_predator"], dots: 2 }
				]
			}
		]
	},
	osiris: {
		name: "Osiris",
		description: "Controlling a cult or following to feed from",
		pool: "Manipulation + Subterfuge or Intimidation + Fame",
		disciplines: ["Presence", "Blood Sorcery"],
		speciality: ["Occult: (specific tradition)", "Performance: (specific entertainment field)"],
		advantages: [
			{
				type: "SPLIT",
				amount: 3,
				list: [
					{ name: ["fame", "(any)"] },
					{ name: ["herd", "(any)"] },
				]
			},
			{
				type: "SPLIT",
				amount: 2,
				list: [
					{ name: ["ally", "enemy"] },
					{ name: ["mythic", "(any)"] },
				]
			}
		]
	},
	roadside_killer: {
		name: "Roadside Killer",
		description: "Preying on travellers who won't be missed",
		pool: "Dexterity or Charisma + Drive",
		disciplines: ["Fortitude", "Protean"],
		speciality: ["Survival: the Road", "Investigation: Vampire Cant"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["feeding", "prey_exclusion"], description: "Locals" },
					{ name: ["herd", "4_7_mortals"], description: "Migrating" },
				]
			}
		]
	},
	sandman: {
		name: "Sandman",
		description: "Stealing blood from sleeping vessels",
		pool: "Dexterity + Stealth",
		disciplines: ["Auspex", "Obfuscate"],
		speciality: ["Medicine: Anesthetics", "Stealth: Break-in"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["resources", "resources"], dots: 1 },
				]
			}
		]
	},
	scene_queen: {
		name: "Scene Queen",
		description: "Using influence in a specific subculture",
		pool: "Manipulation + Persuasion",
		disciplines: ["Dominate", "Potence"],
		speciality: ["Etiquette: (specific scene)", "Leadership: (specific scene)", "Streetwise: (specific scene)"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["fame", "famous"], dots: 1 },
					{ name: ["contact", "contact"], dots: 1 },
				]
			},
			{
				type: "OR",
				list: [
					{ name: ["influence", "disliked"] },
					{ name: ["feeding", "prey_Exclusion"], description: "a different subculture" }
				]
			}
		]
	},
	siren: {
		name: "Siren",
		description: "Using sex or intimacy to hide your feeding",
		pool: "Charisma + Subterfuge",
		disciplines: ["Fortitude", "Presence"],
		speciality: ["Persuation: Seduction", "Subterfuge: Seduction"],
		advantages: [
			{
				type: "AND",
				list: [
					{ name: ["ally", "enemy"], dots: 1 },
					{ name: ["looks", "beautiful"] }
				]
			}
		]
	}
};

export const V5ModernSkillDistributions = {
	"jack-of-all-trades": [0, 10, 8, 1, 0, 0],
	"balanced": [0, 7, 5, 3, 0, 0],
	"specialist": [0, 3, 3, 3, 4, 0]
};

export const V5ModernCharacterAdvantages: aut.ruleset.CharacterAdvantages = {
	ally: {
		ally: {
			name: "Ally", type: "merit", cost: [1, 2, 3, 4, 5], hasDetail: true
		},
		enemy: {
			name: "Enemy", type: "flaw", cost: [1, 2, 3, 4, 5], hasDetail: true
		}
	},
	archaic: {
		anachronism: {
			name: "Anachronism", type: "flaw", cost: [2],
			description: "Your Technology skill rating is permanently 0 or -1.",

		},
		living_in_the_past: {
			name: "Living in the Past", type: "flaw", cost: [1],
			description: "You have one or more outdated convictions.",
		}
	},
	bonding: {
		bondslave: {
			name: "Bondslave", type: "flaw", cost: [2],
			description: "You are blood bound at the first taste of another vampire's blood.",
		},
		blood_junkie: {
			name: "Blood Junkie", type: "flaw", cost: [1],
			description: "Your dice pools have -1 to act against a blood bond.",
		},
		long_bond: {
			name: "Long Bond", type: "flaw", cost: [1],
			description: "Blood bonds need only be reinforced once every three months (instead of each month).",
		},
		bond_resistance: {
			name: "Bond Resistance", type: "merit", cost: [1],
			description: "Your dice pools have +1 to act against a blood bond.",
		},
		short_bond: {
			name: "Short Bond", type: "merit", cost: [2],
			description: "Blood bonds need be reinforced twice each month (instead of once).",
		},
		unbondable: {
			name: "Unbondable", type: "merit", cost: [5],
			description: "You can never be blood bound.",
		}
	},
	contact: {
		contact: {
			name: "Contact", type: "merit", cost: [1, 2, 3, 4, 5], hasDetail: true
		}
	},
	domain: {
		no_domain: {
			name: "No Domain", type: "flaw", cost: [1],
			description: "You must either poach from other domains or receive a letter of passage from a Prince or other high official to reside peacefully in foreign domains."
		},
		chasse: {
			name: "Chasse", type: "merit", cost: [1, 2, 3, 4, 5],
			description: "The value of the domain as hunting ground ranging from (•) a city block to (•••••) three neighborhoods or a large group of features."
		},
		lien: {
			name: "Lien", type: "merit", cost: [1, 2, 3, 4, 5],
			description: "The ease of interaction between the domain's mortals with the coterie ranging from (•) +1 to die pools on these tests to (•••••) +5 to die pools on these tests. Does not apply to hunting."
		},
		portillon: {
			name: "Portillon", type: "merit", cost: [1, 2, 3, 4, 5],
			description: "The security of the domain against intrusion and interruption ranging from (•) +1 to difficulty on these tests to (•••••) +5 to difficulty on these tests. Does not apply to havens."
		}
	},
	fame: {
		famous: {
			name: "Famous", type: "merit", cost: [1, 2, 3, 4, 5], hasDetail: true
		},
		infamous: {
			name: "Infamous", type: "flaw", cost: [1, 2, 3, 4, 5], hasDetail: true
		},
		dark_secret: {
			name: "Dark Secret", type: "flaw", cost: [1, 2, 3, 4, 5], hasDetail: true
		}
	},
	feeding: {
		vegan: {
			name: "Vegan", type: "flaw", cost: [2],
			description: "You only feed on animals. Spend 2 Willpower to feed on humans. (Ventrue may not take this flaw.)"
		},
		organovore: {
			name: "Organovore", type: "flaw", cost: [2],
			description: "When you feed you must consume your victim's organs. (Only the heart can provide resonance.)"
		},
		methuselah_s_thirst: {
			name: "Methuselah's Thirst", type: "flaw", cost: [1],
			description: "Your hunger cannot be reduced below 1, except by drinking blood of a supernatural."
		},
		prey_exclusion: {
			name: "Prey Exclusion", type: "flaw", cost: [1],
			description: "You refuse to feed on a specific class of prey."
		},
		bloodhound: {
			name: "Bloodhound", type: "merit", cost: [1],
			description: "You can smell the resonance of blood with Resolve + Awareness ≥ 3."
		},
		iron_gullet: {
			name: "Iron Gullet", type: "merit", cost: [3],
			description: "You can feed from cold, rancid blood and even plasma; none of which provide resonance. (Ventrue may not take this advantage.)"
		}
	},
	haven: {
		compromised: {
			name: "Compromised", type: "flaw", cost: [2],
			description: "Your Haven has been raided before. Invaders have +2 dice to gain access."
		},
		creepy: {
			name: "Creepy", type: "flaw", cost: [1],
			description: "Your Haven looks like the residence of a serial killer."
		},
		haunted: {
			name: "Haunted", type: "flaw", cost: [1, 2, 3, 4, 5],
			description: "Your Haven is haunted by some supernatural manifestation."
		},
		no_haven: {
			name: "No Haven", type: "flaw", cost: [1],
			description: "You have no haven."
		},
		base_haven: {
			name: "Base Haven", type: "merit", cost: [1, 2, 3],
			description: "You have a haven ranging from (•) small and likely secure to (•••) large, secure and likely private."
		}
	},
	herd: {
		obvious_predator: {
			name: "Obvious Predator", type: "flaw", cost: [2],
			description: "Mortals instinctively fear and mistrust you. You cannot maintain a herd. -1 to social tests with mortals to put them at ease."
		},
		"1_3_mortals": {
			name: "1-3 Mortals", type: "merit", cost: [1],
			description: "Random resonance, can choose resonance once a month with a Manipulation + Insight test (Difficulty 4)."
		},
		"4_7_mortals": {
			name: "4-7 Mortals", type: "merit", cost: [2],
			description: "Half of which have a set resonance that you pick at purchase."
		},
		"7_15_mortals": {
			name: "7-15 Mortals", type: "merit", cost: [3],
			description: "Two different resonances of your choice per week."
		},
		"16_30_mortals": {
			name: "16-30 Mortals", type: "merit", cost: [4],
			description: "Two resonances of your choice per week. Herd gets involved in chronicle at times."
		},
		"31_60_mortals": {
			name: "31-60 Mortals", type: "merit", cost: [5],
			description: "Three resonances of your choice per week. Herd can breach the Masquerade."
		}
	},
	influence: {
		despised: {
			name: "Despised", type: "flaw", cost: [2],
			description: "By a group or region of the city. They actively seek to thwart you and your goals. -2 from dice pools in social situations with them."
		},
		disliked: {
			name: "Disliked", type: "flaw", cost: [1],
			description: "By most. -1 from dice pools in social situations with all except your contacts, allies, and coterie."
		},
		well_connected: {
			name: "Well-connected", type: "merit", cost: [1],
			description: "You're ensured a hearing."
		},
		influential_$influence$: {
			name: "Influential (Influence)", type: "merit", cost: [2],
			description: "People want to do you favors."
		},
		entrentched: {
			name: "Entrenched", type: "flaw", cost: [3],
			description: "Mortal powerbrokers tread carefully around you."
		},
		powerful_$influence$: {
			name: "Powerful (Influence)", type: "flaw", cost: [4],
			description: "With few exceptions most will obey you."
		},
		dominant: {
			name: "Dominant", type: "flaw", cost: [5],
			description: "Your lessers attempt to anticipate your whims."
		}
	},
	linguistics: {
		illiterate: {
			name: "Illiterate", type: "flaw", cost: [2],
			description: "You cannot read or write. Your Academics and Science skills cannot be raised above 1 or be granted specialties."
		},
		language: {
			name: "Language", type: "merit", cost: [1],
			description: "You are fluent and literate in an additional language."
		}
	},
	looks: {
		repulsive: {
			name: "Repulsive", type: "flaw", cost: [2],
			description: "Relevant Social dice pools have -2."
		},
		ugly: {
			name: "Ugly", type: "flaw", cost: [1],
			description: "Relevant Social dice pools have -1."
		},
		beautiful: {
			name: "Beautiful", type: "merit", cost: [2],
			description: "Relevant Social dice pools have +1."
		},
		stunning: {
			name: "Stunning", type: "merit", cost: [4],
			description: "Relevant Social dice pools have +2."
		}
	},
	loresheet: {},
	mask: {
		known_blankbody: {
			name: "Known Blankbody", type: "flaw", cost: [2],
			description: "Most (if not all) of your identifying information is part of several intelligence databases as a potential terrorist. You are at high risk to be targeted by the Second Inquisition."
		},
		known_corpse: {
			name: "Known Corpse", type: "flaw", cost: [1],
			description: "You 'died' recently and people will recognize you."
		},
		fake_id_card: {
			name: "Fake ID Card", type: "merit", cost: [1],
			description: "You can get anything from a credit card to a birth certificate with this card."
		},
		fake_identity: {
			name: "Fake Identity", type: "merit", cost: [2],
			description: "You can pass an in-depth background check."
		},
		zeroed: {
			name: "Zeroed", type: "merit", cost: [1],
			description: "Your real identity has been erased. You can only but this merit if you have Fake Identity merit."
		},
		cobbler: {
			name: "Cobbler", type: "merit", cost: [1],
			description: "You can make or source Masks. Making a Mask takes three days per (•) and possibly exposes you online. Sourcing a Mask takes one day per (•) and can cost."
		}
	},
	mawla: {
		adversary: {
			name: "Adversary", type: "flaw", cost: [1, 2, 3, 4, 5], hasDetail: true
		},
		mawla: {
			name: "Mawla", type: "merit", cost: [1, 2, 3, 4, 5], hasDetail: true
		},
		minor_boon: {
			name: "Minor Boon", type: "merit", cost: [1, 2, 3], hasDetail: true
		}
	},
	mythical: {
		stake_bait: {
			name: "Stake Bait", type: "flaw", cost: [2],
			description: "If you are ever staked through the heart, you meet Final Death."
		},
		folkloric_bane: {
			name: "Folkloric Bane", type: "flaw", cost: [1],
			description: "Identify a traditional anti-vampire object; it causes Aggravated Damage to you on touch."
		},
		folkloric_block: {
			name: "Folkloric Block", type: "flaw", cost: [1],
			description: "Identify a traditional anti-vampire ward; you must shrink away from it or spend a Willpower."
		},
		stigmata: {
			name: "Stigmata", type: "flaw", cost: [1],
			description: "At Hunger 4 you begin to bleed at various parts of your body."
		},
		eat_food: {
			name: "Eat Food", type: "merit", cost: [2],
			description: "You can consume food and maybe enjoy it, but you must expel it before being able to rest."
		}
	},
	resources: {
		destitude: {
			name: "Destitute", type: "flaw", cost: [1],
			description: "You have no money and no home."
		},
		portfolio_proletariat: {
			name: "Portfolio Proletariat", type: "merit", cost: [1],
			description: "You live paycheck to paycheck."
		},
		middle_class: {
			name: "Middle Class", type: "merit", cost: [2],
			description: "Nice apartment/small home with cars."
		},
		rich: {
			name: "Rich", type: "merit", cost: [3],
			description: "Great condo or nice house with luxury items."
		},
		wealthy: {
			name: "Wealthy", type: "merit", cost: [4],
			description: "Mansion. Private helicopter or jet."
		},
		ultra_rich: {
			name: "Ultra Rich", type: "merit", cost: [5],
			description: "Anything money can buy."
		}
	},
	retainer: {
		stalkers: {
			name: "Stalkers", type: "flaw", cost: [1],
			description: "Occasionally people tend to become irrationally interested in you."
		},
		retainer: {
			name: "Retainer", type: "merit", cost: [1, 2, 3], hasDetail: true
		}
	},
	status: {
		shunned: {
			name: "Shunned", type: "flaw", cost: [2],
			description: "Sect enemy."
		},
		suspect: {
			name: "Suspect", type: "flaw", cost: [1],
			description: "Not in good standing with a sect. -2 to all Social tests with that sect. (Caitiff)"
		},
		known: {
			name: "Known", type: "merit", cost: [1],
			description: "You have been introduced as a potential piece or player. (Neonate)"
		},
		respected: {
			name: "Respected", type: "merit", cost: [2],
			description: "You have responsibilities. (Ancilla)"
		},
		influential_$status$: {
			name: "Influential (Status)", type: "merit", cost: [3],
			description: "You have some authority. (Elder)"
		},
		powerful_$status$: {
			name: "Powerful (Status)", type: "merit", cost: [4],
			description: "You hold political office in Kindred society. (Sheriff/Harpy/Scourge)"
		},
		luminary: {
			name: "Luminary", type: "merit", cost: [5],
			description: "You sit in a position of power. (Primogen)"
		}
	},
	substance_abuse: {
		hopeless_addiction: {
			name: "Hopeless Addiction", type: "flaw", cost: [2],
			description: "Your dice pools have -2 if your last feeding did not include your drug of choice."
		},
		addiction: {
			name: "Addiction", type: "flaw", cost: [1],
			description: "Your dice pools have -1 if your last feeding did not include your drug of choice."
		},
		high_functioning_addict: {
			name: "High-functioning Addict", type: "merit", cost: [1],
			description: "Your dice pools have +1 if your last feeding included your drug of choice."
		}
	},
	thin_blooded: {
		baby_teeth: {
			name: "Baby Teeth", type: "flaw", cost: [1],
			description: "You have no fangs or useless fangs."
		},
		bestial_temper: {
			name: "Bestial Temper", type: "flaw", cost: [1],
			description: "You frenzy like a regular vampire."
		},
		branded_by_the_camarilla: {
			name: "Branded by the Camarilla", type: "flaw", cost: [1],
			description: "You have received a magical brand that marks you as a Thin-blood."
		},
		clan_curse: {
			name: "Clan Curse", type: "flaw", cost: [1],
			description: "You suffer from a clan Bane with a severity rating of 1. The Brujah and Gangrel Banes can only be selected if you also have the Bestial Temper Flaw. The Tremere Bane can only be selected if you also have the Catenating Blood Advantage."
		},
		dead_flesh: {
			name: "Dead Flesh", type: "flaw", cost: [1],
			description: "You are slowly decaying. You cannot take the (*) Lifelike Advantage."
		},
		mortal_frailty: {
			name: "Mortal Frailty", type: "flaw", cost: [1],
			description: "You cannot Rouse the Blood to mend. You cannot take the (*) Vampiric Resilience Advantage."
		},
		shunned_by_the_anarchs: {
			name: "Shunned by the Anarchs", type: "flaw", cost: [1],
			description: "Sect enemy of the Anarchs. You cannot take the (*) Anarch Comrades Advantage. Equivalent to the [••] Shunned Flaw."
		},
		vitae_dependency: {
			name: "Vitae Dependency", type: "flaw", cost: [1],
			description: "You need to drink vampire blood to use any Discipline."
		},
		anarch_comrades: {
			name: "Anarch Comrades", type: "merit", cost: [1],
			description: "An Anarch coterie treats you like a pet acting as a (•) Mawla."
		},
		camarilla_contact: {
			name: "Camarilla Contact", type: "merit", cost: [1],
			description: "A Camarilla recruiter treats you like garbage acting as a (•) Mawla."
		},
		catenating_blood: {
			name: "Catenating Blood", type: "merit", cost: [1],
			description: "You can create Blood Bonds and Embrace."
		},
		day_drinker: {
			name: "Day Drinker", type: "merit", cost: [1],
			description: "Sunlight only halves your health rounded up and prevents you from using Disciplines. Take no other damage from Sunlight."
		},
		discipline_affinity: {
			name: "Discipline Affinity", type: "merit", cost: [1],
			description: "You have a permanent dot in one Discipline. You still cannot have more than one dot in this Discipline."
		},
		lifelike: {
			name: "Lifelike", type: "merit", cost: [1],
			description: "You have a heartbeat, can eat food, and more."
		},
		thin_blood_alchemist: {
			name: "Thin-blood Alchemist", type: "merit", cost: [1],
			description: "Gain (•) and one formula in Thin-blood Alchemy."
		},
		vampiric_resilience: {
			name: "Vampiric Resilience", type: "merit", cost: [1],
			description: "You suffer damage as a regular vampire."
		}
	},
};

export const V5ModernCharacterAdvantagesFlat = Object.values(V5ModernCharacterAdvantages).reduce((n, x, i) => {
	for (const keys in x) { n[keys] = { ...(x[keys]), category: Object.keys(V5ModernCharacterAdvantages)[i] }; }
	return n;
}, {});
