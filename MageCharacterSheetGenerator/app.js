var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CharacterSheet = (function () {
    function CharacterSheet($element, options) {
        this.$element = $element;
        this.options = $.extend({}, this.getDefaultOptions(), options || {});
        // if no random seed was given, create one
        if (this.options.hasOwnProperty('rngSeed'))
            Math.seedrandom(atob(this.options.rngSeed));
        else
            this.options.rngSeed = btoa(Math.seedrandom());
        this.stats = {
            // I'm keeping all scalar values in "basics", apparently
            basics: {
                sex: "",
                age: 0,
                name: "",
                personality: "",
                nature: "",
                demeanor: "",
                essence: "",
                willpower: 3,
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
            abilities: {},
            backgrounds: [],
            merits: [],
            flaws: [],
        };
        // if Character is called with options containing a stats property, those stats are merged into the default stats
        this.stats = $.extend({}, this.stats, this.options.stats || {});
        this.stats.basics.sex = ['male', 'female'].sample();
        this.stats.basics.age = Math.floor(Math.random() * 25 + 16);
        // pick a random culture; used, along with sex, for picking a name
        var culture = CharacterSheet.CULTURES.sample();
        this.stats.basics.name = CharacterSheet.NAMES[culture][this.stats.basics.sex].sample();
        this.stats.basics.personality = CharacterSheet.PERSONALITYTRAITS.sample();
        if (Math.random() * 100 > 20)
            this.stats.basics.personality += '   ' + CharacterSheet.PERSONALITYTRAITS.sample();
        if (Math.random() * 100 > 20)
            this.stats.basics.personality += '   ' + CharacterSheet.PERSONALITYTRAITS.sample();
        var ageModifierRng = Math.random() * 100;
        if (ageModifierRng < this.options.chanceOfChild)
            this.addMerit(CharacterSheet.MERITS.find(function (m) { return m.name == 'Child'; }));
        else if (ageModifierRng < this.options.chanceOfChild + this.options.chanceOfAging)
            this.addMerit(CharacterSheet.FLAWS.find(function (f) { return f.name == 'Aging'; }));
    }
    CharacterSheet.prototype.getDefaultOptions = function () {
        return {
            chanceToRepeatAbilities: 50,
            chanceToRepeatBackgrounds: 50,
            chanceOfChild: 10,
            chanceOfAging: 10 // 100 - chanceOfChild - chanceOfAging = chance of not forcing an age-related merit/flaw
        };
    };
    CharacterSheet.prototype.generateBackgrounds = function (points) {
        if (this.stats.basics.tradition == 'Ahl-i-Batin') {
            this.changeBackground('Arcane', 1);
        }
        var background;
        var backgroundsLessThan5 = [];
        $.each(this.stats.backgrounds, function (i, background) {
            if (background.value < 5)
                backgroundsLessThan5.add(background.name);
        });
        while (points > 0) {
            if (backgroundsLessThan5.length > 0 && Math.random() * 100 < this.options.chanceToRepeatBackgrounds) {
                background = backgroundsLessThan5.sample();
                // dodge 4-value backgrounds, and any "avatar" re-picks, up to once
                if (this.stats.backgrounds[this.getBackgroundByName(background)].value == 4 || this.stats.backgrounds[this.getBackgroundByName(background)].name == 'Avatar')
                    background = backgroundsLessThan5.sample();
            }
            else {
                // pick a random background from the list that we don't already have a point in
                do {
                    background = CharacterSheet.BACKGROUNDS.sample();
                } while (this.getBackgroundByName(background) >= 0);
                backgroundsLessThan5.add(background);
            }
            if (this.changeBackground(background, 1) == 5)
                backgroundsLessThan5.remove(background);
            points--;
        }
    };
    ;
    /**
     * Adds "points" dots to the background named "name"
     * @return New value of background
     */
    CharacterSheet.prototype.changeBackground = function (name, points) {
        var backgroundIndex = this.getBackgroundByName(name);
        if (backgroundIndex >= 0) {
            this.stats.backgrounds[backgroundIndex].value += points;
            if (this.stats.backgrounds[backgroundIndex].value > 5)
                this.stats.backgrounds[backgroundIndex].value = 5;
            return this.stats.backgrounds[backgroundIndex].value;
        }
        else {
            var detail = CharacterSheet.BACKGROUND_DETAILS.hasOwnProperty(name) ? CharacterSheet.BACKGROUND_DETAILS[name].sample() : '';
            this.stats.backgrounds.add({ name: name, value: points, detail: detail });
            return points;
        }
    };
    CharacterSheet.prototype.getBackgroundByName = function (name) {
        return this.stats.backgrounds.findIndex(function (item) {
            return item.name == name;
        });
    };
    ;
    /**
     * Removes "points" dots randomly from among "possibleAttributes"
     * @return the number of points that were successfully removed
     */
    CharacterSheet.prototype.decreaseRandomAttributes = function (possibleAttributes, points) {
        var originalPoints = points;
        var attribute;
        while (points > 0 && possibleAttributes.length > 0) {
            attribute = possibleAttributes.sample();
            if (this.stats.attributes[attribute].value > 1) {
                this.stats.attributes[attribute].value--;
                points--;
            }
            else
                possibleAttributes.remove(attribute);
        }
        return originalPoints - points;
    };
    ;
    CharacterSheet.prototype.generateMeritsAndFlaws = function (min, max) {
        var total = Math.floor(Math.random() * (max - min + 1)) + min;
        var i;
        for (i = 0; i < total; i++) {
            if (Math.random() < 0.5)
                this.addMerit(CharacterSheet.MERITS.sample());
            else
                this.addFlaw(CharacterSheet.FLAWS.sample());
        }
    };
    ;
    CharacterSheet.prototype.addMerit = function (merit) {
        if (!this.stats.merits.any(function (m) { return m.name == merit.name; })) {
            if (!merit.hasOwnProperty('mayAdd') || merit.mayAdd(this)) {
                this.stats.merits.add(merit);
                if (merit.hasOwnProperty('onAdd'))
                    merit.onAdd(this);
            }
        }
    };
    ;
    CharacterSheet.prototype.addFlaw = function (flaw) {
        if (!this.stats.flaws.any(function (f) { return f.name == flaw.name; })) {
            if (!flaw.hasOwnProperty('mayAdd') || flaw.mayAdd(this)) {
                this.stats.flaws.add(flaw);
                if (flaw.hasOwnProperty('onAdd'))
                    flaw.onAdd(this);
            }
        }
    };
    ;
    CharacterSheet.prototype.hasMeritOrFlaw = function (meritOrFlawName) {
        return this.stats.merits.any(function (m) { return m.name == meritOrFlawName; }) || this.stats.flaws.any(function (f) { return f.name == meritOrFlawName; });
    };
    ;
    CharacterSheet.prototype.generateWillpower = function (max, chancePerIncrease) {
        for (var i = 0; i < max; i++) {
            if (Math.random() * 100 < chancePerIncrease)
                this.stats.basics.willpower++;
        }
    };
    /**
     * called by generateCharacter; should only be called once!
     */
    CharacterSheet.prototype.generateAttributes = function (primary, secondary, tertiary) {
        // okay, so sample(3) picks 3 random items from the array... this array has 3 elements... so basically we're picking all 3, but in a random order!
        var attributePreferences = [['strength', 'stamina', 'dexterity'], ['charisma', 'manipulation', 'appearance'], ['intelligence', 'perception', 'wits']].sample(3);
        this.assignAttributePoints(attributePreferences[0], primary);
        this.assignAttributePoints(attributePreferences[1], secondary);
        this.assignAttributePoints(attributePreferences[2], tertiary);
    };
    ;
    CharacterSheet.prototype.assignAttributePoints = function (possibleAttributes, points) {
        var attribute;
        // while we have points left to assign, and attributes left we can assign to
        while (points > 0 && possibleAttributes.length > 0) {
            // pick a random attribute
            attribute = possibleAttributes.sample();
            // pick again if the chosen attribute is 4; if we happen to pick the same thing again, that's fine
            if (this.stats.attributes[attribute].value == 4)
                attribute = possibleAttributes.sample();
            // increase the selected attribute by 1
            this.stats.attributes[attribute].value++;
            points--;
            // when we hit 4, assign a specialty (if we have specialties for this attribute)
            if (this.stats.attributes[attribute].value == 4 && CharacterSheet.SPECIALTIES.hasOwnProperty(attribute)) {
                this.stats.attributes[attribute].specialty = CharacterSheet.SPECIALTIES[attribute].sample();
            }
            else if (this.stats.attributes[attribute].value == 5) {
                possibleAttributes.remove(attribute);
            }
        }
    };
    ;
    CharacterSheet.prototype.generateAbilities = function (num) {
        var existingAbilitiesLessThan5 = [];
        var ability, i;
        for (i = 0; i < num; i++) {
            if (Math.random() * 100 < this.options.chanceToRepeatAbilities && existingAbilitiesLessThan5.length > 0) {
                // pick a random ability to increase
                ability = existingAbilitiesLessThan5.sample();
                // if we picked an ability whose value is 3 or more, there's a good chance we abandon it and go find another
                if (this.stats.abilities[ability].value >= 3 && Math.random() * 100 < 4) {
                    i--;
                    continue;
                }
            }
            else {
                ability = this.pickNewAbility();
                existingAbilitiesLessThan5.add(ability);
            }
            this.changeAbility(ability, 1);
            if (this.stats.abilities[ability].value == 5)
                existingAbilitiesLessThan5.remove(ability);
        }
    };
    ;
    CharacterSheet.prototype.pickNewAbility = function () {
        // @TODO pick an ability the character does not already have, and which they are eligible to learn
        // super-basic code that doesn't do any checks
        // 1: make a copy of the ABILITIES array. using array.slice(0) is a hacky way to do this.
        var unknownAbilities = CharacterSheet.ABILITIES.slice(0);
        // 2: iterate over all of the character's current abilities, removing each from the list of all abilities
        $.each(this.stats.abilities, function (ability) {
            unknownAbilities.remove(ability);
        });
        // 3: "unknownAbilities" now lives up to its name; return one, at random
        return unknownAbilities.sample();
    };
    ;
    /*
     * adds "amount" to the specified "ability", creating it if it does not already exist
     */
    CharacterSheet.prototype.changeAbility = function (ability, amount) {
        if (this.stats.abilities.hasOwnProperty(ability))
            this.stats.abilities[ability].value += amount;
        else
            this.stats.abilities[ability] = { value: amount, speciality: "" };
        // don't allow value to go above 5 or below 0
        if (this.stats.abilities[ability].value > 5)
            this.stats.abilities[ability].value = 5;
        else if (this.stats.abilities[ability].value < 0)
            this.stats.abilities[ability].value = 0;
        if (this.stats.abilities[ability].value >= 4 || CharacterSheet.ABILITIES_REQUIRING_SPECIALTY.any(ability)) {
            // if the ability's value is 4+, and there are specialties available for this ability, and we haven't picked one already... pick one!
            if (CharacterSheet.SPECIALTIES.hasOwnProperty(ability) && (!this.stats.abilities[ability].hasOwnProperty('specialty') || this.stats.abilities[ability].speciality == ''))
                this.stats.abilities[ability].specialty = CharacterSheet.SPECIALTIES[ability].sample();
        }
        else if (this.stats.abilities[ability].value < 4) {
            // if the ability's value is <4, and there IS a specialty, remove that specialty
            if (this.stats.abilities[ability].hasOwnProperty('specialty') && this.stats.abilities[ability].speciality != '')
                this.stats.abilities[ability].specialty = '';
        }
    };
    ;
    /**
     * @return the ability's value, or 0 if it does not exist
     */
    CharacterSheet.prototype.abilityValue = function (ability) {
        return this.stats.abilities.hasOwnProperty(ability) ? this.stats.abilities[ability].value : 0;
    };
    ;
    /**
     * @return the background's value, or 0 if it does not exist
     */
    CharacterSheet.prototype.backgroundValue = function (background) {
        return this.stats.backgrounds.hasOwnProperty(background) ? this.stats.backgrounds[background].value : 0;
    };
    ;
    /**
     * renders the character in HTML, to the $element provided
     */
    CharacterSheet.prototype.render = function () {
        var _this = this;
        $.each(this.stats.basics, function (stat, value) {
            if (stat == 'arete' || stat == 'willpower' || stat == 'health')
                _this.$element.find('[data-property="' + stat + '"]').html(_this.renderDots(value, 10));
            else
                _this.$element.find('[data-property="' + stat + '"]').html(value);
        });
        // render attributes, abilities, and spheres
        this.renderScoresWithDots(this.stats.attributes, 'specialty');
        this.renderAbilities();
        this.renderScoresWithDots(this.stats.spheres, 'focus');
        // render merits and flaws
        this.$element.find('[data-property="merits-and-flaws"]').empty();
        $.each(this.stats.merits, function (i, merit) {
            if (merit.hasOwnProperty('description') && merit.description != '') {
                var $a = $('<a/>');
                $a.attr('href', '').attr('data-popover', 'Merit: ' + merit.description).html(merit.name.titleize());
                _this.$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append($a));
            }
            else
                _this.$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append(merit.name.titleize()));
        });
        $.each(this.stats.flaws, function (i, flaw) {
            if (flaw.hasOwnProperty('description') && flaw.description != '') {
                var $a = $('<a/>');
                $a.attr('href', '').attr('data-popover', 'Flaw: ' + flaw.description).html(flaw.name.titleize());
                _this.$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append($a));
            }
            else
                _this.$element.find('[data-property="merits-and-flaws"]').append($('<li/>').append(flaw.name.titleize()));
        });
        // render backgrounds
        this.$element.find('[data-property="backgrounds"]').empty();
        $.each(this.stats.backgrounds, function (i, background) {
            _this.$element.find('[data-property="backgrounds"]').append($('<dt/>').append(background.name));
            _this.$element.find('[data-property="backgrounds"]').append($('<dd/>').append(_this.renderDots(background.value, 5)));
        });
        location.href = location.protocol + '//' + location.host + location.pathname + '#seed=' + this.options.rngSeed;
    };
    ;
    CharacterSheet.prototype.renderAbilities = function () {
        var _this = this;
        var abilityKeys = Object.keys(this.stats.abilities);
        var abilitiesPerColumn = Math.ceil(abilityKeys.length / 3);
        var $abilitiesSection = $('[data-property="abilities"]');
        var columns = [
            "", "", ""
        ];
        var count = 0;
        $.each(CharacterSheet.ABILITIES, function (i, stat) {
            if (_this.stats.abilities.hasOwnProperty(stat)) {
                var details = _this.stats.abilities[stat];
                var text = _this.renderDots(details.value, 5);
                if (details.hasOwnProperty('specialty') && details.specialty != '')
                    columns[Math.floor(count / abilitiesPerColumn)] += '<dt>' + stat.titleize() + ' <span class="specialty">(' + details.specialty + ')</span></dt><dd>' + text + '</dd>';
                else
                    columns[Math.floor(count / abilitiesPerColumn)] += '<dt>' + stat.titleize() + '</dt><dd>' + text + '</dd>';
                count++;
            }
        });
        $abilitiesSection.html('<div class="col span_1_of_3"><dl>' + columns[0] + '</dl></div>' +
            '<div class="col span_1_of_3"><dl>' + columns[1] + '</dl></div>' +
            '<div class="col span_1_of_3"><dl>' + columns[2] + '</dl></div>');
    };
    ;
    CharacterSheet.prototype.renderScoresWithDots = function (scores, detailProperty) {
        var _this = this;
        $.each(Object.keys(scores), function (i, stat) {
            var details = scores[stat];
            var text = _this.renderDots(details.value, 5);
            if (details.hasOwnProperty(detailProperty) && details[detailProperty] != '')
                _this.$element.find('[data-property="' + stat + '-' + detailProperty + '"]').html('(' + details[detailProperty] + ')');
            else
                _this.$element.find('[data-property="' + stat + '-' + detailProperty + '"]').empty();
            _this.$element.find('[data-property="' + stat + '"]').html(text);
        });
    };
    ;
    /**
     * @return a string containing "value" solid dots, and "max - value" empty dots (using unicode characters 25CF and 25CB respectively)
     */
    CharacterSheet.prototype.renderDots = function (value, max) {
        return '<span title="' + value + '">' + "\u25cf".repeat(value) + "\u25cb".repeat(max - value) + '</span>';
    };
    ;
    // from http://www.deathquaker.org/gaming/meritsflaws.html
    // in addition to the "name" and "description" properties, there's also an "onAdd" property, which is a callback function to be called when the merit or flaw
    // is given to a character. see Huge Size for an example.
    /** @TODO: finish these lists! */
    CharacterSheet.MERITS = [
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
        //{ name: 'Extremely Educated, Skilled, or Talented', description: 'You have a large general amount of knowledge, skill, or talent, and have an automatic 1 in the appropriate ability pools. This is an "illusory" level however–if you want to increase your aptitude in a particular ability, you must buy the first dot as if you didn\'t have it, and then the second.' },
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
        {
            name: 'Unaging',
            description: 'For some reason, you never age. While this has its benefits, if you know people long enough, they\'ll start to notice you not getting any older, which may cause some suspicion. While it\'s unlikely you\'ll die of old age, this merit does not keep you from getting ill or wounded.',
            mayAdd: function (character) { return !character.hasMeritOrFlaw('Aging'); }
        },
        { name: 'Unbondable', description: 'You can\'t be Blood Bound, no matter how much Vampire Blood you drink. For obvious reasons, if you\'re creating a Ghoul character, you have to pay twice the amount for the merit.' },
        // social
        {
            name: 'Child',
            mayAdd: function (character) {
                return !character.hasMeritOrFlaw('Aging');
            },
            onAdd: function (character) {
                character.stats.basics.age = Math.floor(Math.random() * 8 + 9);
                if (Math.random() * 10 > character.stats.basics.age - 10)
                    character.addMerit({ name: 'Short' });
            }
        },
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
        {
            name: 'Huge Size',
            description: 'You may be as tall as seven feet and weigh as much as 400lbs. You have an extra Bruised Health Level.',
            onAdd: function (character) {
                character.stats.basics.health++;
            }
        },
        { name: 'Light Sleeper' },
        //{ name: 'Longevity' }, // would require special coding to prevent 'Aging' flaw
        { name: 'Poison Resistance', description: 'You have an innate ability to resist the effects of many toxins. Roll Stamina to resist the effects of poison, level of difficulty 5 and up, depending on potence of the poison.' },
        // mage-only
        { name: 'Avatar Companion', description: 'Your Avatar has another, lesser Avatar connected to it, usually in the body of another person. This companion will be drawn to you and may remember past incarnations and have other information useful to you and your Avatar. Unless you buy points in Allies, this companion will be of no special use except be tied to your life cycle.' },
    ];
    CharacterSheet.FLAWS = [
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
        //{ name: 'Bard\'s Tongue', description: 'What you say tends to come true; you can\'t control this prophetic ability, and the compulsion to speak an uncomfortable truth is often very hard to resist, though you may attempt to do so by spending Willpower.' },
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
        {
            name: 'Aging',
            mayAdd: function (character) {
                return !character.hasMeritOrFlaw('Unaging') && !character.hasMeritOrFlaw('Child');
            },
            onAdd: function (character) {
                character.stats.basics.age = Math.floor(Math.random() * 10 + 50);
                character.decreaseRandomAttributes(['strength', 'dexterity', 'stamina'], 1);
                // add up to 40 years, with the potential to reduce a physical stat for each increment of 10
                for (var i = 0; i < 4; i++) {
                    if (Math.random() < 0.3) {
                        character.stats.basics.age += 10;
                        if (Math.random() < 0.7)
                            character.decreaseRandomAttributes(['strength', 'dexterity', 'stamina'], 1);
                    }
                }
            }
        },
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
    // make sure any cultures listed here also have lists of possible NAMES (below)
    CharacterSheet.CULTURES = ['american'];
    CharacterSheet.NAMES = {
        american: {
            female: ['Sophia', 'Emma', 'Olivia', 'Ava', 'Isabella', 'Mia', 'Zoe', 'Lily', 'Emily', 'Madelyn', 'Madison', 'Chloe', 'Charlotte', 'Aubrey', 'Avery', 'Abigail', 'Kaylee', 'Layla', 'Harper', 'Ella', 'Amelia', 'Arianna', 'Riley', 'Aria', 'Hailey', 'Hannah', 'Aaliyah', 'Evelyn', 'Addison', 'Mackenzie', 'Adalyn', 'Ellie', 'Brooklyn', 'Nora', 'Scarlett', 'Grace', 'Anna', 'Isabelle', 'Natalie', 'Kaitlyn', 'Lillian', 'Sarah', 'Audrey', 'Elizabeth', 'Leah', 'Annabelle', 'Kylie', 'Mila', 'Claire', 'Victoria', 'Maya', 'Lila', 'Elena', 'Lucy', 'Savannah', 'Gabriella', 'Callie', 'Alaina', 'Sophie', 'Makayla', 'Kennedy', 'Sadie', 'Skyler', 'Allison', 'Caroline', 'Charlie', 'Penelope', 'Alyssa', 'Peyton', 'Samantha', 'Liliana', 'Bailey', 'Maria', 'Reagan', 'Violet', 'Eliana', 'Adeline', 'Eva', 'Stella', 'Keira', 'Katherine', 'Vivian', 'Alice', 'Alexandra', 'Camilla', 'Kayla', 'Alexis', 'Sydney', 'Kaelyn', 'Jasmine', 'Julia', 'Cora', 'Lauren', 'Piper', 'Gianna', 'Paisley', 'Bella', 'London', 'Clara', 'Cadence'],
            male: ['Jackson', 'Aiden', 'Liam', 'Lucas', 'Noah', 'Mason', 'Ethan', 'Caden', 'Jacob', 'Logan', 'Jayden', 'Elijah', 'Jack', 'Luke', 'Michael', 'Benjamin', 'Alexander', 'James', 'Jayce', 'Caleb', 'Connor', 'William', 'Carter', 'Ryan', 'Oliver', 'Matthew', 'Daniel', 'Gabriel', 'Henry', 'Owen', 'Grayson', 'Dylan', 'Landon', 'Isaac', 'Nicholas', 'Wyatt', 'Nathan', 'Andrew', 'Cameron', 'Dominic', 'Joshua', 'Eli', 'Sebastian', 'Hunter', 'Brayden', 'David', 'Samuel', 'Evan', 'Gavin', 'Christian', 'Max', 'Anthony', 'Joseph', 'Julian', 'John', 'Colton', 'Levi', 'Muhammad', 'Isaiah', 'Aaron', 'Tyler', 'Charlie', 'Adam', 'Parker', 'Austin', 'Thomas', 'Zachary', 'Nolan', 'Alex', 'Ian', 'Jonathan', 'Christopher', 'Cooper', 'Hudson', 'Miles', 'Adrian', 'Leo', 'Blake', 'Lincoln', 'Jordan', 'Tristan', 'Jason', 'Josiah', 'Xavier', 'Camden', 'Chase', 'Declan', 'Carson', 'Colin', 'Brody', 'Asher', 'Jeremiah', 'Micah', 'Easton', 'Xander', 'Ryder', 'Nathaniel', 'Elliot', 'Sean', 'Cole']
        }
    };
    CharacterSheet.PERSONALITYTRAITS = [
        'Accessible', 'Active', 'Adaptable', 'Admirable', 'Adventurous', 'Agreeable', 'Alert', 'Allocentric', 'Amiable', 'Anticipative',
        'Appreciative', 'Articulate', 'Aspiring', 'Athletic', 'Attractive', 'Balanced', 'Benevolent', 'Brilliant', 'Calm', 'Capable',
        'Captivating', 'Caring', 'Challenging', 'Charismatic', 'Charming', 'Cheerful', 'Clean', 'Clear-headed', 'Clever', 'Colorful',
        'Companionly', 'Compassionate', 'Conciliatory', 'Confident', 'Conscientious', 'Considerate', 'Constant', 'Contemplative', 'Cooperative',
        'Courageous', 'Courteous', 'Creative', 'Cultured', 'Curious', 'Daring', 'Debonair', 'Decent', 'Decisive', 'Dedicated', 'Deep', 'Dignified',
        'Directed', 'Disciplined', 'Discreet', 'Dramatic', 'Dutiful', 'Dynamic', 'Earnest', 'Ebullient', 'Educated', 'Efficient', 'Elegant', 'Eloquent',
        'Empathetic', 'Energetic', 'Enthusiastic', 'Esthetic', 'Exciting', 'Extraordinary', 'Fair', 'Faithful', 'Farsighted', 'Felicific', 'Firm', 'Flexible',
        'Focused', 'Forecful', 'Forgiving', 'Forthright', 'Freethinking', 'Friendly', 'Fun-loving', 'Gallant', 'Generous', 'Gentle', 'Genuine', 'Good-natured',
        'Gracious', 'Hardworking', 'Healthy', 'Hearty', 'Helpful', 'Herioc', 'High-minded', 'Honest', 'Honorable', 'Humble', 'Humorous', 'Idealistic', 'Imaginative',
        'Impressive', 'Incisive', 'Incorruptible', 'Independent', 'Individualistic', 'Innovative', 'Inoffensive', 'Insightful', 'Insouciant', 'Intelligent', 'Intuitive',
        'Invulnerable', 'Kind', 'Knowledge', 'Leaderly', 'Leisurely', 'Liberal', 'Logical', 'Lovable', 'Loyal', 'Lyrical', 'Magnanimous', 'Many-sided', 'Masculine',
        'Mature', 'Methodical', 'Maticulous', 'Moderate', 'Modest', 'Multi-leveled', 'Neat', 'Nonauthoritarian', 'Objective', 'Observant', 'Open', 'Optimistic',
        'Orderly', 'Organized', 'Original', 'Painstaking', 'Passionate', 'Patient', 'Patriotic', 'Peaceful', 'Perceptive', 'Perfectionist', 'Personable',
        'Persuasive', 'Planful', 'Playful', 'Polished', 'Popular', 'Practical', 'Precise', 'Principled', 'Profound', 'Protean', 'Protective', 'Providential',
        'Prudent', 'Punctual', 'Pruposeful', 'Rational', 'Realistic', 'Reflective', 'Relaxed', 'Reliable', 'Resourceful', 'Respectful', 'Responsible', 'Responsive',
        'Reverential', 'Romantic', 'Rustic', 'Sage', 'Sane', 'Scholarly', 'Scrupulous', 'Secure', 'Selfless', 'Self-critical', 'Self-defacing', 'Self-denying',
        'Self-reliant', 'Self-sufficent', 'Sensitive', 'Sentimental', 'Seraphic', 'Serious', 'Sexy', 'Sharing', 'Shrewd', 'Simple', 'Skillful', 'Sober', 'Sociable',
        'Solid', 'Sophisticated', 'Spontaneous', 'Sporting', 'Stable', 'Steadfast', 'Steady', 'Stoic', 'Strong', 'Studious', 'Suave', 'Subtle', 'Sweet', 'Sympathetic',
        'Systematic', 'Tasteful', 'Teacherly', 'Thorough', 'Tidy', 'Tolerant', 'Tractable', 'Trusting', 'Uncomplaining', 'Understanding', 'Undogmatic', 'Unfoolable',
        'Upright', 'Urbane', 'Venturesome', 'Vivacious', 'Warm', 'Well-bred', 'Well-read', 'Well-rounded', 'Winning', 'Wise', 'Witty', 'Youthful', 'Absentminded',
        'Aggressive', 'Ambitious', 'Amusing', 'Artful', 'Ascetic', 'Authoritarian', 'Big-thinking', 'Boyish', 'Breezy', 'Businesslike', 'Busy', 'Casual', 'Crebral',
        'Chummy', 'Circumspect', 'Competitive', 'Complex', 'Confidential', 'Conservative', 'Contradictory', 'Crisp', 'Cute', 'Deceptive', 'Determined', 'Dominating',
        'Dreamy', 'Driving', 'Droll', 'Dry', 'Earthy', 'Effeminate', 'Emotional', 'Enigmatic', 'Experimental', 'Familial', 'Folksy', 'Formal', 'Freewheeling', 'Frugal',
        'Glamorous', 'Guileless', 'High-spirited', 'Huried', 'Hypnotic', 'Iconoclastic', 'Idiosyncratic', 'Impassive', 'Impersonal', 'Impressionable', 'Intense',
        'Invisible', 'Irreligious', 'Irreverent', 'Maternal', 'Mellow', 'Modern', 'Moralistic', 'Mystical', 'Neutral', 'Noncommittal', 'Noncompetitive', 'Obedient',
        'Old-fashined', 'Ordinary', 'Outspoken', 'Paternalistic', 'Physical', 'Placid', 'Political', 'Predictable', 'Preoccupied', 'Private', 'Progressive', 'Proud',
        'Pure', 'Questioning', 'Quiet', 'Religious', 'Reserved', 'Restrained', 'Retiring', 'Sarcastic', 'Self-conscious', 'Sensual', 'Skeptical', 'Smooth', 'Soft',
        'Solemn', 'Solitary', 'Stern', 'Stoiid', 'Strict', 'Stubborn', 'Stylish', 'Subjective', 'Surprising', 'Soft', 'Tough', 'Unaggressive', 'Unambitious', 'Unceremonious',
        'Unchanging', 'Undemanding', 'Unfathomable', 'Unhurried', 'Uninhibited', 'Unpatriotic', 'Unpredicatable', 'Unreligious', 'Unsentimental', 'Whimsical', 'Abrasive',
        'Abrupt', 'Agonizing', 'Aimless', 'Airy', 'Aloof', 'Amoral', 'Angry', 'Anxious', 'Apathetic', 'Arbitrary', 'Argumentative', 'Arrogantt', 'Artificial', 'Asocial',
        'Assertive', 'Astigmatic', 'Barbaric', 'Bewildered', 'Bizarre', 'Bland', 'Blunt', 'Biosterous', 'Brittle', 'Brutal', 'Calculating', 'Callous', 'Cantakerous',
        'Careless', 'Cautious', 'Charmless', 'Childish', 'Clumsy', 'Coarse', 'Cold', 'Colorless', 'Complacent', 'Complaintive', 'Compulsive', 'Conceited', 'Condemnatory',
        'Conformist', 'Confused', 'Contemptible', 'Conventional', 'Cowardly', 'Crafty', 'Crass', 'Crazy', 'Criminal', 'Critical', 'Crude', 'Cruel', 'Cynical', 'Decadent',
        'Deceitful', 'Delicate', 'Demanding', 'Dependent', 'Desperate', 'Destructive', 'Devious', 'Difficult', 'Dirty', 'Disconcerting', 'Discontented', 'Discouraging',
        'Discourteous', 'Dishonest', 'Disloyal', 'Disobedient', 'Disorderly', 'Disorganized', 'Disputatious', 'Disrespectful', 'Disruptive', 'Dissolute', 'Dissonant',
        'Distractible', 'Disturbing', 'Dogmatic', 'Domineering', 'Dull', 'Easily Discouraged', 'Egocentric', 'Enervated', 'Envious', 'Erratic', 'Escapist', 'Excitable',
        'Expedient', 'Extravagant', 'Extreme', 'Faithless', 'False', 'Fanatical', 'Fanciful', 'Fatalistic', 'Fawning', 'Fearful', 'Fickle', 'Fiery', 'Fixed', 'Flamboyant',
        'Foolish', 'Forgetful', 'Fraudulent', 'Frightening', 'Frivolous', 'Gloomy', 'Graceless', 'Grand', 'Greedy', 'Grim', 'Gullible', 'Hateful', 'Haughty', 'Hedonistic',
        'Hesitant', 'Hidebound', 'High-handed', 'Hostile', 'Ignorant', 'Imitative', 'Impatient', 'Impractical', 'Imprudent', 'Impulsive', 'Inconsiderate', 'Incurious',
        'Indecisive', 'Indulgent', 'Inert', 'Inhibited', 'Insecure', 'Insensitive', 'Insincere', 'Insulting', 'Intolerant', 'Irascible', 'Irrational', 'Irresponsible',
        'Irritable', 'Lazy', 'Libidinous', 'Loquacious', 'Malicious', 'Mannered', 'Mannerless', 'Mawkish', 'Mealymouthed', 'Mechanical', 'Meddlesome', 'Melancholic',
        'Meretricious', 'Messy', 'Miserable', 'Miserly', 'Misguided', 'Mistaken', 'Money-minded', 'Monstrous', 'Moody', 'Morbid', 'Muddle-headed', 'Naive', 'Narcissistic',
        'Narrow', 'Narrow-minded', 'Natty', 'Negativistic', 'Neglectful', 'Neurotic', 'Nihilistic', 'Obnoxious', 'Obsessive', 'Obvious', 'Odd', 'Offhand', 'One-dimensional',
        'One-sided', 'Opinionated', 'Opportunistic', 'Oppressed', 'Outrageous', 'Overimaginative', 'Paranoid', 'Passive', 'Pedantic', 'Perverse', 'Petty', 'Pharissical',
        'Phlegmatic', 'Plodding', 'Pompous', 'Possessive', 'Power-hungry', 'Predatory', 'Prejudiced', 'Presumptuous', 'Pretentious', 'Prim', 'Procrastinating', 'Profligate',
        'Provocative', 'Pugnacious', 'Puritanical', 'Quirky', 'Reactionary', 'Reactive', 'Regimental', 'Regretful', 'Repentant', 'Repressed', 'Resentful', 'Ridiculous',
        'Rigid', 'Ritualistic', 'Rowdy', 'Ruined', 'Sadistic', 'Sanctimonious', 'Scheming', 'Scornful', 'Secretive', 'Sedentary', 'Selfish', 'Self-indulgent', 'Shallow',
        'Shortsighted', 'Shy', 'Silly', 'Single-minded', 'Sloppy', 'Slow', 'Sly', 'Small-thinking', 'Softheaded', 'Sordid', 'Steely', 'Stiff', 'Strong-willed', 'Stupid',
        'Submissive', 'Superficial', 'Superstitious', 'Suspicious', 'Tactless', 'Tasteless', 'Tense', 'Thievish', 'Thoughtless', 'Timid', 'Transparent', 'Treacherous',
        'Trendy', 'Troublesome', 'Unappreciative', 'Uncaring', 'Uncharitable', 'Unconvincing', 'Uncooperative', 'Uncreative', 'Uncritical', 'Unctuous', 'Undisciplined',
        'Unfriendly', 'Ungrateful', 'Unhealthy', 'Unimaginative', 'Unimpressive', 'Unlovable', 'Unpolished', 'Unprincipled', 'Unrealistic', 'Unreflective', 'Unreliable',
        'Unrestrained', 'Unself-critical', 'Unstable', 'Vacuous', 'Vague', 'Venal', 'Venomous', 'Vindictive', 'Vulnerable', 'Weak', 'Weak-willed', 'Well-meaning',
        'Willful', 'Wishful', 'Zany'
    ];
    CharacterSheet.ABILITIES = [
        'alertness', 'athletics', 'awareness', 'brawl', 'dodge',
        'expression', 'intimidation', 'leadership', 'streetwise', 'subterfuge',
        'crafts', 'drive', 'etiquette', 'firearms', 'meditation',
        'melee', 'performance', 'pilot', 'stealth', 'survival', 'technology',
        'academics', 'computer', 'cosmology', 'enigmas', 'investigation',
        'law', 'linguistics', 'medicine', 'occult', 'science', 'lore',
    ];
    // any attributes or abilities you want specialties to be picked for, list here
    CharacterSheet.SPECIALTIES = {
        academics: ['architecture', 'history', 'literature', 'medieval studies', 'music'],
        cosmology: ['deep umbra', 'gauntlet', 'nodes', 'realms', 'spirit names'],
        linguistics: [
            'arabic', 'bengali', 'cantonese', 'english', 'french', 'german', 'hindi', 'hungarian',
            'japanese', 'korean', 'malay', 'mandarin', 'portuguese', 'russian', 'spanish', 'swahili',
            'thai', 'turkish', 'vietnamese'
        ],
        science: ['chemistry', 'biology', 'astronomy', 'physics', 'metallurgy', 'geology'],
        lore: ['Tradition Mage', 'Technocrat', 'Vampire', 'Werewolf', 'Changling', 'Wraith', 'Hunter', 'Assamite', 'Brujah', 'Settite', 'Gangrel', 'Giovanni',
            'Lasombra', 'Malkavian', 'Noferatu', 'Toreador', 'Tremere', 'Tzimisce', 'Ventrue', 'Black Fury', 'Bone Gnawer', 'Children of Gaia', 'Fianna', 'Get of Fenris',
            'Glass Walkers', 'Red Talons', 'Shadow Lords', 'Silent Striders', 'Silver Fangs', 'Uktena', 'Wendigo', 'Spirit', 'Ajaba', 'Ananasi', 'Bastet', 'Corax', 'Gurahl',
            'Kitsune', 'Mokole', 'Nagah', 'Nuwisha', 'Ratkin', 'Rokea', 'Boggan', 'Eshu', 'Nocker', 'Pooka', 'Redcap', 'Sidhe', 'Sluagh', 'Troll', 'Ahl-i-Batin', 'Taftani', 'Hollow Ones',
            'Wu Lung', 'Progenitors', 'Iteration-X', 'New World Order', 'Syndicate', 'Void Engineers', 'Virtual Adepts', 'Euthanatos', 'Order of Hermes', 'Verbena', 'Sons of Ether',
            'Akashic Brotherhood', 'Celestial Chorus', 'Dreamspeakers', 'Cult of Ecstasy', 'Orphan']
    };
    CharacterSheet.BACKGROUNDS = [
        'Allies', 'Alternate Identity', 'Arcane', 'Artifact', 'Avatar', 'Backup', 'Blessing',
        'Chantry', 'Contacts', 'Cult', 'Dream', 'Fame',
        'Familiar', 'Influence', 'Library', 'Mentor', 'Node',
        'Resources', 'Sanctum', 'Spirit Mentor', 'Wonder'
    ];
    // for any backgrounds you want to have a detail associated with, provide a list of possible details here
    CharacterSheet.BACKGROUND_DETAILS = {
        'Allies': ['Tradition Mage', 'Technocrat', 'Vampire', 'Werewolf', 'Changling', 'Wraith', 'Hunter', 'Assamite', 'Brujah', 'Settite', 'Gangrel', 'Giovanni',
            'Lasombra', 'Malkavian', 'Noferatu', 'Toreador', 'Tremere', 'Tzimisce', 'Ventrue', 'Black Fury', 'Bone Gnawer', 'Children of Gaia', 'Fianna', 'Get of Fenris',
            'Glass Walkers', 'Red Talons', 'Shadow Lords', 'Silent Striders', 'Silver Fangs', 'Uktena', 'Wendigo', 'Spirit', 'Ajaba', 'Ananasi', 'Bastet', 'Corax', 'Gurahl',
            'Kitsune', 'Mokole', 'Nagah', 'Nuwisha', 'Ratkin', 'Rokea', 'Boggan', 'Eshu', 'Nocker', 'Pooka', 'Redcap', 'Sidhe', 'Sluagh', 'Troll', 'Ahl-i-Batin', 'Taftani', 'Hollow Ones',
            'Wu Lung', 'Progenitors', 'Iteration-X', 'New World Order', 'Syndicate', 'Void Engineers', 'Virtual Adepts', 'Euthanatos', 'Order of Hermes', 'Verbena', 'Sons of Ether',
            'Akashic Brotherhood', 'Celestial Chorus', 'Dreamspeakers', 'Cult of Ecstasy', 'Orphan'],
        'Contacts': ['tradition mages', 'technocracy', 'police', 'community', 'business', 'political'],
    };
    // these abilities will be given specialties if the character has ANY dots in them
    CharacterSheet.ABILITIES_REQUIRING_SPECIALTY = [
        'linguistics', 'lore'
    ];
    return CharacterSheet;
}());
var MageCharacterSheet = (function (_super) {
    __extends(MageCharacterSheet, _super);
    function MageCharacterSheet($element, options) {
        _super.call(this, $element, options);
        this.generateArete = function () {
            var r = Math.random() * 100;
            if (r < 10)
                this.stats.basics.arete = 2;
            else if (r >= 99 && this.options.allowArchmages)
                this.stats.basics.arete = 5;
            else if (r >= 97 && this.options.allowArchmages)
                this.stats.basics.arete = 4;
            else
                this.stats.basics.arete = 3;
        };
        // mage-specific stats:
        this.stats.basics.tradition = '';
        this.stats.basics.arete = 1;
        this.stats.basics.willpower = 5;
        this.stats.spheres = {
            correspondence: { value: 0, focus: "" },
            entropy: { value: 0, focus: "" },
            forces: { value: 0, focus: "" },
            life: { value: 0, focus: "" },
            matter: { value: 0, focus: "" },
            mind: { value: 0, focus: "" },
            prime: { value: 0, focus: "" },
            spirit: { value: 0, focus: "" },
            time: { value: 0, focus: "" },
        };
        if (Math.random() * 100 < 3)
            this.stats.basics.tradition = MageCharacterSheet.RAREFACTIONS.sample();
        else
            this.stats.basics.tradition = MageCharacterSheet.TRADITIONS.sample();
        this.generateAttributes(7, 5, 3);
        this.generateAbilities(27);
        this.generateArete();
        if (this.stats.basics.arete > 3)
            this.generateSpheres(7 + Math.floor(Math.random() * 3) + Math.floor(Math.random() * 6));
        else
            this.generateSpheres(6 + Math.floor(Math.random() * 3));
        this.stats.basics.willpower = 5;
        this.generateWillpower(5, 25); // add up to 5 more points, with a 25% chance for each point
        this.generateMeritsAndFlaws(1, 4);
        this.generateBackgrounds(7 + Math.floor(Math.random() * 3));
        // if the mage has no Avatar, give them a point of Avatar
        if (this.backgroundValue('Avatar') == 0)
            this.changeBackground('Avatar', 1);
    }
    MageCharacterSheet.prototype.getDefaultOptions = function () {
        return $.extend({}, _super.prototype.getDefaultOptions.call(this), {
            chanceToRepeatSpheres: 75,
            allowArchmages: true
        });
    };
    MageCharacterSheet.prototype.generateSpheres = function (points) {
        var _this = this;
        if (this.addSphereForFaction())
            points--;
        // spheresAvailable keeps track of which spheres are less than the character's arete
        var spheresAvailable = MageCharacterSheet.SPHERES.slice(0);
        var sphere;
        // while we have points to assign, and spheres we can assign to
        while (points > 0 && spheresAvailable.length > 0) {
            sphere = undefined;
            if (Math.random() * 100 < this.options.chanceToRepeatSpheres) {
                // get a list of all spheres the character already has points in
                sphere = spheresAvailable.filter(function (sphere) {
                    return _this.stats.spheres[sphere].value > 0;
                }).sample(); // then pick one
            }
            // since the previous "if" could fail to pick a sphere, or could simply not be run...
            if (sphere === undefined) {
                // get a list of all spheres which the character does not have any points in
                sphere = spheresAvailable.filter(function (sphere) {
                    return _this.stats.spheres[sphere].value == 0;
                }).sample(); // then pick one
            }
            this.stats.spheres[sphere].value++;
            points--;
            // if we increase a sphere's value to the character's arete, remove the sphere from those available to give points to in the future
            if (this.stats.spheres[sphere].value == this.stats.basics.arete)
                spheresAvailable.remove(sphere);
        }
    };
    ;
    MageCharacterSheet.prototype.addSphereForFaction = function () {
        switch (this.stats.basics.tradition) {
            case 'Virtual Adepts':
            case 'Ahl-i-Batin':
                this.stats.spheres.correspondence.value++;
                return true;
            case 'Euthanatos':
                this.stats.spheres.entropy.value++;
                return true;
            case 'Order of Hermes':
            case 'Taftani':
                this.stats.spheres.forces.value++;
                return true;
            case 'Verbena':
            case 'what?':
            case 'Progenitors':
                this.stats.spheres.life.value++;
                return true;
            case 'Sons of Ether':
                this.stats.spheres.matter.value++;
                return true;
            case 'Akashic Brotherhood':
                this.stats.spheres.mind.value++;
                return true;
            case 'Celestial Chorus':
                this.stats.spheres.prime.value++;
                return true;
            case 'Dreamspeakers':
                this.stats.spheres.spirit.value++;
                return true;
            case 'Cult of Ecstasy':
                this.stats.spheres.time.value++;
                return true;
            default:
                return false;
        }
    };
    ;
    MageCharacterSheet.TRADITIONS = [
        'Akashic Brotherhood',
        'Celestial Chorus',
        'Cult of Ecstasy',
        'Dreamspeakers',
        'Euthanatos',
        'Order of Hermes',
        'Son of Ether',
        'Verbena',
        'Virtual Adepts',
        'orphan',
    ];
    MageCharacterSheet.RAREFACTIONS = [
        'Ahl-i-batin',
        'Taftani',
        'Hollow Ones',
        'Wu Lung',
        'Progenitors',
        'Iteration-X',
        'New World Order',
        'Syndicate',
        'Void Engineers',
    ];
    MageCharacterSheet.SPHERES = [
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
    return MageCharacterSheet;
}(CharacterSheet));
//# sourceMappingURL=app.js.map