// consider these "constants" (even though JS has no such thing >_>)

// .prototype is weird, and even I don't fully understand it. JS is real weird about objects.
Character.prototype.CHANCE_TO_REPEAT_ABILITIES = 50;
Character.prototype.CHANCE_TO_REPEAT_SPHERES = 75;
Character.prototype.CHANCE_TO_REPEAT_BACKGROUNDS = 70;
Character.prototype.ALLOW_ARCHMAGES = false;

Character.prototype.TRADITIONS = [
	'Akashic Brotherhood',
	'Celestial Chorus',
	'Cult of Ecstasy',
	'Dreamspeakers',
	'Euthanatos',
	'Order of Hermes',
	'Son of Ether',
	'Verbena',
	'Virtual Adepts',
];

Character.prototype.SPHERES = [
	'correspondence',
	'entropy',
	'forces',
	'life',
	'matter',
	'mind',
	'prime',
	'spirit',
	'time'
];

// from http://www.deathquaker.org/gaming/meritsflaws.html
// in addition to the "name" and "description" properties, there's also an "onAdd" property, which is a callback function to be called when the merit or flaw
// is given to a character. see Huge Size for an example.
/** @TODO: finish these lists! */
Character.prototype.MERITS = [
	// psychological
	{ name: 'Code of Honor', descripiton: 'You follow a strict personal code, and you either gain 3 extra dice to resist supernatural persuasions that would make you break your code, or the would-be persuader has to roll at a +2 difficulty.' },
	{ name: 'Dual Nature', description: 'You have two purposes in life; you can choose two Natures and regain Willpower when satisfying the requirements for either one (or both of them). These Natures should be complimentary to one another-this is a Merit, not a Derangement.' },
	{ name: 'Gall', description: 'You got moxy, kid. Add an extra die to any Social roll requiring backbone.' },
	{ name: 'Loyalty', description: 'You are devoted to a person, group, or cause, and easily resist attempts to persuade you away from the object of your loyalty. You also gain a Willpower bonus (in the form of bonus dice, or increased difficulty for your opponent) to try and resist supernatural forms of persuasion that challenge your loyalty.' },
	
	{ name: 'Clear-sighted', description: 'You are not fooled by illusions, and you get a Perception +Alertness roll, difficulty = opposing power\'s level +3, to see through supernatural illusions, such as those created by Obfuscation, Chimerstry, Chicanery, Gifts, etc.' },
	{ name: 'Common Sense', description: 'You are full of practical wisdom. A great merit for starting characters, as you may receive advice from the Storyteller regarding how to handle certain situations.' },
	{ name: 'Concentration' },
	{ name: 'Eidetic Memory' },
	{ name: 'Iron Will' },
	{ name: 'Lightning Calculator' },
	{ name: 'Self-confident', description: 'When you declare that you are spending Willpower for an automatic success on a roll, you do not lose the Willpower unless you fail the roll, due to the strength of your self-confidence. This only comes into effect regarding rolls at difficulty 6 or higher.' },
	{ name: 'Time Sense', description: 'You have an inate sense of time, and can with a good deal of accuracy tell what time it is without a watch. In performing feats where timing may be essential (such as certain combat or athletic maneuvers), difficulties may be lowered or dropped.' },
	
	{ name: 'Acute Senses' },
	{ name: 'Nightsight' },
	
	{ name: 'Ability Aptitude', description: 'Pick a single skill, talent, or knowledge: you\'re a whiz at whatver this is. -2 to difficulties relating to this ability.' },
	{ name: 'Animal Magnetism', description: 'You have the "fuck me" aura, and receive a -2 difficulty on seduction and similar rolls (though this may inspire jealousy in the people who view you as competition). This is a Merit seldom taken seriously in the Chat Rooms, as it\'s been too often used by players whose intent is seldom gaming...' },
	{ name: 'Ambidextrous', description: 'You are equally dextrous, or nearly so, with both hands, and use your "off" hand at no penalty. Difficulties to do two different tasks at once (one with each hand) are at +1 for both rolls, rather than +1 for the "right" hand and +3 for the other. Not useful if your ST isn\'t the nitpicky sort who doesn\'t give a shit about off-hand penalties and such...)' },
	{ name: 'Crack Driver', description: 'This has been changed to "Expert Driver" in later books, but we all know what this Merit really means: you drive a car like you\'re on crack (but can do it without killing anyone). Difficult driving rolls are reduced by 2. You can take similar merits for piloting or driving other vehicles if appropriate for the character and campaign.' },
	{ name: 'Culture Knack', description: 'You have a knack for fitting in wherever you are, and though you may not know them beforehand, you pick up on customs quickly. In appropriate situations, your social difficulties may be lowered, or you may be able to recover from a botched roll with another roll at normal difficulty.' },
	{ name: 'Daredevil', description: 'You love to take risks, and are damn good at living through them. -2 difficulty on dangerous feats, and you can ignore a single 1 on your roll.' },
	{ name: 'Graceful', description: 'You are extremely agile and delicate in your movements. -1 difficulty on all Dexterity rolls. Botches will still hurt, but it is possible to gracefully fall down, and you\'ll die before you look clumsy.' },
	{ name: 'Extremely Educated, Skilled, or Talented', description: 'You have a large general amount of knowledge, skill, or talent, and have an automatic 1 in the appropriate ability pools. This is an "illusory" level however–if you want to increase your aptitude in a particular ability, you must buy the first dot as if you didn\'t have it, and then the second.' },
	{ name: 'Natural Linguist', description: 'You\'re good with languages and language structures. 3 dice are added to any language-related roll, but you can\'t know anymore languages than your Linguistic score allows.' },
	{ name: 'Well-Traveled', description: 'You are knowledgeable of the ways of the world from your travels and studies. Once per game session, you can gain an automatic success on a non-magical roll to gain a piece of information.' },
	
	// supernatural
	{ name: 'Beast Affinity', description: 'Animals are unusually drawn to you, and though you can\'t speak with them, you can communicate with them on a limited level using tone of voice and body language. 1-point affinity is with one specific type of animal, 2-point is with one group, 3 is with all natural animals. In appropriate settings, a 4-point version extends your affinity to supernatural animals as well.' },
	{ name: 'Burning Aura', description: 'Your aura is unusually brilliant; even people who can\'t read auras will be inexplicably drawn to you. Some may see you as a threat or a snack.' },
	{ name: 'Charmed Existence', description: 'Somebody up there likes you. Ignore a single one on every roll you make.' },
	{ name: 'Danger Sense' },
	{ name: 'Fae Blood', description: 'You are kinain–kin to the Fair Folk. You have just a touch of Glamour in your system and are therefore detectable by the Kithain and more easily Enchanted. Your Banality is probably no higher than 6. Your ST may allow you to buy a Glamour pool, Fae Gifts, and perhaps even learn Cantrips. If you are interested in such things, see The Enchanted and, moreover, my house rules for suggestions and more details.' },
	{ name: 'Faerie Affinity' },
	{ name: 'Green Thumb' },
	{ name: 'Ghoul', description: 'You have been feeding regularly on Vampire Blood and therefore have 1 dot in Potence and a Blood Pool with which you may use to heal yourself, and possibly eventually learn some Disciplines. You may well be Blood Bound, and if not, you have to find a way to keep feeding on Vitae without becoming so. If you go without Vampire Blood for a month, you will lose your powers.' },
	{ name: 'Guardian Angel' },
	{ name: 'Honeyed Tongue', description: 'You\'ve sold gallons of snake oil and thousands of deeds to the Brooklyn Bridge, and most customers still think they\'re satisfied. All subterfuge attempts gain one automatic success.' },
	{ name: 'Luck' },
	{ name: 'Medium', description: 'You have the ability to see and interact with ghosts. Sometimes, the Restless may seek you out for favors. Depending on the ghosts you meet, this could be a very good or very bad thing.' },
	{ name: 'Natural Channel', description: 'You have a natural connection to the spirit world. If you are capable of doing so, the difficulty to cross the Gauntlet is -1. Spirits are also more likely to act favorably toward you.' },
	{ name: 'Precognition', description: 'You have glimpses of the future. Though you can enter a trance and try to summon a vision, this foresight usually comes out of nowhere, and can be quite shocking in some circumstances.' },
	{ name: 'Prophetic Ability', description: 'You see and understand (or try to) signs and portents sent by the Powers That Be, either through dreams or just a peculiar insight into everyday events. Your insights and visions are usually obscure, and it may take time and interpretation to get a grasp on their full indications.' },
	{ name: 'Shapechanger Kin', description: 'You are Kinfolk to one of the Changing Breeds, and are valued by them as allies (and breeding stock). You are immune to the Delirium, and depending on your standing with your cousins, may be able to learn some Gifts. For an additional 5-7 freebies, you may have 1-2 points of Gnosis. For more information, see Kinfolk: Unsung Heroes and/or other Werewolf supplements.' },
	{ name: 'Soothing Voice' },
	{ name: 'Supernatural Companion', description: 'You have a close ally (essentially one person at Allies 3) belonging to a major supernatural group other than your own. You can call upon her in times of need (as she can you). Depending on the kind of being they are, there may be negative aspects to having this friend as well as positive ones (e.g. a Werewolf having a Vampire ally...).' },
	{ name: 'Spirit Guide', description: 'A friendly Umbrood offers you advice and sometimes aid. You can combine this with the Mentor background to have the Guide be your teacher as well.' },
	{ name: 'True Faith' },
	{ name: 'True Love' },
	{ name: 'Twin Link', description: 'You share a psychic, if not spiritual, link with one person. As a 4 point merit, you get +2 to Empathy/Awareness rolls when determining how your "twin" feels. As a 6 point merit, you have a bond with the twin that\'s nearly telepathic; you always know what this person is feeling and to a limited extent, thinking. Either member can block this if they wish, though doing so requires some concentration. If you are psychic or Awakened or have an appropriate ability, you can use this ability to sense a state your twin is in (for example, with Mind or Telepathy, you WILL know exactly what the person is thinking, with Life you will know his physical condition, etc.)' },
	{ name: 'Unaging', description: 'For some reason, you never age. While this has its benefits, if you know people long enough, they\'ll start to notice you not getting any older, which may cause some suspicion. While it\'s unlikely you\'ll die of old age, this merit does not keep you from getting ill or wounded.' },
	{ name: 'Unbondable', description: 'You can\'t be Blood Bound, no matter how much Vampire Blood you drink. For obvious reasons, if you\'re creating a Ghoul character, you have to pay twice the amount for the merit.' },
	
	// social
	{ name: 'Good Old Boy/Girl', description: 'You\'re just a nice person, and people recognize and appreciate that. +1 die on social rolls when interacting with your fellow folk.' },
	{ name: 'Innocent', description: 'You have an aura of childlike innocence (whether you really are or not). -2 difficulty on rolls involving Subterfuge or Manipulation.' },
	{ name: 'Pitiable', description: 'You have an aura of child-like-ness/innocence about you, and many have the urge to pity and protect you (unless they\'re of a Nature that doesn\'t allow them that sort of thing). This can be helpful, but it may also be annoying.' },
	
	// supernatural ties
	{ name: 'Faction Favorite', description: 'Someone of a tribe/clan/tradition/whatever favor you and will do a good deal to get on your good side, possibly to bring you over to them, especially if you\'re currently disparate. Note this probably means they expect greatness of you, so don\'t disappoint them. Alter social difficulties by 2 in your favor when dealing with this faction.' },
	{ name: 'Favor', description: 'Someone of higher rank or ability than you in your supernatural society owes you a favor. Level of the Merit indicates how big the favor is.' },
	{ name: 'Reputation', description: 'You\'ve built yourself an excellent reputation amongst your kind. Add 3 dice to Social pools when dealing with the people in your sept/clan/chantry/freehold/etc.' },

	// material/mortal ties
	{ name: 'Corporate CEO', description: 'You are the head or otherwise have heavy influence in a major corporation, and have access to the social and economic benefits that implies.' },
	{ name: 'Hideaway', description: 'You have a little place somewhere nobody else knows about, fairly well-stocked. If people actively search for it, your ST will roll 2 dice at difficulty 6; at least one success indicates you have not been found. Failure gives them an idea, continual failures, at least four, will indicate that the seeker knows exactly where you live...' },
	{ name: 'Hunted', description: 'Someone is aware of, or at least suspects, your true nature and believes you need to be caught and killed (or experimented upon, or...). This person may be mortal, but they are aware of the supernatural world and are immune to the Delirium.' },
	{ name: 'Local Ties', description: 'You have influence and/or contacts in an important local institution, though the more you use these ties, the weaker they may become. Samples and their point levels include ties with the following: Park Department (1), Judicial (2), Church (2), Media (3), Corporate (3), Police (3), Political (3), and Underworld (3).' },
	{ name: 'Mansion', description: 'You own a big ass mansion, probably with some pretentious name like "Shadowcliff." You are/should be able to support upkeep, servants, etc.' },
	{ name: 'Nightclub', description: 'You own a fairly successful nightclub, which is a good place for meeting people, helping people out, and having plot-convenient fire-fights in, etc. Depending on the PC and Storyteller, some might consider this a Flaw.' },
	{ name: 'Occult Library', description: 'You own a decent collection of works on arcane lore, and if you have access to it, can lower difficulties/add dice when trying to solve an occult mystery and/or generally learn more about the occult. Having this library doesn\'t automatically mean you\'re an occult expert; it just means you have convenient access to some knowledge.' },
	
	// physical
	{ name: 'Catlike Balance', description: '-2 difficulty to rolls relating to balance.' },
	{ name: 'Double-jointed', description: '-2 difficulty on any roll involving flexibility.' },
	{ name: 'Huge Size', description: 'You may be as tall as seven feet and weigh as much as 400lbs. You have an extra Bruised Health Level.', onAdd: function(character) {
		character.stats.basics.health++;
	}	},
	{ name: 'Light Sleeper' },
	//{ name: 'Longevity' }, // would require special coding to prevent 'Aging' flaw
	{ name: 'Poison Resistance', description: 'You have an innate ability to resist the effects of many toxins. Roll Stamina to resist the effects of poison, level of difficulty 5 and up, depending on potence of the poison.' },
	
	// mage-only
	{ name: 'Avatar Companion', description: 'Your Avatar has another, lesser Avatar connected to it, usually in the body of another person. This companion will be drawn to you and may remember past incarnations and have other information useful to you and your Avatar. Unless you buy points in Allies, this companion will be of no special use except be tied to your life cycle.' },
	//{ name: 'Conditional Magic', description: 'There is a condition set to the functionality of your magical effects; they may work better or worse depending on certain circumstances, e.g. time of day, who you\'re doing the magic on, etc. Difficulties may be raised or lowered by as much as 3 according to the circumstance; the degree of the merit or flaw depends upon how rare or common the circumstance is.' },
	//{ name: 'Sphere Natural', description: 'You are really good with a particular sphere. Pay only three-quarters of the normal cost for raising a sphere level. This may be bought only once.' },
];

