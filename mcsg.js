// consider these "constants" (even though JS has no such thing >_>)

Character.prototype.CULTURES = [ 'american' ];

Character.prototype.NAMES = {
	american: {
		first: [ 'Abby', 'Aileen', 'Ben', 'Claire', 'Darren', 'Erica', 'Finn', 'Frank', 'Jessica', 'Jake', 'Laura', 'Liz', 'Lyle', 'Katie', 'Sandy', 'Stephen', 'Tess', 'Zach' ],
		last: [ 'Arze', 'Baker', 'Carpenter', 'Dewhurst', 'Farrow', 'Hendel', 'Lantz', 'MacKay', 'Rogers', 'Smith', 'Stanonik', 'Swanson' ],
	},
};

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

		backgrounds: { }, // ex: { allies: { value: 5, detail: "the vampire king" }, library: { value: 3 } }
		merits: [], // a list of strings
		flaws: [], // a list of strings
		
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
		
		// some sample code, that does things 100% randomly
		var culture = _this.CULTURES.sample();
		
		_this.stats.basics.name = _this.NAMES[culture].first.sample() + ' ' + _this.NAMES[culture].last.sample();
		_this.stats.basics.tradition = _this.TRADITIONS.sample();
		
		// 1-5 for each attribute
		$.each(attributes, function(i, attribute) {
			_this.stats.attributes[attribute].value = Math.floor(Math.random() * 5) + 1;
		});
		
		// just as an example, everyone gets pilot 5. no real reason. just an example.
		_this.changeAbility('pilot', 5);
	
	}; // end of generateCharacter method
	
	/*
	 * adds "amount" to the specified "ability", creating it if it does not already exist
	 */
	this.changeAbility = function(ability, amount)
	{
		if(_this.stats.abilities.hasOwnProperty(ability))
			_this.stats.abilities[ability].value += amount;
		else
			_this.stats.abilities[ability] = { value: amount, speciality: "" };
	};
	
	/**
	 * @return the ability's value, or 0 if it does not exist
	 */
	this.abilityValue = function(ability)
	{
		return _this.stats.abilities.hasOwnProperty(ability) ? this.stats.abilities[ability].value : 0;
	};
	
	/*
	 * adds "amount" to the specified "background", creating it if it does not already exist
	 */
	this.changeBackground = function(background, amount)
	{
		if(_this.stats.backgrounds.hasOwnProperty(background))
			_this.stats.backgrounds[background].value += amount;
		else
			_this.stats.backgrounds[background] = { value: amount, detail: "" };
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

		_this.renderScoresWithDots(_this.stats.attributes, 'specialty');
		_this.renderAbilities();
		_this.renderScoresWithDots(_this.stats.spheres, 'focus');
	};
	
	this.renderAbilities = function()
	{
		var abilityKeys = Object.keys(_this.stats.abilities);
		var abilitiesPerColumn = Math.ceil(abilityKeys.length / 3);
	
		var $abilitiesSection = $('[data-property="abilities"]');
		
		var columns = [
			"", "", ""
		];
	
		$.each(abilityKeys, function(i, stat) {
			var details = _this.stats.abilities[stat];
			var text = _this.renderDots(details.value, 5);
		
			if(stat.hasOwnProperty('specialty') && details.specialty != '')
				text += ' (' + details.specialty + ')';
			
			columns[Math.floor(i / abilitiesPerColumn)] += '<dt>' + stat.titleize() + '</dt><dd>' + text + '</dd>';
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
		
			if(stat.hasOwnProperty(detailProperty) && details[detailProperty] != '')
				text += ' (' + details[detailProperty] + ')';
			
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
