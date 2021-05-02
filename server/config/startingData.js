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
		type: 'Trait',
		name: 'Cargo Plane',
		description: 'A small, spectral cargo plane that requires no fuel. It cannot be stolen or used by anyone else. You can cross the River (a storm, to you) freely and carry others with you.',
		owner: 'The Aviator'
	},
	{
		type: 'Trait',
		name: 'Keys to the Kingdom',
		description: 'You always know a shortcut, a hiding place, a hidden oasis in the Necropolis. There are no secret places you don\'t know about and many you keep secret from everyone else. No door in the Necropolis can hold you… Except the Silent Archive.',
		owner: 'The Claviger'
	},
	{
		type: 'Asset',
		name: 'The Expanse',
		description: 'You command a workhouse filled with (unsorted) goods and (unrefined) memory fragments in your factories and storerooms. If someone needs something commonplace, well, chances are you\'ve got it lying around somewhere.',
		owner: 'The Foreman'
	},

	{
		type: 'Trait',
		name: 'Scourge of the Silent King',
		description: 'Furies are master trackers and hunters, able to sprout wings and nightmarish talons that can leave scars that persist even after a shade dies and reforms. You\'re really very good at tracking, hunting and hurting...but being fast, strong and winged can be useful in other ways.',
		owner: 'The Avenging Fury'
	},
	{
		type: 'Trait',
		name: 'Scourge of the Silent King',
		description: 'Furies are master trackers and hunters, able to sprout wings and nightmarish talons that can leave scars that persist even after a shade dies and reforms. You\'re really very good at tracking, hunting and hurting...but being fast, strong and winged can be useful in other ways.',
		owner: 'The Implacable Fury'
	},
	{
		type: 'Trait',
		name: 'Question Everything',
		description: 'You take nothing for granted, and have a tendency to examine things from all angles. You\'re very good at investigating, probing deeper, recognising inconsistencies and getting under the skin of other shades.',
		owner: 'The Gnostic'
	},
	{
		type: 'Trait',
		name: 'Purveyor of Pleasure',
		description: 'You are the prince of passion, the empress of entertainment. Even if others don\'t know what will please them, you do, and you know who can procure it. This is how you\'ve made your way to the top of the pile after all, diverting the attention of others with amusements, or outright bribing them with experiences they\'ll never forget.',
		owner: 'The Gourmand'
	},
	{
		type: 'Asset',
		name: 'Obscene Wealth',
		description: 'The House always has more money, be it extra income from the casino, savings hidden in secret caches and vaults, liquidating assets or just rooting around in their proverbial couch cushions.',
		owner: 'The House'
	},
	{
		type: 'Trait',
		name: 'Wild Card',
		description: 'Your natural charm, jokes and antics amuse people. You\'re very good at getting into places you shouldn\'t, getting information out of people, getting away with things or just making people laugh.',
		owner: 'The Jester'
	},
	{
		type: 'Asset',
		name: 'Grey Marchers',
		description: 'You have a small squad of rangers loyal to you. They were uncommonly independent and inventive even before the Silent King fell. They\'re expert scouts, skilled in stealth and skirmishing, all skills that have uses beyond simply ranging.',
		owner: 'The Ranger'
	},
	{
		type: 'Asset',
		name: 'Friends in Gehennatown',
		description: 'You are liked and respected by the Shades of Gehennatown for your remorse and devotion to betterment. You can call on the shades there to assist you, so long as it is something they would not disapprove of.',
		owner: 'The Penitent'
	},
	{
		type: 'Trait',
		name: 'Genius Intellect',
		description: 'You digest, extrapolate and apply information at a speed faster than any human brain can. Most likely because you don\'t have one anymore; that meat only ever held you back.',
		owner: 'The Scholar'
	},

	{
		type: 'Trait',
		name: 'Master Detective',
		description: 'You\'re a bloodhound, able to sniff out clues, see through bogus alibis and make connections others can\'t even see.',
		owner: 'The Seeker'
	},
	{
		type: 'Trait',
		name: 'Voice of the King',
		description: 'Though many are going rogue or developing personalities detrimental to their role, much of the Silent King\'s former state apparatus still answers to you. ',
		owner: 'The Seneschal'
	},
	{
		type: 'Trait',
		name: 'Knows Where the Bodies Are Buried',
		description: 'You may not have had much actual power under the King, but you were always close to the action. You know the dirty secrets, habits and interests of half the shades in the city, even secrets they\'ve forgotten. You also know plenty of hidden places in the Palace and beyond (though you know you can\'t compare to the Claviger on that front). ',
		owner: 'The Steward'
	},
	{
		type: 'Asset',
		name: 'The Resistance',
		description: 'You have a few friends and allies here and there who can help out, and with the state in disarray (and their own minds reawakening) they\'re more useful than ever.',
		owner: 'The Thorn'
	},

	{
		type: 'Trait',
		name: 'Force of Nature',
		description: 'You speak and act with such unerring confidence that no one thinks to doubt you. Lies turn to truths when you speak them, requests into orders. In a world of doubt and uncertainty, confidence, surety and audacity can get you very far indeed… Or so you hope. ',
		owner: 'The Upstart'
	},
	{
		type: 'Trait',
		name: 'Tactical Brilliance',
		description: 'Your mastery of tactics and logistics is unsurpassed. While your memories mostly involve warfare, the same skill can apply to almost any situation that involves outmanoeuvring and outplanning; heists, blackmail... even politics. ',
		owner: 'The Unknown Soldier'
	}
];