Character.prototype.FLAWS = [
	// psychological
	{ name: 'Black and White', description: 'You see all situations in black and white, good and evil, etc. In situations where this limited, judgmental way of thinking may hinder your reaction to something or cause you to act socially inappropriate, add a +1 difficulty to social or whatever rolls.' },
	{ name: 'Compulsion', description: 'You have a specific compulsion which may cause you problems. You have to spend a temporary Willpower point to fight the compulsion for a short time.' },
	{ name: 'Compulsive Speech', description: 'For whatever reason, you have difficulty sticking to the rule, "If you can\'t say anything nice, don\'t say it at all." 1 point makes you talkative and a bit blunt; 2 points makes you a complete prick.' },
	{ name: 'Curiosity', description: 'Your incredible curiosity often overrides your common sense. Resisting temptation requires a successful Wits roll, difficulty depending on the situation. A very bad flaw to take with certain evil sadistic Storytellers. A 3-point version in Bastet makes you obsessed with any mystery you come across, and you\'ll do anything to solve it.' },
	{ name: 'Dark Secret', description: 'There\'s something about you which you don\'t want people to know, and it would be very bad if they did (or at least you think it would be).' },
	{ name: 'Deranged', description: 'You have a permanent, severe mental disorder. You may spend Willpower to fight it at points, but you will never get rid of it. Definitely check with your ST, and possibly your fellow players, before taking this one.' },
	{ name: 'Driving Goal', description: 'You have some goal which is at the basis of all your motivations, though it is of such depth or impossibility, it could probably never be achieved. Your obsession with your vision can temporarily be soothed by spending Willpower.' },
	{ name: 'Flashbacks', description: 'When under pressure and/or in the presence of something which reminds you of something unpleasant in your past, you flashback to that past event. Whilst in a flashback, everything to you is as it was then.' },
	{ name: 'Hatred', description: 'There is something out there which you absolutely loathe, and will do anything to destroy it. You have to succeed a Willpower roll not to go after the object of your hatred, and the appropriate character types will have to make frenzy checks.' },
	{ name: 'Hero Worship', description: 'You absolutely idolize someone, and disobeying them requires an effort of will (spending Willpower or succeeding a Willpower roll at 5+ difficulty). You also are at +2 difficulty to any roll that may force you to admit/realize that your hero may be in the wrong.' },
	{ name: 'Inferiority Complex', description: 'No matter what you do, by your standards, it\'s just not good enough. In situations requiring you to take charge and strut your stuff, add +1 to all difficulties.' },
	{ name: 'Intolerance', description: 'You have difficulty tolerating a specific thing or type of person. +2 difficulty on rolls involving that thing.' },
	{ name: 'Lifesaver', description: 'You revere all life and will not risking killing someone at all costs. Unfortunately, in the World of Darkness, this can sometimes be a problem.' },
	{ name: 'Low Self-image', description: 'Suffering from a low self-esteem, you have -2 dice in situations where you don\'t expect to succeed, or you may have to make Willpower rolls to do something that requires self-confidence.' },
	{ name: 'Masochist/Sadist' },
	{ name: 'Nightmares', description: 'You\'re constantly plagued by nightmares, which at the worst may indicate there\'s something nasty in your fate, and at the least will make you cranky and irritable most of the time. A particularly bad night may cause you to lose -1 dice on all rolls for some time afterward.' },
	{ name: 'Pacifist' },
	{ name: 'Phobia' },
	{ name: 'Sensation Junkie' },
	{ name: 'Shy' },
	{ name: 'Soft-hearted', description: 'You can\'t stand to witness suffering, and if you do, difficulties are at +2 for the next hour.' },
	{ name: 'Territorial', description: 'You are extremely attached to your territory: if forced to leave your territory, you will be at +1 difficulty in most rolls because you are so disoriented. If someone passes through your territory without your permission, you will immediately attack him (make a frenzy check). Obviously this was created w/ shifters and vampires in mind, though it might be applicable to other character concepts.' },
	{ name: 'Ulterior Motive' },
	{ name: 'Vengeance' },
	
	// mental
	{ name: 'Absent-minded', description: 'You have a lousy short-term memory, and need to make a Wits roll to remember more than standard knowledge (like your name, address, etc.). You can spend Willpower as a last resort to try and remember. ' },
	{ name: 'Amnesia' },
	{ name: 'Confused', description: 'You have a lot of trouble focusing and/or making sense of the world around you. You can spend Willpower to temporarily overcome your confusion.' },
	{ name: 'Overconfident', description: 'You think you can do everything even though you probably can\'t, and you try to prove your belief as often as possible.' },
	{ name: 'Weak-willed', description: 'You can only spend Willpower when survival is at stake or it is appropriate to your Nature (Auspice, Legacy, etc.).' },
	
	// awareness
	{ name: 'Bad Sight' },
	{ name: 'Blind' },
	{ name: 'Color-blind' },
	{ name: 'Deaf' },
	{ name: 'Hard of Hearing' },
	{ name: 'One Eye' },
	
	// aptitudes
	//{ name: 'Ability Deficit', description: 'You\'re not in tune with your innate abilities, or maybe you just don\'t have any. You have 5 less points to spend on either Talents, Skills, or Knowledges, though you can still spend freebies on them. You cannot, however, have an ability in this category higher than 2 at the start of the game.' },
	{ name: 'Graceless', description: 'You always look awkward, no matter what you\'re doing. +2 difficulty to all social rolls that involve making an impression.' },
	{ name: 'Illiterate' },
	{ name: 'Speech Impediment' },
	
	// supernatural
	{ name: 'Bard\'s Tongue', description: 'What you say tends to come true; you can\'t control this prophetic ability, and the compulsion to speak an uncomfortable truth is often very hard to resist, though you may attempt to do so by spending Willpower.' },
	{ name: 'Bound', description: 'You owe some Umbrood, angel, demon, spirit, whatever, and you owe him BIG. This is a Very Bad Thing.' },
	{ name: 'Cursed', description: 'You have been cursed by someone or something. The curse is specific in nature and cannot be easily dispelled. Level of the flaw reflects how bad the curse is; a 1 point curse is annoying, a 5 point curse is likely life-threatening to you and/or to the people around you, and will at least make you and them incredibly miserable.' },
	{ name: 'Dark Fate', description: 'You are doomed to suffer a horrible demise, or otherwise have some sort of icky unpleasant fate. You are aware of this, and can kinda make you rather depressed...' },
	{ name: 'Geas', description: 'Due to an ancient or not-so-ancient pact, or oath made during initiation into something, you have a supernatural taboo placed upon you. If you break it, you may be cursed for life, or lose your powers, or something else bad will happen. A 3-point geas will unlikely affect your everyday life; a 7-point geas is one where risk of breaking must be watched constantly.' },
	{ name: 'Haunted', description: 'A wraith is plaguing your existence for some reason. Maybe you\'re its murderer, maybe you have something it wants (like a Fetter), or maybe it just doesn\'t like you. Wraiths can do all sorts of weird things to you, move things around, possess you and your friends, inhabit your dreams or your refrigerator, etc...' },
	{ name: 'Offensive to Animals', description: 'For some reason, animals fear you or just don\'t like you. Add 2 to your difficulty or subract 2 dice from rolls involving interacting with animals. Obviously, Vampires can\'t take this Flaw as they naturally have it (though they can take the 1 point Merit: Inoffensive to Animals, which reverses the effect of the curse).' },
	{ name: 'Otherworldly Taint', description: 'You have a physical peculiarity (odd hair/eye color, glowing eyes, etc.) and/or just an odd aura about you which may make you stick out. Someone who suspects you\'re not "normal" may make a Perception + Awareness roll, difficulty 7, to determine what you are. Note this isn\'t a Taint of Corruption, just an indication that you are not quite normal.' },
	{ name: 'Taint of Corruption', description: 'You are touched by the force of Corruption called the Wyrm by the Garou, and can be detected as a Wyrm creature. This makes you Werewolf bait, and particularly sucks if you are a Werewolf. You also suffer nightmares and are called by Wyrm-creatures to join its side. Get your ass cleansed if you can (this is going to take quite a quest) or else... I think there\'s a Vampire version of this which has you as Marked by Cain, and even other vamps will notice it and avoid you or hurt you... and heaven help you if a werewolf sniffs you out. (Of course, all Vamps with a Humanity below 7 read as Tainted by others...).' },
	
	// social
	{ name: 'Airhead' },
	{ name: 'Craven Image', description: 'There\'s something about you that makes you appear sniveling and "low." In appropriate situations, social difficulties are at +2.' },
	{ name: 'Disturbing Mannerism' },
	{ name: 'Enemy', description: 'Somebody\'s out to hurt you or your reputation, or even kill you (or people close to you). A 1-point enemy is less than or comparable to your own ability, a 5-point enemy could easily kick your ass into next Tuesday.' },
	{ name: 'Isolated Upbringing' },
	{ name: 'Mistaken Identity' },
	{ name: 'Mistreated Minority' },
	
	// supernatural ties
	{ name: 'Group Enmity', description: 'Some group amongst your kind, i.e. another clan/tribe/kith/tradition/whatever, doesn\'t like you and may prevent you going places you might otherwise go or may otherwise give you hell in a variety of ways.' },
	{ name: 'Inconvenient Alliance', description: 'You have an ally with someone who is discomforting to you and/or your circle, but can\'t easily get rid of him because of a favor owed, sense of guilt, or whatever. Level of flaw reflects how controversial or dangerous this ally is.' },
	{ name: 'Notoriety', description: 'You did something, or at least others think you did, that is frowned upon by your peers and elders. -2 dice to all social rolls dealing with your sept/chantry/etc.' },
	{ name: 'Probationary Member', description: 'You\'re not on the greatest terms with the group (tradition, clan, tribe, etc.) you belong to and are highly suspect of various naughtiness. You may not be privy to the normal priveleges of being part of your group, nor will you necessarily receive aid when you ought to, etc.' },
	{ name: 'Outsider', description: 'Though you\'re not exactly infamous, you have a poor reputation amongst your kind. +2 difficulty on all social rolls when interacting with your group (tradition, clan, tribe, etc.).' },
	{ name: 'Rival', description: 'Someone within your own society viciously competes against you and tries to undermine your plans; really obsessive rivals may even want you dead.' },
	{ name: 'Twisted Upbringing' },
	
	// material/mortal ties
	{ name: 'Persistent Parents' },
	{ name: 'Ward', description: 'You are devoted to protecting a "sleeping" human, perhaps a close friend or relative from your pre-supernatural days. These mortals have a knack for unknowingly getting in the middle of whatever mess you\'re involved with, or may even help create one.' },
	
	// physical
	{ name: 'Addiction', description: 'You are addicted to some substance, such as caffeine, nicotine, etc. You will start to crave the substance if you don\'t get it often enough, and have to spend Willpower points to avoid giving in to the urge. The larger the flaw, the more dependent you are on the substance, and the worse things will happen if you don\'t get what you need.' },
	{ name: 'Allergic', description: 'You suffer from an allergy to some substance; a 1 pt. version inconveniences you and may increase difficulties in certain situations, the 3 pt. version means you have an incapacitating or even a potentially fatal reaction to the substance.' },
	{ name: 'Deep Sleeper', description: 'Waking up is hard; getting you moving is hard enough (+2 difficulty to attempts to wake you), getting you comprehending what\'s going on after you\'re up isn\'t much easier (+1 difficulty to all rolls during the scene). For Vampires, this makes it even harder to stir you during the day, and you may even sleep a good deal past sunset, regardless of Humanity score.' },
	{ name: 'Deformity', description: 'You have a withered limb, hunchback, or other physical defect which causes you difficulty in movement, as well as in some social interactions. Depending on the type and circumstance, difficulties can be raised on appearance and/or dexterity rolls.' },
	//{ name: 'Diminished Attributes', description: 'Take back 3 freebies per attribute point you choose not to spend in character creation; for example, if you\'re creating Dippy the Wonder Twerp and only want two points to spend in Mental Attributes instead of three, get 3 freebies.' },
	{ name: 'Disfigured', description: 'You have an injury or physical defect which makes you perfectly hideous; Appearance trait is automatically 0.' },
	{ name: 'Lame', description: 'Your legs are somehow permanently injured, and you suffer a -2 dice penalty to movement-related rolls.' },
	{ name: 'Monstrous', description: 'You look like the very devil, maybe literally. Appearance automatically 0, and some people may take your appearance to believe you\'re connected to some horrible yucky evil thing.' },
	{ name: 'Mute', description: 'You are physically unable to speak, and must communicate through writing or sign language (or perhaps telepathy, if you are capable of the skill and are in appropriate company).' },
	{ name: 'One Arm', description: 'Due to an unfortunate injury or birth-defect, you suffer a -2 dice penalty to rolls where an action would usually require two hands.' },
	{ name: 'Paraplegic', description: 'You cannot move your legs and are confined to movement by wheelchair or similar apparatus.' },
	{ name: 'Permanent Wound', description: 'For some reason, you have a wound that never heals, which is effectively a permanent lethal health level. If you repair the damage with magic/superscience, the wound re-opens by the next day.' },
	{ name: 'Short', description: 'You are well below average height, and have difficulty reaching high objects, seeing over things, etc. -2 dice penalty to pursuit rolls. On the up side, you may get bonuses to hiding attempts.' },
	{ name: 'Sterile', description: 'You are incapable of reproducing. If you are in a society which expects you to have children (such as if you are Kinfolk), this is a flaw. You may, however, take this as a merit if you practice lots of sex magic or something in which being fertile may actually cause more problems for you than not.' },
	{ name: 'Slow Healing', description: 'For some reason, your healing processes are slow, and you heal twice as slowly as others. Supernatural healing only repairs half the damage it normally would (round down).' },
	
	// mage-only
	{ name: 'Echoes', description: 'Your supernaturalness affects the world around you; for example, if you are a "witch" (Verbena, perhaps), milk sours in your presence or you cannot walk on hallowed ground. Severity of the flaw depends on how severe–and noticeable–the echoes are.' },
	{ name: 'Phylactery', description: 'Your Avatar is trapped in a place, object, or even living being, or perhaps even a concept, and you must be in contact with this vessel in order to perform magic.' },
	{ name: 'Shattered Avatar', description: 'Your Avatar is fractured into pieces. The bad part is, you only have a fraction of your "soul," and there may be unfortunate reasons why this is the case. The good part is, if you find the other pieces of your Avatar–perhaps they\'re trapped in a phylactery or in the spirit world–your rating will grow. Unfortunately, the other piece of your Avatar may also be in a person, and you can\'t add to your own rating until that person is dead...' },
	//{ name: 'Sphere Inept', description: 'You have terrible difficulty comprehending a particular sphere; it costs 25% more than normal (rounded up) to purchase new levels in that sphere. YOU MUST PLAN ON TAKING AND BUYING UP THIS SPHERE if you want this flaw; if you take this flaw and then never put points into the sphere, you\'ve basically given yourself 5 freebie points for nothing, and no Storyteller should allow you that. You may only buy this flaw once.' },
	{ name: 'Sphere Restriction', description: 'For psychological or spiritual reasons, you cannot use a sphere effect on a particular thing, person, whatever. For example, you may only be able to use the sphere on yourself, but not on other people, or only use it on other people under certain circumstances. Level of flaw depends on restriction; using the previous example: cannot use sphere effect on other people, period: 4 pt. flaw; can use sphere on other people but only with their consent: 3 pt. flaw; can only use sphere on other person with their consent or in self-defense: 2 pt. flaw; can only use sphere on others in self-defense or beneficially, with or without consent (1 pt. flaw).' },
	{ name: 'Weirdness', description: 'One of your Spheres has an "unsettling effect" attached to it. . . perhaps you broadcast random thoughts (or randomly receive others), or something to that effect.' }
];

