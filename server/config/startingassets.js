const assets = [
	{
		type: 'Trait',
		name: 'Mantle of the First',
		description: ' You have a limited ability to command the matter of the afterlife itself. Examples of this include  temporarily rearranging the layout of streets and buildings, changing the gloom briefly into day creating short-lived golems out of grave-dirt, changing that dirt into mud or fire (though, of course, you can\'t hurt a shade unless they attack first).',
		owner: 'The Angel of Judgement'
	},
	{
		type: 'Trait',
		name: 'Cloak of the First',
		description: 'You can become entirely invisible and/or intangible.',
		owner: 'The Angel of Dawn'
	},
	{
		type: 'Trait',
		name: 'Touch of the First',
		description: 'You are extremely convincing and charismatic… and perhaps have a slight ability to compel. Not to command - you\'re unlikely to convince anyone to do something fundamentally against their nature - but you can give a little nudge.',
		owner: 'The Demon of Dusk'
	},
	{
		type: 'Trait',
		name: 'Voice of the First',
		description: 'You are extremely convincing and charismatic… and perhaps have a slight ability to compel. Not to command - you\'re unlikely to convince anyone to do something fundamentally against their nature - but you can give a little nudge.',
		owner: 'The Demon of Mercy'
	},
	{
		model: 'Trait',
		name: 'Cargo Plane',
		description: 'A small, spectral cargo plane that requires no fuel. It cannot be stolen or used by anyone else. You can cross the River (a storm, to you) freely and carry others with you.',
		owner: 'The Aviator'
	},
	{
		model: 'Trait',
		name: 'Keys to the Kingdom',
		description: 'You always know a shortcut, a hiding place, a hidden oasis in the Necropolis. There are no secret places you don\'t know about and many you keep secret from everyone else. No door in the Necropolis can hold you… Except the Silent Archive.',
		owner: 'The Claviger'
	},
	{
		model: 'Asset',
		name: 'The Expanse',
		description: 'You command a workhouse filled with (unsorted) goods and (unrefined) memory fragments in your factories and storerooms. If someone needs something commonplace, well, chances are you\'ve got it lying around somewhere.',
		owner: 'The Foreman'
	},

	{
		model: 'Trait',
		name: 'Scourge of the Silent King',
		description: 'Furies are master trackers and hunters, able to sprout wings and nightmarish talons that can leave scars that persist even after a shade dies and reforms. You\'re really very good at tracking, hunting and hurting...but being fast, strong and winged can be useful in other ways.',
		owner: 'The Avenging Fury'
	},
	{
		model: 'Trait',
		name: 'Scourge of the Silent King',
		description: 'Furies are master trackers and hunters, able to sprout wings and nightmarish talons that can leave scars that persist even after a shade dies and reforms. You\'re really very good at tracking, hunting and hurting...but being fast, strong and winged can be useful in other ways.',
		owner: 'The Implacable Fury'
	},
	{
		model: 'Trait',
		name: 'Question Everything',
		description: 'You take nothing for granted, and have a tendency to examine things from all angles. You\'re very good at investigating, probing deeper, recognising inconsistencies and getting under the skin of other shades.',
		owner: 'The Gnostic'
	},
	{
		model: 'Trait',
		name: 'Purveyor of Pleasure',
		description: 'You are the prince of passion, the empress of entertainment. Even if others don\'t know what will please them, you do, and you know who can procure it. This is how you\'ve made your way to the top of the pile after all, diverting the attention of others with amusements, or outright bribing them with experiences they\'ll never forget.',
		owner: 'The Gourmand'
	},
	{
		model: 'Asset',
		name: 'Obscene Wealth',
		description: 'The House always has more money, be it extra income from the casino, savings hidden in secret caches and vaults, liquidating assets or just rooting around in their proverbial couch cushions.',
		owner: 'The House'
	},
	{
		model: 'Trait',
		name: 'Wild Card',
		description: 'Your natural charm, jokes and antics amuse people. You\'re very good at getting into places you shouldn\'t, getting information out of people, getting away with things or just making people laugh.',
		owner: 'The Jester'
	},
	{
		model: 'Asset',
		name: 'Grey Marchers',
		description: 'You have a small squad of rangers loyal to you. They were uncommonly independent and inventive even before the Silent King fell. They\'re expert scouts, skilled in stealth and skirmishing, all skills that have uses beyond simply ranging.',
		owner: 'The Ranger'
	},
	{
		model: 'Asset',
		name: 'Friends in Gehennatown',
		description: 'You are liked and respected by the Shades of Gehennatown for your remorse and devotion to betterment. You can call on the shades there to assist you, so long as it is something they would not disapprove of.',
		owner: 'The Penitent'
	},
	{
		model: 'Trait',
		name: 'Genius Intellect',
		description: 'You digest, extrapolate and apply information at a speed faster than any human brain can. Most likely because you don\'t have one anymore; that meat only ever held you back.',
		owner: 'The Scholar'
	},

	{
		model: 'Trait',
		name: 'Master Detective',
		description: 'You\'re a bloodhound, able to sniff out clues, see through bogus alibis and make connections others can\'t even see.',
		owner: 'The Seeker'
	},
	{
		model: 'Trait',
		name: 'Voice of the King',
		description: 'Though many are going rogue or developing personalities detrimental to their role, much of the Silent King\'s former state apparatus still answers to you. ',
		owner: 'The Seneschal'
	},
	{
		model: 'Trait',
		name: 'Knows Where the Bodies Are Buried',
		description: 'You may not have had much actual power under the King, but you were always close to the action. You know the dirty secrets, habits and interests of half the shades in the city, even secrets they\'ve forgotten. You also know plenty of hidden places in the Palace and beyond (though you know you can\'t compare to the Claviger on that front). ',
		owner: 'The Steward'
	},
	{
		model: 'Asset',
		name: 'The Resistance',
		description: 'You have a few friends and allies here and there who can help out, and with the state in disarray (and their own minds reawakening) they\'re more useful than ever.',
		owner: 'The Thorn'
	},

	{
		model: 'Trait',
		name: 'Force of Nature',
		description: 'You speak and act with such unerring confidence that no one thinks to doubt you. Lies turn to truths when you speak them, requests into orders. In a world of doubt and uncertainty, confidence, surety and audacity can get you very far indeed… Or so you hope. ',
		owner: 'The Upstart'
	},
	{
		model: 'Trait',
		name: 'Tactical Brilliance',
		description: 'Your mastery of tactics and logistics is unsurpassed. While your memories mostly involve warfare, the same skill can apply to almost any situation that involves outmanoeuvring and outplanning; heists, blackmail... even politics. ',
		owner: 'The Unknown Soldier'
	}
];

module.exports = assets;