const characters = [
	{
		playerName: 'Kyle',
		pronouns: 'They/Them',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/arte2C-the-jester---pc-person',
		characterName: 'The Jester',
		tag: 'Former Servants',
		email: 'nomansfool.afterlife@gmail.com',
		controlEmail: 'afterlifegamma@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'GMT+8',
		bio: 'Life was a joke and so is the afterlife. They held an odd role in the court of the Silent King, their humour mostly just another tool of cruelty (though the Arte was the only person who could ever insult the Silent King and get away with it)… but now they\'re free to become their own comedian. The Jester wears a variety of costumes - changing their face, body and mannerisms to match - for different roles. Their red eye paint reveals the Jester\'s identity.',
		username: 'PiFace314',
		icon: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/arte2C-the-jester---pc-person',
		control: 'Gamma',
		wealthLevel: 'Comfortable'
	},
	{
		playerName: 'LJ',
		pronouns: 'She/Her',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/the-claviger---pc-person',
		characterName: 'The Claviger',
		tag: 'Former Servants',
		email: 'theclaviger@gmail.com',
		controlEmail: 'afterlifebeta@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'EST',
		bio: 'A quiet and mysterious servant of the Silent King, the keeper of the keys had access to almost everywhere in the city, sealing and unsealing at the King\'s decree. Her motives are currently inscrutable.',
		username: 'ljtrigirl',
		icon: '‘https://www.worldanvil.com/media/cache/skyscraper/uploads/images/5f180d4b68aacc09ba428d11b4e7c0da.jpg',
		control: 'Beta',
		wealthLevel: 'Comfortable'
	},
	{
		playerName: 'Dan V',
		pronouns: 'They/Them',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/the-angel-of-dawn---pc-person',
		characterName: 'The Angel of Dawn',
		tag: 'Angels',
		email: 'daniel.vehslage@gmail.com',
		controlEmail: 'afterlifedelta@hotmail.com afterlifecontrol@gmail.com',
		timeZone: 'MST',
		bio: 'One of the angels active in the Necropolis.',
		username: 'daniel.vehslage@gmail.com',
		icon: '',
		control: 'Game Control',
		wealthLevel: 'Poor'
	},
	{
		playerName: 'Simo',
		pronouns: 'He/Him',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/the-upstart---pc-person-1',
		characterName: 'The Upstart',
		tag: 'Misfits',
		email: 'simo.santeri@gmail.com',
		controlEmail: 'afterlifegamma@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'GMT+2',
		bio: 'The Upstart was some newly-dead nobody who awakened in the (now unmoving) queue to see She Who Bears The Scale and absconded into the city. They\'ve quickly started to build a powerbase that has more established shades impressed and intimidated.',
		username: 'Murska',
		icon: 'https://www.worldanvil.com/media/cache/skyscraper/uploads/images/f5367489a18742dff8b7ae162e9909ff.png',
		control: 'Gamma',
		wealthLevel: 'Poor'
	},
	{
		playerName: 'Game Control',
		pronouns: 'They/Them',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/the-first-angel--person',
		characterName: 'The First Angel',
		tag: 'Angels',
		email: 'afterlifecontrol@gmail.com',
		timeZone: 'GMT',
		bio: 'The leader of the angels has never been seen in the Necropolis. Their aims are unknown beyond their wish that the First Demon be eradicated and for the shades to prosper.',
		username: 'Game Control',
		icon: 'https://www.worldanvil.com/media/cache/skyscraper/uploads/images/ae6f7c79e22998c229b198a655d29734.jpg',
		control: 'Game Control',
		wealthLevel: 'Comfortable'
	},
	{
		playerName: 'Alex McK',
		pronouns: 'He/Him',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/reeve2C-the-steward--pc-person',
		characterName: 'The Steward',
		tag: 'Former Servants',
		email: 'areidgrey@googlemail.com',
		controlEmail: 'afterlifebeta@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'GMT',
		bio: 'The Steward\'s role seemed pointless, vestigial. The Silent King needed no valet or bodyguard, yet the Steward was always close at hand. Reeve seems to have moved on from the King very quickly and is taking an extremely active interest in the pending election.',
		username: 'Reeve',
		icon: 'https://www.worldanvil.com/media/cache/skyscraper/uploads/images/f6b7fa0d51b891f910fc28800b44956d.jpeg',
		control: 'Beta',
		wealthLevel: 'Comfortable'
	},
	{
		playerName: 'Gamma Control',
		pronouns: 'He/Him',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/sam2C-the-barman-person',
		characterName: 'Sam, the Barman',
		tag: 'NPC',
		email: 'afterlifegamma@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'EST',
		bio: 'The best barman ever to die.',
		username: 'Warsprite',
		icon: 'https://www.worldanvil.com/media/cache/skyscraper/uploads/images/011e1bde2d8893036a182990d70ac95c.jpg',
		control: 'Gamma Control',
		wealthLevel: 'Comfortable'
	},
	{
		playerName: 'Zeta Control',
		pronouns: 'He/Him',
		worldAnvil: 'https://www.worldanvil.com/w/afterlife3A-a-postmortem-megagame-afterlife-control/a/hoffman2C-the-alchemist-person',
		characterName:'Hoffman, The Alchemist',
		tag: 'NPC',
		email: 'hoffmanthealchemist@gmail.com afterlifecontrol@gmail.com',
		timeZone: 'PT',
		bio: 'Definitely not a mad scientist.',
		username: 'BobtheNinjaMan',
		icon: 'https://www.worldanvil.com/media/cache/skyscraper/uploads/images/76ec8aff91da462cb6fdacfa470f9627.jpg',
		control: 'Zeta Control',
		wealthLevel: 'Comfortable'
	}
];