// make sure any cultures listed here also have lists of possible names (see Character.prototype.NAMES, below)
Character.prototype.CULTURES = [ 'american' ];

Character.prototype.NAMES = {
	american: {
		first: {
			female: [ 'Abby', 'Aileen', 'Claire', 'Erica', 'Jessica', 'Katie', 'Laura', 'Liz', 'Sandy', 'Tess' ],
			male: [ 'Ben', 'Darren', 'Finn', 'Frank', 'Jake', 'Lyle', 'Stephen', 'Zach' ]
		},
		last: [ 'Arze', 'Baker', 'Carpenter', 'Dewhurst', 'Farrow', 'Hendel', 'Lantz', 'MacKay', 'Rogers', 'Smith', 'Stanonik', 'Swanson' ]
	}
};

Character.prototype.ABILITIES = [
	'alertness', 'athletics', 'awareness', 'brawl', 'dodge',
	'expression', 'intimidation', 'leadership', 'streetwise', 'subterfuge',
	
	'crafts', 'drive', 'etiquette', 'firearms', 'meditation',
	'melee', 'performance', 'pilot', 'stealth', 'survival', 'technology',
	
	'academics', 'computer', 'cosmology', 'enigmas', 'investigation',
	'law', 'linguistics', 'medicine', 'occult', 'science', 'lore',
];

