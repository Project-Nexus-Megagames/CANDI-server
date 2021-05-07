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
		control: 'Zeta Control'
	},
];

const locations = [
	{
		name: 'Marras Construction',
		description: 'Located in the heart of Doxley, Marras Construction is the premier construction firm in the area.',
		borough: 'Central',
		influence: 10,
		code: 'C1'
	},
	{
		name: 'Gingko\'s Copies',
		description: 'The largest local branch of a regional copyshop, Gingko\'s copies offers the services you might expect. Copies, binding, posters, displays. If you want mass-produced documents, this is the place to get them. It\'s been around for years, but is getting a bit run down. The odd spot on the carpet here, a crooked sign there.',
		borough: 'Central',
		influence: 1,
		code: 'C2'
	},
	{
		name: 'Guardian Angels',
		description: 'A professional bodyguard service run by the Awakened Duncan Buchanan, its employees are easily recognizable by their signature white suits and silver angel wing pins.',
		borough: 'Central',
		influence: 5,
		code: 'C3'
	},
	{
		name: 'Advance Inc. HQ',
		description: 'A modern glass and steel skyscraper, constructed over the span of a mere six (6) months in the heart of Doxley’s civic center. At thirty (30) stories high, Advance Inc.’s HQ towers over the neighboring city hall. To some, it is a symbol of hope; to others, a portent of disaster.',
		borough: 'Central',
		influence: 15,
		code: 'C4'
	},
	{
		name: 'Dewey, Wynn & Howe',
		description: 'A general practice law firm local to the city, first established in 1870. Feared and respected on the outside. On the inside, younger hot shot solicitors chafe under sharing their profits with the old guard, who aren\'t billing as many hours as they used to.',
		borough: 'Central',
		influence: 5,
		code: 'C5'
	},
	{
		name: 'Broad St. Ltd.',
		description: 'In large gold lettering, the words “Broad Street Ltd.” are affixed above the large double doors which serve as the main entrance to this two-story building. Although the building is constructed mainly from brick, the first floor is clad in an elegant stone facade. Although this space has served as the offices of Doxley’s premier real estate investment firm for at least seventy (70) years, the facility remains in excellent repair.',
		borough: 'Central',
		influence: 10,
		code: 'C6'
	},
	{
		name: 'Dawn Bank',
		description: 'A small community bank, legitimately interested in supporting the local community. It has ATMs throughout the city, and a few other branches in surrounding areas, but the downtown office is its beating heart.',
		borough: 'Central',
		influence: 5,
		code: 'C7'
	},
	{
		name: '500 Grove St.',
		description: 'Brick and glass, built circa 1900, in the style of the Chicago school, this office tower is known only by its address. A mix of professionals rent spaces here, doctors, dentists, accountants, lawyers, architects, and the like, either one day hoping to move up to a more prestigious space or resigned to rent at 500 Grove St. until retirement. The ground floor is home to a dizzying array of fast casual eateries, most of which are inexpensive and unremarkable.',
		borough: 'Central',
		influence: 5,
		code: 'C8'
	},
	{
		name: 'Platinum Lofts',
		description: 'High-end condominiums in the center of downtown. Populated by a mix of wealthy retirees looking for something more urban than a nursing home and elite professionals who can\'t be bothered to commute more than five minutes',
		borough: 'Central',
		influence: 5,
		code: 'C9'
	},
	{
		name: 'Hubbard\'s Bespoke',
		description: 'The sort of place you\'d be proud to own a suit from. The clothes, however, are merely a hobby interest for the owner and its staff. Hubbard\'s true nature is an information brokerage, accessible through secret doors in the fitting rooms.',
		borough: 'Central',
		influence: 5,
		code: 'C10'
	},
	{
		name: 'Old Town Cemetery',
		description: 'Where the dead are buried and the living grieve, this Gothic style Cemetary has been around as long as Dusk City with inhabitants so old that records of who they are have been lost to time. Located at the outskirts of the Northern peak of the because nobody wants to live right next to a cemetery. Reports of mysterious noises are exaggerated. You\'d be surprised what information people can dig up, particularly about inhabitants that have been deceased for a period of time. It\'s also the best generic place to contact the dead. ',
		borough: 'North',
		influence: 5,
		code: 'N1'
	},
	{
		name: 'Haven Hospital',
		description: 'Originally Haven Sanitorium, this state-of-the-art hospital still has some dark corners and low-traffic hallways ideal for visits from the Awakened. Feeding couldn’t be easier and deaths are almost always attributed to existing conditions or MRSA.',
		borough: 'North',
		influence: 15,
		code: 'N2'
	},
	{
		name: 'Resurrection Grove Church',
		description: 'A little place of solace, this House of God is far away from the hustle and bustle of the rest of the city. It serves as a sanctuary for the faithful and unfaithful alike. Its namesake tree grove borders the Old Town Cemetery.',
		borough: 'North',
		influence: 5,
		code: 'N3'
	},
	{
		name: 'The Library',
		description: 'A place to read, to relax, and to learn. So long as you\'re quiet and respectful, anyone can come here and enjoy walking through the shelves for their next literary friend. The book club meets on the first Tuesday of every month.',
		borough: 'North',
		influence: 10,
		code: 'N4'
	},
	{
		name: 'Nevermore Bookstore',
		description: 'Old bookshops have strange geography. Why are there so many staircases? Where do they even go? Though the main floor is a typical "modern" bookstore with bestsellers and local author features, the second story houses an impressive collection of rare books and first edition, complete with that delightful old book smell. ',
		borough: 'North',
		influence: 1,
		code: 'N5'
	},
	{
		name: 'Peters Street Cinema',
		description: 'State of the art when it was built 20 years ago, this movie house usually smells like stale popcorn and musty curtains. During the week, it screens whatever the latest blockbuster is to get folks into seats. Thursday Date Night see the latest romance movie and couples refreshment special packages. The weekends are reserved for the owner\'s special events, ranging from series marathons to Quote-A-Longs and more. One of the few cultural preservation landmarks in the city.',
		borough: 'West',
		influence: 1,
		code: 'N6'
	},
	{
		name: 'The Candlewax Club',
		description: 'A grey yorkstone building marked only by an iron plate, embossed with a candlestick holder. While the first floor is windowless, the second floor, by contrast, is lined with windows. Curtains, however, block prying eyes. The primary entry point is a set of walnut double doors.',
		borough: 'North',
		influence: 10,
		code: 'N7'
	},
	{
		name: 'Second Chance Blood Bank',
		description: 'Primary supplier for Haven Hospital, this blood bank takes donations from its human residents, giving them cookies and apple juice to replenish their electrolytes. It\'s a secure facility, completely with motion detectors, reinforced doors, and 24 hour staffing in case of emergencies.',
		borough: 'North',
		influence: 5,
		code: 'N8'
	},
	{
		name: 'Ye Olde Shoppes',
		description: 'Leaning into the historic nature of Old Town, the original commerce hub of Doxley was restored to a mix of modern day and vintage boutiques. Visit the Ripped Bodice Modiste, World Wide Wonders Tech Store, or All in Bloom Florist.',
		borough: 'North',
		influence: 15,
		code: 'N9'
	},

	{
		name: 'The Cannery',
		description: 'This commercial region is based around an old canned goods factory, the Mayhew Cannery. Due in part to it being architectually interesting, the building was preserved after the Cannery was closed for good in the 1980s. The building lay fallow and overgrown over two decades before being refurbished in the late \'00s, old interior spaces made into lots for stores. Though it is still mostly empty, some niche stores and businesses have sprung up attracting a hipster clientele, including a few expensive cafes, boutiques, a street art gallery, an axe-throwing room and a board game cafe.',
		borough: 'East',
		influence: 10,
		code: 'E1'
	},
	{
		name: 'The Youth Centre',
		description: 'The Youth Centre keeps kids off the street and gives them things to do, functioning as an underfunded, dilapidated beacon of hope in some of the poorest parts of the city where antisocial behaviour, and cycles of poverty and crime play out year by year.',
		borough: 'East',
		influence: 3,
		code: 'E2'
	},
	{
		name: 'The Heights',
		description: 'While on paper the area is known as Livingstone Quarter, if you used that name around any of the locals they would probably laugh you out. The Heights are so-named not because of the areas elevation, but in order to mock former mayor Richard Maddox who claimed that the city\'s less well-off needed to aspire to "the heights of humanity". The Heights are known for, and proud of, their diversity. People from every culture, speaking a hundred different languages, live side by side in an area rich with murals and street art, small businesses, and a wealth of both traditional and "fusion" culinary treats. Unfortunately the area is also quite poor, filled with tenement buildings and weapon surrender bins to try and fight the knife epidemic gripping Britain.',
		borough: 'East',
		influence: 10,
		code: 'E3'
	},
	{
		name: 'Parking Lot',
		description: 'In the daytime, it\'s used for precisely what you think it\'s used for - Toyotas with scuffed paint and Volvos overburdened with decorative stickers are parked side by side with twenty-year old Saabs and sports cars a little too nice to belong in Doxley. At night, however, it\'s a hotbed for criminal activities. Drug deals, clandestine meetings, underground fights or even a suspicious death or two - all minded by an attendant and security guard who by this point know better than to poke their nose into all this.',
		borough: 'East',
		influence: 6,
		code: 'E4'
	},
	{
		name: 'Leyland Tower',
		description: 'On the outside, a tower block far tidier than its neighbours. The people inside are well dressed and oddly uniform. They are quiet. Polite. Pale. They mostly don\'t remember the vampire that lives in the top floors and takes his gore-tax from them every so often... Inside, there\'s literal stratification by class, though the richer humans on the upper floors receive much more of Layton\'s personal attentions. Security is unusually high here, and the security guards are all rather huge and subtly disproportionate...',
		borough: 'East',
		influence: 15,
		code: 'E5'
	},
	{
		name: 'Mercury Motors',
		description: 'Most of Doxley\'s industries have dried up or moved away, but there are a few holdouts that remain fairly important employers locally. This automotive factory is facing twin crises in the form of overseas competition and ongoing union disputes. If things get any worse the parent company is likely to move production overseas and should it close there will be a further rise in unemployment, making the factory something of a political football.',
		borough: 'East',
		influence: 10,
		code: 'E6'
	},
	{
		name: 'The Pawn Shop',
		description: 'Sanoh "Sunny" Prasansapakit never seems to sleep; the Awakened should know. The store seems to be genuinely open 24/7. Perhaps it closes when nobody is looking? It\'s a good place for a bargain or for some quick cash if you\'ve got something to sell. You could probably offload stolen goods here, but be careful; Sunny\'s not a fool and won\'t get herself in trouble for you.',
		borough: 'East',
		influence: 5,
		code: 'E7'
	},
	{
		name: 'Grey Market',
		description: 'Not everyone who wants to skirt the law is looking for AK-47s or opiates. Most of them just want things a little bit cheaper and a little bit easier than the legal method would provide for. Far from the high streets and chain stores, the Grey Market specializes in selling secondhand goods, DVDs and software of questionable legality. Here among its wares you\'re likely to find urban treasures the middle classes don\'t even know exists.',
		borough: 'East',
		influence: 5,
		code: 'E8'
	},
	{
		name: 'The White Hart',
		description: 'While Doxley has a good number of pubs, the White Hart is perhaps the most infamous. Rowdy, rambunctious and gently dangerous, the owner is trying to soften the pub\'s image (and clientele). Still, if you\'re looking for a good night out amongst people you can probably count as, if not friends, then at least not enemies, the White Hart is the place to be.',
		borough: 'East',
		influence: 7,
		code: 'E9'
	},
	{
		name: 'The Warrens',
		description: 'Deep beneath the hustle and bustle of Doxley City, deep beneath even its dark and secretive underworld, there lies the lair of those Awakened who can no longer see the light of day. Where the subway, sewers, natural caverns and other subterrean spaces meet, a twisted network like the roots of a tree. It serves as a gathering place for the Brother\'s Wrath, both shelter and stronghold to those who have turned their back on the Slothful, though those who encroach on the Warrens are keenly aware that they do so only with the blessing of Oda Orochi.',
		borough: 'East',
		influence: 15,
		code: 'E10'
	},

	{
		name: 'University of Doxley',
		description: 'The University is a source of pride for the town, and also a source of unending student shenanigans. Many old and traditional student societies hold court here, from hobbyists like the Broadcast Club to politicians, partygoers and everything in between. It\'s not the largest, oldest or most famous institute of higher learning but it is Doxley\'s, and there is nothing wrong with that.',
		borough: 'West',
		influence: 10,
		code: 'W1'
	},
	{
		name: 'Piers',
		description: 'A beautiful walking street near the river mouth and along the seaside, the area attracts tourists with all sorts of local tastes, street food, performers, little gift shops and cafes. Enterprising fishermen offer tours at sea, old crones peddle herbal remedies and handmade scented candles and you can get your fortune read in any of a dozen ways. In one narrow side-street a shop selling all sorts of trinkets for good fortune and health has a reputation among some of the locals. They say the charms here actually work, though the price is not always paid in money.',
		borough: 'West',
		influence: 5,
		code: 'W2'
	},
	{
		name: 'Port of Doxley',
		description: 'The smell of the sea mixes with oil and the constant grind of heavy machinery. The port is the artery of the city, where the real money comes in. Well, nowadays it has been in decline for years as factories and mills have given way to service industry and software engineering. Still, a hefty amount of goods flow in and out daily from smaller cargo vessels that use the facilities to avoid lines and higher fees in larger ports down the coast. Many empty warehouses slowly decay near the river, but some are still in active use and hold the goods of the world ready to be loaded on to trains or trucks and brought to customers all over the nation.',
		borough: 'West',
		influence: 10,
		code: 'W3'
	},
	{
		name: 'Jemison Island',
		description: 'Originally a forested island in treacherous waters near the old harbour, used as a smuggler\'s hideout and on one memorable occasion a jumping-off point for a Viking sack of the city, the waters near Jemison have long since been dredged and charted. The island itself was deforested in a fire some decades ago, rumoured to have been started accidentally by a bunch of young students having gone camping there. Many ghost stories still circulate among the population about how they all either perished in the fire, drowned in the waters or were killed by an ancient protector of the island whom their careless behaviour had angered. The island is off limits to the public by order of the City Hall, though nobody really remembers why.',
		borough: 'West',
		influence: 1,
		code: 'W4'
	},
	{
		name: 'City Slicker Records',
		description: 'At a time when the internet is available to all with its endless collection of free music, and everyone carries their song library around on their phone, there is only one way for CD and vinyl stores to survive - atmosphere. City Slicker is unassuming on the outside, but surprisingly large and well-stocked on the inside with classics and strange, fringe productions alike. The kind of people who want what it offers know where it is, and that\'s enough to keep the lights on. The owner is a charming, polite fellow with encyclopedic knowledge of what seems to be every possible kind of music, and a melodic voice that sounds just a little familiar to most, though nobody can seem to place why exactly that would be.',
		borough: 'West',
		influence: 5,
		code: 'W5'
	},
	{
		name: 'Inkubator Tattoo Parlor',
		description: 'The foremost spot for ink in the city, the Inkubator is well-known for the detailed and beautiful designs the owner can create, if in the mood. They\'re considered an eccentric, an "artistic temperament" - words used to hide the uneasiness that their demeanour causes in most customers. Still, the genius and patient skill of their work combined with the difficulty of getting them to actually agree to a job ensure high demand, and with it, high prices.',
		borough: 'West',
		influence: 5,
		code: 'W6'
	},
	{
		name: 'Doxley Police Department',
		description: 'The DPD is a modern organization ready to face the demands of a modern era. That\'s what the posters say. In reality, it is an underfunded dead-end job filled by locals who are corrupt more often than not and losers who\'ve been transferred here after pissing off someone in their old precinct. They have long held an understanding with the more organized criminals to keep the city peaceful and the illicit goods flowing through the port.',
		borough: 'West',
		influence: 10,
		code: 'W7'
	},
	{
		name: 'Park of Saints',
		description: 'The park is a beautiful place, one of the few in the city. It\'s split into north and south, one half on each side of the river, with a bridge in between - the northern side is shadowy with corridors of trees and bushes where children love to play, while the southern side is more sculpted with a fountain, benches and arranged paths. Several times business interests have attempted to wrest control of the land, but the locals have opposed determinedly for one main reason. There is a local story that for a relationship to last, the lovers should swear their vows on the old bridge over the river and carve their initials on one of the trees to the north of it. Whether this actually works, nobody can tell, but it is a beloved tradition to many.',
		borough: 'West',
		influence: 5,
		code: 'W8'
	},
	{
		name: 'Kaufmann Coffee',
		description: 'An independent, cozy cafe / coffee house right in the middle of the best tourist streets, the Kaufmann coffee has been serving customers since the wars. Recently the son of the original owner has taken over and he\'s gotten it in his head that he needs to liven the place up a bit. He has made several attempts, from purchasing a board game collection to allowing their two pet cats free reign to roam in the shop - some find it charming, others think that he is trying too much and ruining the calm atmosphere.',
		borough: 'West',
		influence: 1,
		code: 'W9'
	},
	{
		name: 'Homeless Shelter',
		description: 'A building donated to a foundation by an unknown philanthropist, this "blight on the neighbourhood" as some residents call it is a shelter for the homeless, providing food and a roof for those most in need. There is never enough space for everyone, but the understaffed volunteers do what they can - presumably out of the kindness of their hearts.',
		borough: 'West',
		influence: 5,
		code: 'W10'
	},
	{
		name: 'Leyford Wharf',
		description: 'The Doxley Shipping Company initially built this as a means for transporting goods and materials between the city’s main port and industries up river. The advent of containerisation and decline in the city’s industrial heart saw this area closed in the early 1980s, resulting in significant job losses.',
		borough: 'South',
		influence: 10,
		code: 'S1'
	},
	{
		name: 'Doxley Grand Station',
		description: 'Although not as grand as its name might suggest, Doxley Grand is where all mass transport in and out of the city gets routed through. Standing next to this is its partner, the Doxley City Bus Station. The administrative offices of Doxley City Coaches Ltd and some privately let offices are housed on the upper floors.',
		borough: 'South',
		influence: 10,
		code: 'S2'
	},
	{
		name: 'The Solstice Theatre',
		description: 'The Solstice Theatre was founded shortly before WW1, though its glossy exterior hides that truth well. With the city only having a single theatre, its schedule gets astonishingly full. From plays to ballets to magic shows, there\'s something on every day sure to entertain the whole family, with theatre owner Reggie Royce taking to the show each week as "The Magnificent Prospero".',
		borough: 'South',
		influence: 10,
		code: 'S3'
	},
	{
		name: 'The Empress Hotel & Spa',
		description: 'From the outside the Empress Hotel looks unimpressive, built utilising vast amounts of grey concrete and resembling nothing less than a giant grey cube. The hotel’s distinctive shape makes it hard to miss, though it at least boasts wonderful views of downtown Doxley and, on a good day, the sea. Its central location is also a major selling point, giving it close proximity to the downtown\'s bevy of shops, restaurants, and entertainment options.',
		borough: 'South',
		influence: 5,
		code: 'S4'
	},
	{
		name: 'Doxley Local TV Station',
		description: 'The TV station’s home is a small local replica of London’s Broadcasting House. The Doxley Local network is, as expected, the local TV channel. Programming consists of reruns, a few original shows, and the Doxley News (which typically covers breaking news, interest stories, and the weather).',
		borough: 'South',
		influence: 10,
		code: 'S5'
	},
	{
		name: 'Horst Tower',
		description: 'A recent construction that was Doxley\'s answer to the Gherkin or Tulip; the building has become a recognisable landmark dominating the skyline of Downtown. The top floors are owned by and used exclusively by Helga Adler, CEO of Æ. This has led to the building being nicknamed “The Roost”, as she is believed to never leave.',
		borough: 'South',
		influence: 15,
		code: 'S6'
	},
	{
		name: 'Clover Lounge',
		description: 'Clover Lounge is not an easy place to find, unless you know what you\'re looking for or need to be there. It\'s a chimeric location: part performance space, part living room, part cruise-a-thon, and part saloon.',
		borough: 'South',
		influence: 1,
		code: 'S7'
	},
	{
		name: 'The Garden of Hesperides',
		description: 'The Garden is the place to see and be seen, as well as eat to your heart\'s content. The décor resembles a traditional Taverna, extended into an open-air dining space populated with cypress trees and vine covered trellises. Meals are served prix fixe, with special care taken by both the chef and owner to ensure every dish is to the customer\'s satisfaction.',
		borough: 'South',
		influence: 1,
		code: 'S8'
	},
	{
		name: 'Thirst',
		description: 'Thirst is a combination bar and nightclub. With one main dance floor and two smaller sub-floors, Thirst\'s atmosphere is dominated by high-tempo and beat heavy dance music for clubgoers to lose themselves in.',
		borough: 'South',
		influence: 1,
		code: 'S9'
	},
	{
		name: 'The Peak',
		description: 'Located within substantial grounds at the edge of Downtown, La Cime is a privately owned club. It maintains a strict membership quota and admittance is granted only by invitation or sponsorship. Nominally a sports club for those who can afford it, it\'s more of a meeting place for the rich and powerful.',
		borough: 'South',
		influence: 5,
		code: 'S10'
	},

	{
		name: 'The Warrens',
		description: 'Deep beneath the hustle and bustle of Doxley City, deep beneath even its dark and secretive underworld, there lies the lair of those Awakened who can no longer see the light of day. Where the subway, sewers, natural caverns and other subterrean spaces meet, a twisted network like the roots of a tree.',
		borough: 'Miscellaneous',
		influence: 10,
		code: 'M1'
	},
	{
		name: 'Doxley Dark Forum',
		description: 'Originally a website and forum to post about strange and supposedly supernatural circumstances in the city of Doxley, Doxley Dark has become a breeding ground for conspiracy theories and supernatural debunking.',
		borough: 'Miscellaneous',
		influence: 1,
		code: 'M2'
	},
	{
		name: 'The Grove',
		description: 'The Keeper’s residence, and the sanctuary that houses the Tree of Life. Nobody knows precisely where it’s located in Doxley City, only that entrance is forbidden to all but those considered “worthy” by its Keeper.',
		borough: 'Miscellaneous',
		influence: 15,
		code: 'M3'
	}
];

module.exports = { assets, characters, locations };