const locations = [
	{
		name: 'University of Doxley',
		description: 'The University is a source of pride for the town, and also a source of unending student shenanigans. Many old and traditional student societies hold court here, from hobbyists like the Broadcast Club to politicians, partygoers and everything in between. It\'s not the largest, oldest or most famous institute of higher learning but it is Doxley\'s, and there is nothing wrong with that.',
		borough: 'West',
		influence: 5,
		code: 'W10'
	},
	{
		name: 'Piers',
		description: 'A beautiful walking street near the river mouth and along the seaside, the area attracts tourists with all sorts of local tastes, street food, performers, little gift shops and cafés. Enterprising fishermen offer tours at sea, old crones peddle herbal remedies and handmade scented candles and you can get your fortune read in any of a dozen ways. In one narrow side-street a shop selling all sorts of trinkets for good fortune and health has a reputation among some of the locals. They say the charms here actually work, though the price is not always paid in money.',
		borough: 'West',
		influence: 3,
		code: 'W8'
	},
	{
		name: 'Port of Doxley',
		description: 'The smell of the sea mixes with oil and the constant grind of heavy machinery. The port is the artery of the city, where the real money comes in. Well, nowadays it has been in decline for years as factories and mills have given way to service industry and software engineering. Still, a hefty amount of goods flow in and out daily from smaller cargo vessels that use the facilities to avoid lines and higher fees in larger ports down the coast. Many empty warehouses slowly decay near the river, but some are still in active use and hold the goods of the world ready to be loaded on to trains or trucks and brought to customers all over the nation.',
		borough: 'West',
		influence: 4,
		code: 'W6'
	},
	{
		name: 'Jemison Island',
		description: 'Originally a forested island in treacherous waters near the old harbour, used as a smuggler\'s hideout and on one memorable occasion a jumping-off point for a Viking sack of the city, the waters near Jemison have been long since been dredged and charted. The island itself was deforested in a fire some decades ago, rumoured to have been started accidentally by a bunch of young students having gone camping there. Many ghost stories still circulate among the population about how they all either perished in the fire, drowned in the waters or were killed by an ancient protector of the island whom their careless behaviour had angered. The island is off limits to the public by order of the City Hall, though nobody really remembers why.',
		borough: 'West',
		influence: 1,
		code: 'W4'
	},
	{
		name: 'City Slicker Records',
		description: 'At a time when the internet is available to all with its endless collection of free music, and everyone carries their song library around on their phone, there is only one way for CD and vinyl stores to survive - atmosphere. City Slicker is unassuming on the outside, but surprisingly large and well-stocked on the inside with classics and strange, fringe productions alike. The kind of people who want what it offers know where it is, and that\'s enough to keep the lights on. The owner is a charming, polite fellow with encyclopedic knowledge of what seems to be every possible kind of music, and a melodic voice that sounds just a little familiar to most, though nobody can seem to place why exactly that would be.',
		borough: 'West',
		influence: 0,
		code: 'W9'
	},
	{
		name: 'Inkubator Tattoo Parlor',
		description: 'The foremost spot for ink in the city, the Inkubator is well-known for the detailed and beautiful designs the owner can create, if in the mood. They\'re considered an eccentric, an "artistic temperament" - words used to hide the uneasiness that their demeanour causes in most customers. Still, the genius and patient skill of their work combined with the difficulty of getting them to actually agree to a job ensure high demand, and with it, high prices.',
		borough: 'West',
		influence: 2,
		code: 'W7'
	},
	{
		name: 'Doxley Police Department',
		description: 'The DPD is a modern organization ready to face the demands of a modern era. That\'s what the posters say. In reality, it is an underfunded dead-end job filled by locals who are corrupt more often than not and losers who\'ve been transferred here after pissing off someone in their old precinct. They have long held an understanding with the more organized criminals to keep the city peaceful and the illicit goods flowing through the port.',
		borough: 'West',
		influence: 5,
		code: 'W2'
	},
	{
		name: 'Park of Saints',
		description: 'The park is a beautiful place, one of the few in the city. It\'s split into north and south, one half on each side of the river, with a bridge in between - the northern side is shadowy with corridors of trees and bushes where children love to play, while the southern side is more sculpted with a fountain, benches and arranged paths. Several times business interests have attempted to wrest control of the land, but the locals have opposed determinedly for one main reason. There is a local story that for a relationship to last, the lovers should swear their vows on the old bridge over the river and carve their initials on one of the trees to the north of it. Whether this actually works, nobody can tell, but it is a beloved tradition to many.',
		borough: 'West',
		influence: 2,
		code: 'W3'
	}
];

module.exports = { assets, characters, locations };