// any attributes or abilities you want specialties to be picked for, list here
Character.prototype.SPECIALTIES = {
	academics: [ 'architecture', 'history', 'literature', 'medieval studies', 'music' ],
	cosmology: [ 'deep umbra', 'gauntlet', 'nodes', 'realms', 'spirit names' ],
	linguistics: [ 'french', 'english', 'spanish', 'german', 'japanese', 'chinese', 'arabic', 'russian' ],
	science: [ 'chemistry', 'biology', 'astronomy', 'physics', 'metallurgy', 'geology', 'computer science' ],
	lore: [ 'wendigo' ]
}

Character.prototype.BACKGROUNDS = [
	'Allies', 'Alternate Identity', 'Arcane', 'Artifact', 'Avatar', 'Backup', 'Blessing',
	'Certification', 'Chantry', 'Cholé', 'Cloaking', 'Companion', 'Construct',
	'Contacts', 'Cult', 'Demesne', 'Destiny', 'Dream', 'Enhancement', 'Fame',
	'Familiar', 'Guide', 'Influence', 'Legend', 'Library', 'Mentor', 'Node',
	'Past Lives', 'Rank', 'Resources', 'Retainers', 'Sanctum', 'Spirit Allies',
	'Spirit Mentor', 'Talisman', 'Wonder'
];

// for any backgrounds you want to have a detail associated with, provide a list of possible details here
Character.prototype.BACKGROUND_DETAILS = {
	//'Allies': [ ],
	//'Contacts': [ ],
};

// these abilities will be given specialties if the character has ANY dots in them
Character.prototype.ABILITIES_REQUIRING_SPECIALTY = [
	'linguistics', 'lore'
];

Character.prototype.DEFAULT_OPTIONS = {
	'class': 'mage',
};

/**
 * @constructor
 */
function Character($element, options)
{
	// variable names can contain a $, because JS is weird. jQuery - a JS library - uses a variable named simply $ to store all its STUFF,
	// including methods, and etc. ALSO: jQuery methods happen to return lots of objects, and it is customary to store such objects in a variable
	// whose name starts with a $, to remind yourself "hey, this is an object I got from jQuery, and which I can do jQuery-y things with".

	
	
	// this gobbledygook merges the passed "options" object with the this.DEFAULT_OPTIONS object, storing the result back into "options". the
	// properties and values of "options" will take precedence. also, if "options" is not defined (because Character() was called without any
	// arguments), an empty object is used (that's the "options || {}" bit, which is more JS weirdness; sorry).
	options = $.extend({}, this.DEFAULT_OPTIONS, options || {});
	
	var _this = this; // it's useful when within methods, because JS is weird

	// these could be useful, if you want to pick one at random... ex: var randomAttribute = attributes.sample();
	var attributes = [ 'strength', 'dexterity', 'stamina', 'charisma', 'manipulation', 'appearance', 'perception', 'intelligence', 'wits' ];
	var spheres = [ 'correspondence', 'entropy', 'forces', 'life', 'matter', 'mind', 'prime', 'spirit', 'time' ];
	
	this.stats = {
		// I'm keeping all scalar values in "basics"
		basics: {
			sex: "",
			age: 0,
			name: "",
			tradition: "",
			nature: "",
			demeanor: "",
			essence: "",
		
			arete: 1,
			willpower: 5,
			health: 7,
		},
		
		attributes: {
			strength: { value: 1, specialty: "" },
			dexterity: { value: 1, specialty: "" },
			stamina: { value: 1, specialty: "" },
			charisma: { value: 1, specialty: "" },
			manipulation: { value: 1, specialty: "" },
			appearance: { value: 1, specialty: "" },
			perception: { value: 1, specialty: "" },
			intelligence: { value: 1, specialty: "" },
			wits: { value: 1, specialty: "" },
		},

		abilities: { }, // add these dynamically, in code (see examples below)
		
		spheres: {
			correspondence: { value: 0, focus: "" },
			entropy: { value: 0, focus: "" },
			forces: { value: 0, focus: "" },
			life: { value: 0, focus: "" },
			matter: { value: 0, focus: "" },
			mind: { value: 0, focus: "" },
			prime: { value: 0, focus: "" },
			spirit: { value: 0, focus: "" },
			time: { value: 0, focus: "" },
		},

		backgrounds: [ ], // ex: [ { name: 'Allies', value: 5, detail: "the vampire king" }, { name: 'Library', value: 3 } ]
		merits: [], // a list of merits, from this.MERITS
		flaws: [], // a list of flaws, from this.FLAWS
		
		// anything else you want to add?
	};

	// if Character is called with options containing a stats property, those stats are merged into the default stats
	this.stats = $.extend({}, this.stats, options.stats || {});
	
	var generateCharacter = function()
	{
		/** @TODO: ACTUALLY generate the character */

		/*
			how to work with objects and arrays and things in JS - A TUTORIAL, I GUESS
			
			// messing with attributes and abilities:
			this.stats.attributes.strength.value += 2;
			
			// here's a clever way to just make up an array on the fly, and pick a single random element from it:
			if(this.stats.strength.value >= 4)
				this.stats.strength.speciality = ["jumping", "looking super-ripped", "fists like anvils"].sample();
				
			// if you've got the property name in a variable, you'll need to access it in a different way:
			var attribute = ['strength', 'stamina', 'dexterity'].sample(); // pick a random property name. (sample is real useful. remember it.)
			this.stats[property].value++;

			// .add() adds an item to an array; .remove() removes it
			this.stats.merits.add("Cat-like Reflexes");
			
			// .any() checks to see if an item is in an array.
			if(this.stats.merits.any("Cat-like Reflexes"))
			{
				// Cat-like Reflexes is an item in the array!
			}
		
			// seems like this should work, BUT: if "library" does not already exist as a property, JS will whine (oh, loosely-typed languages...)
			this.stats.backgrounds.library.value++;
			
			// this always works, though. assignment creates the property if it doesn't already exist:
			this.stats.backgrounds.library = { value: 1 };
		
			// .hasOwnProperty() checks to see if a property exists on an object (OH, LOOSELY-TYPED LANGUAGES...)
			if(this.stats.backgrounds.hasOwnProperty('library'))
			{
				// the character has a library of some value!
			}
			
			// so, if we wanted to add 1 point to "library", without knowing whether or not the character already has it...
			if(this.stats.backgrounds.hasOwnProperty('library'))
				this.stats.backgrounds.library.value++;
			else
				this.stats.backgrounds.library = { value: 1 };
			
			// that seems troublesome, though, so I've added a method to help us out:
			this.changeBackground('library', 1); // adds 1
			this.changeBackground('library', -2); // subtracts 2
			
			// I added a similar method for abilities:
			this.changeAbility('melee', 1);
			
			// note: you also can't do a comparison on a non-existent property, so you have to check for existence first:
			if(this.stats.backgrounds.hasOwnProperty('library') && this.stats.backgrounds.library.value > 2)
			{
				// the character has at LEAST a 3-point library
			}
			
			// again, that seems troublesome, so I've made us a method:
			if(this.backgroundValue('library') > 2)
			{
				// easier!
			}
			
			// to remove a property from an object entirely (setting it to 0 is technically fine, but it'll make checking for a background's existence harder)
			delete this.stats.backgrounds.library;
			
			// note: backgrounds are stored as property=>value pairs on an object, and property names have the same restrictions as variable names...
			// like no spaces! use underscores instead. our code is smart and replaces underscores with spaces when rendering the character.
			this.stats.backgrounds.background_with_space_in_it = { value: 2, detail: "only useful when eating spaghetti" };
			
			// finally, remember the "options" that are passed in?!
			if(options.class == 'mage')
			{
				// set stuff up appropriate for generating a mage
				this.stats.willpower = 5;
				this.stats.arete = 1;
				
				// (I actually set up stats assuming we're generating a mage, so this example code is totally unnecessary, but you get the idea...)
			}
			
			// and of course, feel free to add more methods, below!
		*/
		
		// example character generation:
		var i; // you can't declare a var inside a for loop; in JS, loops don't create a new scope
		
		// some feminist part of me questions the need for a sex attribute :P
		_this.stats.basics.sex = [ 'male', 'female' ].sample();
			
		// this probably looks really weird :P I will explain: we're defining a function, and then immediately calling it, passing
		// a random number. so Math.random() * 135 gets passed in as x, and we're assigning the return value to age.
		// I got this function by playing around with a graphing calculator. check out its graph to see; the majority of "x" values
		// land on 25; 0 lands on 9; 135 lands on, like, 102, or something.
		_this.stats.basics.age = Math.floor(
			(function(x) { return Math.pow((x - 50) / 20, 3) + 25; })(Math.random() * 135)
		);
		
		// give 'child' to characters under 16
		if(_this.stats.basics.age < 16)
		{
			_this.stats.flaws.add({ name: 'Child' });
			
			// a goodish chance to give 'short' to children
			if(Math.random() * 10 > _this.stats.basics.age - 10)
				_this.stats.flaws.add({ name: 'Short' });
		}
			
		// pick a random culture; used, along with sex, for picking a name
		var culture = _this.CULTURES.sample();

		_this.stats.basics.name = _this.NAMES[culture].first[_this.stats.basics.sex].sample() + ' ' + _this.NAMES[culture].last.sample();

		if(options.class == 'mage')
		{
			// pick a random tradition
			_this.stats.basics.tradition = _this.TRADITIONS.sample();

			_this.generateAttributes(7, 5, 3);
			_this.generateAbilities(27);
			_this.generateArete();
			
			if(_this.stats.basics.arete > 3)
				_this.generateSpheres(7 + Math.floor(Math.random() * 3) + Math.floor(Math.random() * 6));
			else
				_this.generateSpheres(6 + Math.floor(Math.random() * 3));
			
			_this.stats.basics.willpower = 5;
			_this.generateWillpower(5, 25); // add up to 5 more points, with a 25% chance for each point
			
			_this.generateMeritsAndFlaws(1, 4);
			
			_this.changeBackground('Avatar', 1); // all mages get Avatar +1
			_this.generateBackgrounds(7 + Math.floor(Math.random() * 3));
		}

		// a goodish chance to add 'aging' to characters 50+ years old
		if(_this.stats.basics.age >= 50)
		{
			for(i = _this.stats.basics.age; i >= 50; i -= 10)
			{
				if(Math.random() <= 0.3)
				{
					if(_this.decreaseRandomAttributes(['strength','dexterity','stamina'], 1) == 1)
						_this.stats.flaws.add({ name: 'Aging' });
					else
						break;
				}
			}
		}
		
	}; // end of generateCharacter method

	this.generateBackgrounds = function(points)
	{
		if(_this.stats.basics.tradition == 'Ahl-i-Batin')
		{
			_this.changeBackground('Arcane', 1);
		}
		
		var background;
		var backgroundsLessThan5 = [];
		
		console.log(_this.stats.backgrounds);
		
		$.each(_this.stats.backgrounds, function(i, background) {
			if(background.value < 5)
				backgroundsLessThan5.add(background.name);
		});
		
		while(points > 0)
		{
			if(backgroundsLessThan5.length > 0 && Math.random() * 100 < _this.CHANCE_TO_REPEAT_BACKGROUNDS)
			{
				background = backgroundsLessThan5.sample();
				
				// dodge 4-value backgrounds, and any "avatar" re-picks, up to once
				if(_this.stats.backgrounds[_this.getBackgroundByName(background)].value == 4 || _this.stats.backgrounds[_this.getBackgroundByName(background)].name == 'Avatar') background = backgroundsLessThan5.sample();
			}
			else
			{
				// pick a random background from the list that we don't already have a point in
				do
				{
					background = _this.BACKGROUNDS.sample();
				} while(_this.getBackgroundByName(background) >= 0);
				
				backgroundsLessThan5.add(background);
			}
				
			if(_this.changeBackground(background, 1) == 5)
				backgroundsLessThan5.remove(background);
			
			points--;
		}
	};
	
	/**
	 * Adds "points" dots to the background named "name"
	 * @return New value of background
	 */
	this.changeBackground = function(name, points)
	{
		var backgroundIndex = this.getBackgroundByName(name);
		
		if(backgroundIndex >= 0)
		{
			_this.stats.backgrounds[backgroundIndex].value += points;
			
			if(_this.stats.backgrounds[backgroundIndex].value > 5) _this.stats.backgrounds[backgroundIndex].value = 5;
			
			return _this.stats.backgrounds[backgroundIndex].value;
		}
		else
		{
			var detail = _this.BACKGROUND_DETAILS.hasOwnProperty(name) ? _this.BACKGROUND_DETAILS[name].sample() : '';
			
			_this.stats.backgrounds.add({ name: name, value: points, detail: detail });
			
			return points;
		}
	};
	
	this.getBackgroundByName = function(name)
	{
		return _this.stats.backgrounds.findIndex(function(item) {
			return item.name == name;
		});
	};
	
	/**
	 * Removes "points" dots randomly from among "possibleAttributes"
	 * @return the number of points that were successfully removed
	 */
	this.decreaseRandomAttributes = function(possibleAttributes, points)
	{
		var originalPoints = points;
		var attribute;
	
		while(points > 0 && possibleAttributes.length > 0)
		{
			attribute = possibleAttributes.sample();
			
			if(_this.stats.attributes[attribute].value > 1)
			{
				_this.stats.attributes[attribute].value--;
				points--;
			}
			else
				possibleAttributes.remove(attribute);
		}
		
		return originalPoints - points;
	};
	
	this.generateMeritsAndFlaws = function(min, max)
	{
		var total = Math.floor(Math.random() * (max - min + 1)) + min;
		var i, meritOrFlaw;
		
		for(i = 0; i < total; i++)
		{
			if(Math.random() < 0.5)
			{
				meritOrFlaw = _this.MERITS.sample();

				if(!_this.stats.merits.any(meritOrFlaw))
				{
					_this.stats.merits.add(meritOrFlaw);
					
					if(meritOrFlaw.hasOwnProperty('onAdd')) meritOrFlaw.onAdd(_this);
				}
			}
			else
			{
				meritOrFlaw = _this.FLAWS.sample();

				if(!_this.stats.flaws.any(meritOrFlaw))
				{
					_this.stats.flaws.add(meritOrFlaw);
					
					if(meritOrFlaw.hasOwnProperty('onAdd')) meritOrFlaw.onAdd(_this);
				}
			}
		}
	};
	
	this.generateArete = function()
	{
		var r = Math.floor(Math.random() * 100);
		
		if(r < 5)
			_this.stats.basics.arete = 1;
		else if(r < 20)
			_this.stats.basics.arete = 2;
		else if(r >= 95 && _this.ALLOW_ARCHMAGES)
			_this.stats.basics.arete = 5;
		else if(r >= 85 && _this.ALLOW_ARCHMAGES)
			_this.stats.basics.arete = 6;
		else
			_this.stats.basics.arete = 3;
	};
	
	this.generateSpheres = function(points)
	{
		if(_this.addSphereForFaction())
			points--;
		
		var spheresAvailable = _this.SPHERES.slice(0);
		var sphere;

		// while we have points to assign, and spheres we can assign to
		while(points > 0 && spheresAvailable.length > 0)
		{
			sphere = spheresAvailable.sample();
			
			// if the sphere has no points, OR we pass a CHANCE_TO_REPEAT_SPHERES check, we can put a point into this sphere
			if(_this.stats.spheres[sphere].value == 0 || Math.random() * 100 < _this.CHANCE_TO_REPEAT_SPHERES)
			{
				_this.stats.spheres[sphere].value++;
				points--;
				
				// if we increase a sphere's value to the character's arete, remove the sphere from those available to give points to in the future
				if(_this.stats.spheres[sphere].value == _this.stats.basics.arete)
					spheresAvailable.remove(sphere);
			}
		}
	};
	
	this.addSphereForFaction = function()
	{
		switch(_this.stats.basics.tradition)
		{
			case 'Virtual Adepts':
			case 'Ahl-i-Batin':
				_this.stats.spheres.correspondence.value++;
				return true;
			
			case 'Euthanatos':
				_this.stats.spheres.entropy.value++;
				return true;
				
			case 'Order of Hermes':
			case 'Taftani':
				_this.stats.spheres.forces.value++;
				return true;
			
			case 'Verbena':
			case 'Progenitors':
				_this.stats.spheres.life.value++;
				return true;
			
			case 'Sons of Ether':
				_this.stats.spheres.matter.value++;
				return true;
			
			case 'Akashic Brotherhood':
				_this.stats.spheres.mind.value++;
				return true;
				
			case 'Celestial Chorus':
				_this.stats.spheres.prime.value++;
				return true;
			
			case 'Dreamspeakers':
				_this.stats.spheres.spirit.value++;
				return true;
				
			case 'Cult of Ecstasy':
				_this.stats.spheres.time.value++;
				return true;
				
			default:
				return false;
		}
	};
	
	this.generateWillpower = function(max, chancePerIncrease)
	{
		for(var i = 0; i < max; i++)
		{
			if(Math.random() * 100 < chancePerIncrease)
				_this.stats.basics.willpower++;
		}
	}
	
	/**
	 * called by generateCharacter; should only be called once!
	 */
	this.generateAttributes = function(primary, secondary, tertiary)
	{
		// okay, so sample(3) picks 3 random items from the array... this array has 3 elements... so basically we're picking all 3, but in a random order!
		var attributePreferences = [['strength', 'stamina', 'dexterity'], ['charisma', 'manipulation', 'appearance'], ['intelligence', 'perception', 'wits']].sample(3);
		
		_this.assignAttributePoints(attributePreferences[0], primary);
		_this.assignAttributePoints(attributePreferences[1], secondary);
		_this.assignAttributePoints(attributePreferences[2], tertiary);
	};
	
	this.assignAttributePoints = function(possibleAttributes, points)
	{
		var attribute;
	
		// while we have points left to assign, and attributes left we can assign to
		while(points > 0 && possibleAttributes.length > 0)
		{
			// pick a random attribute
			attribute = possibleAttributes.sample();
			
			// pick again if the chosen attribute is 4; if we happen to pick the same thing again, that's fine
			if(_this.stats.attributes[attribute].value == 4) attribute = possibleAttributes.sample();
			
			// increase the selected attribute by 1
			_this.stats.attributes[attribute].value++;
			points--;
			
			// when we hit 4, assign a specialty (if we have specialties for this attribute)
			if(_this.stats.attributes[attribute].value == 4 && _this.SPECIALTIES.hasOwnProperty(attribute))
			{
				_this.stats.attributes[attribute].specialty = _this.SPECIALTIES[attribute].sample();
			}
			// when we hit 5, remove the current attribute from the list of attributes we can increase
			else if(_this.stats.attributes[attribute].value == 5)
			{
				possibleAttributes.remove(attribute);
			}
		}
	};
	
	this.generateAbilities = function(num)
	{
		var existingAbilitiesLessThan5 = [];
		var ability;
	
		for(i = 0; i < num; i++)
		{
			if(Math.random() * 100 < _this.CHANCE_TO_REPEAT_ABILITIES && existingAbilitiesLessThan5.length > 0)
			{
				// pick a random ability to increase
				ability = existingAbilitiesLessThan5.sample();
				
				// if we picked an ability whose value is 4, pick a new ability (we may pick another ability of value 4, or even the same one, and that's fine)
				if(_this.stats.abilities[ability].value == 4) ability = existingAbilitiesLessThan5.sample();
			}
			else
			{
				ability = _this.pickNewAbility();
				existingAbilitiesLessThan5.add(ability);
			}

			_this.changeAbility(ability, 1);
			
			if(_this.stats.abilities[ability].value == 5)
				existingAbilitiesLessThan5.remove(ability);
		}
	};
	
	this.pickNewAbility = function()
	{
		// @TODO pick an ability the character does not already have, and which they are eligible to learn
		
		// super-basic code that doesn't do any checks
		
		// 1: make a copy of the ABILITIES array. using array.slice(0) is a hacky way to do this.
		var unknownAbilities = _this.ABILITIES.slice(0);
		
		// 2: iterate over all of the character's current abilities, removing each from the list of all abilities
		$.each(_this.stats.abilities, function(ability) {
			unknownAbilities.remove(ability);
		});
		
		// 3: "unknownAbilities" now lives up to its name; return one, at random
		return unknownAbilities.sample();
	};
	
	/*
	 * adds "amount" to the specified "ability", creating it if it does not already exist
	 */
	this.changeAbility = function(ability, amount)
	{
		if(_this.stats.abilities.hasOwnProperty(ability))
			_this.stats.abilities[ability].value += amount;
		else
			_this.stats.abilities[ability] = { value: amount, speciality: "" };

		// don't allow value to go above 5 or below 0
		if(_this.stats.abilities[ability].value > 5) _this.stats.abilities[ability].value = 5;
		else if(_this.stats.abilities[ability].value < 0) _this.stats.abilities[ability].value = 0;
			
			
		if(_this.stats.abilities[ability].value >= 4 || _this.ABILITIES_REQUIRING_SPECIALTY.any(ability))
		{
			// if the ability's value is 4+, and there are specialties available for this ability, and we haven't picked one already... pick one!
			if(_this.SPECIALTIES.hasOwnProperty(ability) && (!_this.stats.abilities[ability].hasOwnProperty('specialty') || _this.stats.abilities[ability].speciality == ''))
				_this.stats.abilities[ability].specialty = _this.SPECIALTIES[ability].sample();
		}
		else if(_this.stats.abilities[ability].value < 4)
		{
			// if the ability's value is <4, and there IS a specialty, remove that specialty
			if(_this.stats.abilities[ability].hasOwnProperty('specialty') && _this.stats.abilities[ability].speciality != '')
				_this.stats.abilities[ability].specialty = '';
		}
	};
	
	/**
	 * @return the ability's value, or 0 if it does not exist
	 */
	this.abilityValue = function(ability)
	{
		return _this.stats.abilities.hasOwnProperty(ability) ? this.stats.abilities[ability].value : 0;
	};
	
	/**
	 * @return the background's value, or 0 if it does not exist
	 */
	this.backgroundValue = function(background)
	{
		return _this.stats.backgrounds.hasOwnProperty(background) ? this.stats.backgrounds[background].value : 0;
	};
	
	/**
	 * renders the character in HTML, to the $element provided
	 */
	this.render = function()
	{
		$.each(_this.stats.basics, function(stat, value) {
			if(stat == 'arete' || stat == 'willpower' || stat == 'health')
				$element.find('[data-property="' + stat + '"]').html(_this.renderDots(value, 10));
			else
				$element.find('[data-property="' + stat + '"]').html(value);
		});

		// render attributes, abilities, and spheres
		_this.renderScoresWithDots(_this.stats.attributes, 'specialty');
		_this.renderAbilities();
		_this.renderScoresWithDots(_this.stats.spheres, 'focus');
		
		// render merits and flaws
		$element.find('[data-property="merits-and-flaws"]').empty();
		
		$.each(_this.stats.merits, function(i, merit) {
			if(merit.hasOwnProperty('description') && merit.description != '')
			{
				var $a = $('<a/>');
				$a.attr('href', '').attr('data-popover', 'Merit: ' + merit.description).html(merit.name.titleize());
				$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append($a));
			}
			else
				$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append(merit.name.titleize()));
		});
		
		$.each(_this.stats.flaws, function(i, flaw) {
			if(flaw.hasOwnProperty('description') && flaw.description != '')
			{
				var $a = $('<a/>');
				$a.attr('href', '').attr('data-popover', 'Flaw: ' + flaw.description).html(flaw.name.titleize());
				$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append($a));
			}
			else
				$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append(flaw.name.titleize()));
		});
		
		// render backgrounds
		$element.find('[data-property="backgrounds"]').empty();
		
		$.each(_this.stats.backgrounds, function(i, background) {
			$element.find('[data-property="backgrounds"]').append($('<dt/>').append(background.name));
			$element.find('[data-property="backgrounds"]').append($('<dd/>').append(_this.renderDots(background.value, 5)));
		});
	};
	
	this.renderAbilities = function()
	{
		var abilityKeys = Object.keys(_this.stats.abilities);
		var abilitiesPerColumn = Math.ceil(abilityKeys.length / 3);
	
		var $abilitiesSection = $('[data-property="abilities"]');
		
		var columns = [
			"", "", ""
		];
	
		var count = 0;
		$.each(_this.ABILITIES, function(i, stat) {
			if(_this.stats.abilities.hasOwnProperty(stat))
			{
				var details = _this.stats.abilities[stat];
				var text = _this.renderDots(details.value, 5);

				if(details.hasOwnProperty('specialty') && details.specialty != '')
					columns[Math.floor(count / abilitiesPerColumn)] += '<dt>' + stat.titleize() + ' <span class="specialty">(' + details.specialty + ')</span></dt><dd>' + text + '</dd>';
				else
					columns[Math.floor(count / abilitiesPerColumn)] += '<dt>' + stat.titleize() + '</dt><dd>' + text + '</dd>';
				
				count++;
			}
		});
		
		$abilitiesSection.html(
			'<div class="col span_1_of_3"><dl>' + columns[0] + '</dl></div>' +
			'<div class="col span_1_of_3"><dl>' + columns[1] + '</dl></div>' +
			'<div class="col span_1_of_3"><dl>' + columns[2] + '</dl></div>'
		);
	}; // renderAbilities
	
	this.renderScoresWithDots = function(scores, detailProperty)
	{
		$.each(Object.keys(scores), function(i, stat) {
			var details = scores[stat];
			var text = _this.renderDots(details.value, 5);
		
			if(details.hasOwnProperty(detailProperty) && details[detailProperty] != '')
				$element.find('[data-property="' + stat + '-' + detailProperty + '"]').html('(' + details[detailProperty] + ')');
			else
				$element.find('[data-property="' + stat + '-' + detailProperty + '"]').empty();
			
			$element.find('[data-property="' + stat + '"]').html(text);
		});
	};
	
	/**
	 * @return a string containing "value" solid dots, and "max - value" empty dots (using unicode characters 25CF and 25CB respectively)
	 */
	this.renderDots = function(value, max)
	{
		return '<span title="' + value + '">' + "\u25cf".repeat(value) + "\u25cb".repeat(max - value) + '</span>';
	};
	
	generateCharacter();
} // Character
