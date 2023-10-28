/*
This file is provided to Game Control before a PbEM game is run on CANDI in order to allow Control team to upload their characters to CANDI while Scott
Figures out his shit.


example PC
     {
        "playerName": "Shona",
        "characterName": "Agatha Highthorn",
        "username": "shona.jemphrey@gmail.com", <- if unknown, leave as "temp". If you know your nexus username, leave it in your Control entry
        "characterTitle": "Head of Thinkosophy", <- Many PbEm games like to make their characters as "archetypes" before casting (ex 'The Champion', 'The Thief'). This is provided if you choose to organize you game this way
        "pronouns": "She/Her",
        "bio": "Mrs Highthorn is a relatively new arrival in AM, here to take charge of the Department of Thinkosophy. But despite her newness, she\'s no shrinking violet. She wants to put Thinkosophy and witchhood on the map, and she doesn\'t mind making a few enemies along the way.",
        "email": "shonajemphreymegagame@gmail.com", <- this is defferent from the Player\'s Nexus email. They can be the same but players are free to make different emails listed here on CANDI
        "wiki": "", <- If you have a wiki link for characters, you can fill this field out with a link to the wiki page ex
        "timeZone": "UK", <- This is just nice to have but not mandatory. If unknown leave as ""
        "tags": [ <- fill with as many or as few tags as you please. A Character tagged as "Public" will appear to all other PCs, so it is mandatory (unless you have secret PCs/NPCs)
            "PC",
            "Public",
            "Witches",
            "Invisible College",
            "Werewolves"
        ],
        "control": [
            "College Porter Control" <- Match the name of the Controller exactly for automatic email filling. Game Control will automatically be added to email copying on CANDI, so leave them out of this field
        ],
    },
*/


const control = [
	{
		playerName: 'Scott',
		pronouns: 'He/Him',
		characterName:'Tech Support',
		tags: ['Tech Support', 'Control'],
		email: 'scott.megagames@gmail.com',
		timeZone: 'PT',
		bio: 'They call me the Bug Master cause I make only bugs.',
		username: 'BobtheNinjaMan',
		control: ['Scott']
	},
	{
		playerName: 'Shona',
		pronouns: 'she/her',
		characterName: 'Game Control',
		tags: ['Control', 'Game Control', 'Public'],
		email: 'shonajemphreymegagame@gmail.com',
		timeZone: 'UK',
		bio: 'Game Control',
		username: 'shonabalona',
		control: []
	},
	{
		playerName: 'Maggie',
		pronouns: 'she/her',
		characterName: 'Underfolk Control',
		tags: ['Control', 'Underfolk Control', 'Public'],
		email: 'megaloshelicopteros@gmail.com',
		timeZone: 'EST',
		bio: 'Underfolk Control',
		username: 'loshelicopteros',
		control: []
	},
	{
		playerName: 'Justin',
		pronouns: 'he/him',
		characterName: 'Generals Faction Control',
		tags: ['Control', 'Generals Faction Control', 'Public'],
		email: 'jstatmegagames@gmail.com',
		timeZone: 'UK',
		bio: 'Generals Faction Control',
		username: 'danpeppercorn',
		control: []
	},
	{
		playerName: 'Ben',
		pronouns: 'he/him',
		characterName: 'Quarter Masters Control',
		tags: ['Control', 'Public', 'Quarter Masters Control'],
		email: 'bdurodie@gmail.com',
		timeZone: 'UK',
		bio: 'Quarter Masters Control',
		username: 'kheledakos',
		control: []
	},
	{
		playerName: 'Pete',
		pronouns: 'he/him',
		characterName: 'Off-City Control',
		tags: ['Control', 'Public', 'Off-City Control'],
		email: 'helazolteotl@gmail.com',
		timeZone: 'UK',
		bio: 'Off-City Control',
		username: 'helazolteotl',
		control: []
	}
];

const pcs = [
	{
		playerName: 'PLAYER_REAL_NAME_HERE',
		pronouns: 'He/Him',
		characterName:'PC_CHARACTER_NAME_HERE',
		characterTitle: 'CHARACTER_TITLE_HERE',
		tags: ['PC', 'Public'],
		email: 'temp@temp.com',
		timeZone: 'PT',
		bio: 'BIO_INFO_HERE',
		username: 'temp',
		control: ['CONTROL_NAME_HERE']
	}
];

const npcs = [
	{
		playerName: 'Helmsman Cor',
		pronouns: 'he/them',
		characterName: 'Helmsman Cor',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'shonajemphreymegagame+cor@gmail.com',
		timeZone: 'UK',
		bio: 'Baron of the Wheel. Responsible for implementing the navigation and direction of Tarira, the Helmsman is one of the most important nobles. The General may make decisions as to where Tarira should go next, but it\'s the Helmsman who advises him and then makes his orders reality. Also sponsors the annual Helsman\'s Race. Helmsman Cor has a reputation for being grumpy and no-nonsense, but very good at their job. He is father to Muira Corentin.',
		control: ['Game Control']
	},
	{
		playerName: 'Muira Corentin',
		pronouns: 'she/her',
		characterName: 'Muira Corentin',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'shonajemphreymegagame+muira@gmail.com',
		timeZone: 'UK',
		bio: 'Daughter to Helmsman Cor and one of the favourites to win the Helmsman\'s race - reading the skies runs in her blood. On the rare occasions Muira is away from her skiff, she\'ll be in one of the bars popular with racers or other young nobles, swapping stories and dares of derring-do. She loves an adventure and has little patience for responsibility or duty.',
		control: ['Game Control']
	},
	{
		playerName: 'Duchess Abilla Vello',
		pronouns: 'she/her',
		characterName: 'Duchess Abilla Vello',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'shonajemphreymegagame+abilla@gmail.com',
		timeZone: 'UK',
		bio: 'Duchess of the Starboard Jibs. Responsible for the overall management of Dust in the city, Chancellor Abilla Vello is one of the closest advisors of Arxduke Nyccrassi Scudo. It\'s said that what Chancellor Vello doesn\'t know about Dust isn\'t worth knowing. She has a reputation for being sharp, hard-working, and not easily impressed.',
		control: ['Game Control']
	},
	{
		playerName: 'Canta the Bard',
		pronouns: 'she/her',
		characterName: 'Canta the Bard',
		tags: ['NPC', 'Public'],
		email: 'shonajemphreymegagame+canta@gmail.com',
		timeZone: 'UK',
		bio: 'The most popular bard in Tarira, Canta can be found in all parts of the city, whether entertaining nobility, swapping songs with the Underfolk, or listening to visiting traders. She\'s never without her trusty lute and is quick with a smile or a listening ear. She knows a little bit of everyone and everything going on. Canta is designed to be our Helper NPC. If you feel stuck or want advice you can ask her, either in or out of character. She can still be befriended or offended, like other NPCs, but she is fundamentally helpful and will still give you advice even if you upset her.',
		control: ['Game Control']
	},
	{
		playerName: 'Lord Lerren Filscudo',
		pronouns: 'he/him',
		characterName: 'Lord Lerren Filscudo',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'shonajemphreymegagame+lerren@gmail.com',
		timeZone: 'UK',
		bio: 'Lord of the Lesser Bilge. Originally from the Guts amongst the Underfolk, Lord Lerren Filscudo showed such promise with Dust that he was adopted into House Scudo of the Quorum as a teen. He is now Chief Processor and responsible for overseeing the processing and packaging systems of raw Dust, to get it ready to be traded with merchants, land-dwellers, and the Yarrain.',
		control: ['Game Control']
	},
	{
		playerName: 'Viscount Conos Istor',
		pronouns: 'they/them',
		characterName: 'Viscount Conos Istor',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'shonajemphreymegagame+conos@gmail.com',
		timeZone: 'UK',
		bio: 'Viscount of the Portside Topsails, and the most respected legal expert in the city. Tomekeeper Conos Istor advises Thane Messr Kreeg of the Keel, the head of justice, and keeps track of all laws and customs within Tarira.',
		control: ['Game Control']
	},
	{
		playerName: 'Dair',
		pronouns: 'he/him',
		characterName: 'Dair',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'shonajemphreymegagame+dair@gmail.com',
		timeZone: 'UK',
		bio: 'One of the many Underfolk toiling away in the Guts, this young man is starting to get noticed for his quick-thinking and sheer smarts.',
		control: ['Game Control']
	},
	{
		playerName: 'Orvando Plume',
		pronouns: 'he/they',
		characterName: 'Orvando Plume',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'shonajemphreymegagame+orvando@gmail.com',
		timeZone: 'UK',
		bio: 'The most eminent and sought-after hatmaker in the city; the most stylish of the nobility get their headgear almost exclusively from Orvando Plume\'s hatshop The Fanciest Feather, located in one of the most fashionable shopping districts on the sun-side of the city. They love designing hats and getting hot gossip.',
		control: ['Game Control']
	},
	{
		playerName: 'Phirroa of Mhara',
		pronouns: 'she/her',
		characterName: 'Phirroa of Mhara',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'shonajemphreymegagame+phirroa@gmail.com',
		timeZone: 'UK',
		bio: 'Initially from Mhara (the next biggest flying city after Tarira), she married the Marxionix Nephethara Heqa eighteen years ago in a political marriage to cement peace between Tarira and Mhara following the Battle of the Mountains. Now Phirroa and Nephethara spend six months of the year together - three months each in each other\'s cities. Phirroa has chosen not to take a Tariran title, and spends most of time on Tarira in her wife\'s household, showing little interest for the gossip and dramas of court. She is currently in the middle of one of her three-month stints on board Tarira.',
		control: ['Game Control']
	},
	{
		playerName: 'Arxduke Nyccrssi Scudo',
		pronouns: 'he/him',
		characterName: 'Arxduke Nyccrssi Scudo',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+nyccrassi@gmail.com',
		timeZone: 'UK',
		bio: 'The Quarter Master of the Exchequer, Arxduke Nyccrassi Scudo of the Quarterdecks is responsible for fiscal policy and taxation. Known as the richest man on Tarira and the longest-serving member of the Quorum, he is widely regarded as the first among equals of the Quarter Masters despite the official position that all decisions are made unanimously. He is said to have smiled only once in his life, and it was certainly not at his wedding to High Thunderer DuBourde Ourane Tagorre. While the Arxduke is rarely seen about the city, he regularly opens the doors of the Quarter Citadel\'s Belfry tower to petitioners.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Marxionix Nephethara Heqa',
		pronouns: 'she/her',
		characterName: 'Marxionix Nephethara Heqa',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+nephethara@gmail.com',
		timeZone: 'UK',
		bio: 'The Quarter Mistress of Exopolitan Treaties and Charters, Marxionix Nephethara Heqa of the Starboard Hangar Docks is a merchant princess who stands at the forefront of international trade. Although she spends much of her year abroad, most recently returning from a sojourn with one of her spouses, the Marxionix currently resides on Tarira with her wife, Phirroa of Mhara, as part of a political arrangement. The Marxionix regularly tours the Starboard Markets, where merchants compete to catch her eye in the hopes of being rewarded with a prestigious spot in the Marx Palatine.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Eorl Nemoutis Scept',
		pronouns: 'any/any',
		characterName: 'Eorl Nemoutis Scept',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+nemoutis@gmail.com',
		timeZone: 'UK',
		bio: 'The Ambassador Extraordinary and Plenipotentiary of Tarira, Eorl Nemoutis Scept of the Topgallant Signal Yard is the city\'s foremost diplomat and an expert in international relations. They have spent time living among the Mharans, Halam, Yarrain, and Keldans, becoming familiar with their ways. When on Tarira, the Eorl conducts their business from the Tariran Topgallant Embassy at the pinnacle of the Fourum of the Winds.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Vydame Sertor Vasc',
		pronouns: 'he/him',
		characterName: 'Vydame Sertor Vasc',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+sertor@gmail.com',
		timeZone: 'UK',
		bio: 'The Quintarx of the Heavens and Herald of the Moon and Stars, Vydame Sertor Vasc of the Forecastle is one of the five high priests of Quintessence, the faith of elemental harmony which was superseded as the state religion two centuries ago. Now that many Tarirans regard his faith as old-fashioned, the Herald has turned his attention to preaching the message of balance among the elements to other nations.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Comtessa Ourelea Kalyx',
		pronouns: 'she/her',
		characterName: 'Comtessa Ourelea Kalyx',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+ourelea@gmail.com',
		timeZone: 'UK',
		bio: 'The Quarter Mistress of the Candescent Creed, Comtessa Ourelea Kalyx of the Port Promenade Gallery is the spiritual heart of Tarira. She is the Pontiphoenix of Air and Fire, head of the state religion and a beacon of faith to the followers of the Creed. Famed for her passionate oratory, every morning hundreds gather in the Crucible to hear the Pontiphoenix\'s dawn address. As long as the sun is above the horizon, she can be found in the Crucible.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Viscomte Ptolemi Kalyx',
		pronouns: 'he/they',
		characterName: 'Viscomte Ptolemi Kalyx',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+ptolemi@gmail.com',
		timeZone: 'UK',
		bio: 'A disgraced Pyraetor of the Candescent Creed, Viscomte Ptolemi Kalyx of the Shrouds is known as the Knave of Cups. The black sheep of House Kalyx of the Quorum, his profligate and hedonistic pursuits have resulted in numerous scandals - much to the ire of his mother, Comtessa Ourelea Kalyx. Showing little regard for their responsibilities, Ptolemi can typically be found in their cups in one of the Aft Wardrooms or The Long Haul.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Cirra Zygismond',
		pronouns: 'they/them',
		characterName: 'Cirra Zygismond',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+zygismond@gmail.com',
		timeZone: 'UK',
		bio: 'One of the nine Igknights of the Crucible, Cirra Zygismond has sworn the Oath of Igknightion, forsaking family and rank to serve a nine-year vigil as honour guard to the Pontiphoenix and the Crucible. Although Zygismond never speaks of their life before being Igknighted, it is known that the most devout and skilled swordmasters are selected from underfolk and nobility alike, with those that survive the vigil granted demesnes and titles - the highest honour being adoption into House Kalyx of the Quorum.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Urgrave Messr Luungez',
		pronouns: 'they/them',
		characterName: 'Urgrave Messr Luungez',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+luungez@gmail.com',
		timeZone: 'UK',
		bio: 'The Quarter Master of the Articles of Agreement, Urgrave Messr Luungez of the Primary Stokehold is the guardian of the high law and heraldry of Tarira. Lucky to escape with their life from the Saebelzanna airship disaster that decimated House Messr of the Quorum nearly three years ago, they have become a recluse, sequestering themselves aboard their private air-yacht, Mezzanox, and refusing all visitors.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Thane Messr Kreeg',
		pronouns: 'they/them',
		characterName: 'Thane Messr Kreeg',
		tags: ['NPC', 'Public', 'Quarter Masters Faction'],
		email: 'bdurodie+kreeg@gmail.com',
		timeZone: 'UK',
		bio: 'The Boatswain of the High Bar, Thane Messr Kreeg of the Keel is the head of administrative, criminal, and tortious justice on Tarira. Their staunch adherence to the letter of the law has earned them the unofficial title of "No-Quarter Master". Since their sibling-by-law, Urgrave Messr Luungez, withdrew from public life, their ceremonial executioner\'s mask has also become the face of House Messr of the Quorum. When not presiding over the tribunals of the High Bar, they can be found in their chambers in the Flying Jibbet - though any visitors with legal queries are asked to direct these to the Senior Clerk and Tomekeeper, Viscount Conos Istor.',
		control: ['Quarter Masters Control']
	},
	{
		playerName: 'Postmaster Ames Corbeau',
		pronouns: 'she/her',
		characterName: 'Postmaster Ames Corbeau',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+postmaster@gmail.com',
		timeZone: 'UK',
		bio: 'One of few Keldans permanently in residence upon Tarira, Corbeau manages the Starboard Hangar Docks with meticulous care under contract to House Heqa. Some suggest this involves the direction of goods towards Tarira\'s black markets, though the Postmaster herself would plausibly deny this speculation. What isn\'t known is exactly how much she knows about the goings on of the city; it could reasonably be assumed to be a lot.',
		control: ['Off-City Control']
	},
	{
		playerName: 'Captain Mec Coraggioso',
		pronouns: 'he/him',
		characterName: 'Captain Mec Coraggioso',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+captain@gmail.com',
		timeZone: 'UK',
		bio: 'The name upon the tip of every budding captain, Captain Mec is legendary aboard Tarira for his many tales of derring-do and adventures worthy of a Sword Saint.',
		control: ['Off-City Control']
	},
	{
		playerName: 'Burre Marchand',
		pronouns: 'he/him',
		characterName: 'Burre Marchand',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+burre@gmail.com',
		timeZone: 'UK',
		bio: 'A claimed merchant and purveyor of indisputable wares. Always nurturing a fresh enterprise, his ship is impossible to miss as it sidles up to Tarira with intent. If he doesn\'t have what you\'re looking for now, he\'ll have something maybe close to it within the week.',
		control: ['Off-City Control']
	},
	{
		playerName: 'The Fishmongers',
		pronouns: '',
		characterName: 'The Fishmongers',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+fishmongers@gmail.com',
		timeZone: 'UK',
		bio: 'Hardy visitors from Yarrain, there are few better sources of cheap and probably legal produce aboard the city. Those who seek them will tend to smell their ship prior to seeing its brightly coloured piscine balloon.',
		control: ['Off-City Control']
	},
	{
		playerName: 'The Incandescent Order',
		pronouns: '',
		characterName: 'The Incandescent Order',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+incandescent@gmail.com',
		timeZone: 'UK',
		bio: 'Such heavily armoured mercenaries are unwelcome upon many ships, relegating the few remaining Igknights of the Incandescent Order primarily to their own reinforced skiff, the Lamort de Lonneur. Despite their solemnity, the services of the Order are available for a nominal fee, often brokered by their entirely unsolemn squire, Magna.',
		control: ['Off-City Control']
	},
	{
		playerName: 'Sweaty Hans & the Stalwart Band',
		pronouns: '',
		characterName: 'Sweaty Hans & the Stalwart Band',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+sweaty@gmail.com',
		timeZone: 'UK',
		bio: 'By no means the only smugglers present aboard Tarira, yet perhaps the most notorious. It\'s a common sight when the city nears larger land-based communities to witness their nimble barque Coyote Dream mooching about the metropolitan keel.',
		control: ['Off-City Control']
	},
	{
		playerName: 'The Observateurs',
		pronouns: '',
		characterName: 'The Observateurs',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+observateurs@gmail.com',
		timeZone: 'UK',
		bio: 'Avid avian enthusiasts from Mhara, the shabby and guano laden vessel of the Observateurs can be routinely observed on its orbit about Tarira as they pursue their passion.',
		control: ['Off-City Control']
	},
	{
		playerName: 'The Baboons',
		pronouns: 'they/them',
		characterName: 'The Baboons',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+baboons@gmail.com',
		timeZone: 'UK',
		bio: 'Few are certain where they came from, or how they learnt the intricate workings of an airship, yet the Baboons have mastered the skies nonetheless. Seemingly impossible to dislodge from their haunts about the hangars and markets, they reduce the value of docking fees and act a general nuisance.',
		control: ['Off-City Control']
	},
	{
		playerName: 'Tool Scavengers',
		pronouns: ' ',
		characterName: 'Tool Scavengers',
		tags: ['NPC', 'Public', 'Off-City'],
		email: 'helazolteotl+tool@gmail.com',
		timeZone: 'UK',
		bio: 'Haunting the lower hulls of Tarira is a scarcely legal mess of a ship, irregular in shape and unpredictable, as if designed by thieving children. Inhabiting the ship are a collective of "budding engineers", often kept occupied with complicated mechanical puzzles within the Guts, and occasionally filching portions of Tarira.',
		control: ['Off-City Control']
	},
	{
		playerName: 'Luna Mara, Lady of Lightning',
		pronouns: 'she/her',
		characterName: 'Luna Mara, Lady of Lightning',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+luna@gmail.com',
		timeZone: 'UK',
		bio: 'Luna Mara, Lady of Lightning, Admiral of the Skiffs, Comtesse of the Portward Pennants, has recently acquired the position of Lady of Lightning after winning a ship-duel with the previous Lord of Lightning - whom she then rescued from his own falling barque. She now commands the many squadrons of combat ships and platoons of skirmishing infantry that guard Tarira from pirates and foes. Luna\'s popularity is ensured by her swashbuckling reputation, her lineage as the daughter of a bravely-sacrificed war heroine, and her bold and entertaining displays of skill in both fighter skiffs and her elegant corvette The Bolt from the Blue. Yet to marry, she is considered one of the most eligible nobles in the court.',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'General Remy Sarabande',
		pronouns: 'he/him',
		characterName: 'General Remy Sarabande',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+remy@gmail.com',
		timeZone: 'UK',
		bio: 'The great and glorious General of Tarira, Commander of the Ships, Anchor of City, Master of the Helm and Lord of the Lodestone is the city\'s head of state, and a stable hand at the wheel for the past seven years. A proud but outgoing man, Sarabande has had many triumphs, both military and social, and his appointment by his predecessor - General Chiara Tambaliotti - was seen as inevitable. He is known for his respect of martial valour and of the fine arts alike, though he is known to observe "Fortune favours the brave, but abandons the foolish".',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'DuBourde Ourane Tagorre, The High Thunderer',
		pronouns: 'they/them',
		characterName: 'DuBourde Ourane Tagorre, The High Thunderer',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+dubourde@gmail.com',
		timeZone: 'UK',
		bio: 'DuBourde Ourane Tagorre, the High Thunderer, Commander of the Artillery, Doge of the Great Sea of Hulls, Armourer of the Lodestone, Wearer of Stormclouds commands the strategic resources and capital ships that define the majestic power of Tarira. Such is their bravery, level-headedness and grasp of tactics that they were considered a match for Quarter Master Nyccrassi Scudo, and the two were married during a time of high tension between the General and the Quarter Masters. There is none in the Court who can match them in strategic matters, both within the city and beyond.',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Laurent Vallencoin and Emiliano Corvanez, the Laureate and the Aesthete',
		pronouns: 'they/them and he/him',
		characterName: 'Laurent Vallencoin and Emiliano Corvanez, the Laureate and the Aesthete',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+lauriesthete@gmail.com',
		timeZone: 'UK',
		bio: 'Equal in rank and dignity to the Lady of Lightning and the High Thunderer, Laureate Vallencoin and Aesthete Corvanez oversee the Splendour of Tarira, holding court together in the Filigree Auditorium. Vallencoin presides over literature and performance, while Corvanez is the master of fashion, art and interior design, and their tastes, though both immeasurably refined and exquisitely exacting, have been known to be at odds',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Duchess Olanda Bella Ornella di Aspro',
		pronouns: 'she/her',
		characterName: 'Duchess Olanda Bella Ornella di Aspro',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+olanda@gmail.com',
		timeZone: 'UK',
		bio: 'The Duchess of the Iron Fairleads and the Great Works of the Sky, Master of Masons and Sculptors, nicknamed "The Stone Duchess", is pious, dignified, stern, and the perfect model of a noblewoman. The eldest of five, she has acted as a social constant for over two decades, often the one to break a scandal - in the most dignified way possible, of course - but never at the heart of one. Thanks to her family\'s ownership of the increasingly-fashionable statuaries in the Great Works of the Sky, she has long been considered deeply eligible, but many have wondered if there is a spouse in Tarira who could withstand her.',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Raphael de la Bourrasque du Ciel-Fauconet',
		pronouns: 'he/him',
		characterName: 'Raphael de la Bourrasque du Ciel-Fauconet',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+raphael@gmail.com',
		timeZone: 'UK',
		bio: 'Baron of For\'ard Bowsprits and Dragoon Commander of the General\'s Narrow Skiffs, Raphael is wealthy, handsome, and supremely confident. A second son, he spent his youth fencing and racing, before seizing the Barony in a duel with his elder brother - although since then, his lifestyle has not changed much. His beloved ship, the Pavo Real Argente, has its hull plated entirely in chrome, giving it a dazzlingly flashy appearance when it catches the sun, yet when it is soaring in the sky, there are times it is almost spectral. Because of this, the Baron du Ciel-Fauconet is known in racing circles as "The Chromesmith".',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Signor Mitrien Dulacque',
		pronouns: 'he/him',
		characterName: 'Signor Mitrien Dulacque',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+mitrien@gmail.com',
		timeZone: 'UK',
		bio: '',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Bernardo DiSogno',
		pronouns: 'they/them',
		characterName: 'Bernardo DiSogno',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+bernardo@gmail.com',
		timeZone: 'UK',
		bio: 'Bernardo DiSogno, Lieutenant of Swords, trains soldiers and gentlefolk alike in the art of bladesmanship. A prodigal duellist and masterful gambler, they appeared in Tarira around seven years ago, and soon the most eligible and passionate of Tarira\'s nobility were falling at their feet. They remain unmarried, but never want for company, living in a louche kind of luxury surrounded by friends and more, yet always welcoming newcomers for wine, song, and games of chance.',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Count Leo Guillaume Grosgras',
		pronouns: 'he/they',
		characterName: 'Count Leo Guillaume Grosgras',
		tags: ['NPC', 'Public', 'Generals Faction'],
		email: 'jstatmegagames+leo@gmail.com',
		timeZone: 'UK',
		bio: 'Count of the Pavilion of the Manufactory of Chain, Count Leo has always been a regular of the literary and philosophical circles of Tarira, frequenting every reading and symposium of note, but also seeking the lively debates of the taverns and coffee houses snubbed by high society. They have published a number of very worthy novels and poetic volumes at their own expense, to reasonable acclaim. Recently, they have withdrawn from lavish Stravaganzas, and are more rarely seen in the company of their fellow nobles.',
		control: ['Generals Faction Control']
	},
	{
		playerName: 'Benedict About',
		pronouns: 'he/him',
		characterName: 'Benedict About',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+about@gmail.com',
		timeZone: 'EST',
		bio: 'A young up-and-comer among the Riggers, Benedict is a favourite of anyone strolling Sunside due to his eye-catching acrobatics on the ropes and deft navigation of the nets and chains laced between the many masts of Tarira. A friend to his fellows, he stands at the ready to help deliver a message or put on a show.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Over-Warden Chimenti Malpiero',
		pronouns: 'they/them',
		characterName: 'Over-Warden Chimenti Malpiero',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+chimenti@gmail.com',
		timeZone: 'EST',
		bio: 'Don\'t listen to the rumours. No matter what they say about their so-called "shameful" military service record or their allegedly "over zealous" attitude toward the Rigs, Over-Warden Malpiero is the only thing standing between the sails of the city and utter chaos. You\'re welcome. ',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Under-Archartificer Audebert Daucourt',
		pronouns: 'he/him',
		characterName: 'Under-Archartificer Audebert Daucourt',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+daucourt@gmail.com',
		timeZone: 'EST',
		bio: 'A brilliant engineer, Under-Archartificer Daucourt has been entrusted with the responsibility to monitor and care for all the various mechanical elements in the Guts that keep Tarira up and running. In recent years, he has grown reclusive and is rarely seen leaving his workshop.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Felice Valier',
		pronouns: 'he/him',
		characterName: 'Felice Valier',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+felice@gmail.com',
		timeZone: 'EST',
		bio: 'Dust processing can be a dangerous job, but someone\'s gotta do it. Felice Vallier is one such someone. Despite his best quality often being cited as "at least he tries," Felice\'s effort has recently led to his elevation from Man Who Lifts Things to Dust Packaging Supervisor by House Scudo.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Dolce Singolare',
		pronouns: 'she/her',
		characterName: 'Dolce Singolare',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+dolce@gmail.com',
		timeZone: 'EST',
		bio: 'Just because Dolce works clearing out the collected filth of the ship and sky in the Bilge doesn\'t mean she has to stay in the gutter. Deeply spiritual, Dolce has focused on chronicling the history of the Underfolk as an act of service, making her an unofficial figurehead in the lower decks.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Inspector Nezetta Guilloux',
		pronouns: 'she/her',
		characterName: 'Inspector Nezetta Guilloux',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+inspector@gmail.com',
		timeZone: 'EST',
		bio: 'An agent of House Messr, Inspector Guilloux serves as a stalwart enforcer of the Vocational Safety Protocol. Cold and exacting, she is a frequent sight in all places the Underfolk dwell to make sure all life and limbs remain firmly intact and ready to continue serving Tarira.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'The Fog Commander',
		pronouns: 'unknown',
		characterName: 'The Fog Commander',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+fog@gmail.com',
		timeZone: 'EST',
		bio: 'While some say that the Fog Commander is just the latest boogeyman, those who have flirted with the Seedy Underbelly of Tarira know full well that they are real and they are deadly effective. Elusive as their name suggests, the Fog Commander runs the Tariran black market and maintains their control with ruthless efficiency. Difficult to reach, one\'s best bet in connecting with the Commander is a well placed whisper or scroll left in a bottle dangling over the edge of the ship. But usually? If they want to talk to you, they\'ll find you.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'The Society Society',
		pronouns: 'many',
		characterName: 'The Society Society',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+society@gmail.com',
		timeZone: 'EST',
		bio: 'The nobility expects their servants to be unseen and unheard during their working hours. And they are! But in their off hours, they can be as visible and chatty as they please - particularly the members of the Society Society. Though the membership rotates, this group of servants can almost always be found drinking and gossiping at the Long Haul Pub.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'Dashing Tintoes',
		pronouns: 'she/her',
		characterName: 'Dashing Tintoes',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'megaloshelicopteros+tintoes@gmail.com',
		timeZone: 'EST',
		bio: 'If you hear the delicate clatter of tin on wood, then you best be wary as this is the herald of Dashing Tintoes - notorious thief, unrepentant kidnapper, and general scourge of the wealthy. Bold as brass, it\'s a wonder she has remained at large as long as she has.',
		control: ['Underfolk Control']
	},
	{
		playerName: 'The Honoured Company of the Laureate Most Discerning',
		pronouns: 'many',
		characterName: 'The Honoured Company of the Laureate Most Discerning',
		tags: ['NPC', 'Public', 'Underfolk'],
		email: 'jstatmegagames+actingcompany@gmail.com',
		timeZone: 'UK',
		bio: 'The officially-sanctioned performing company of Laureate Vallencoin, this versatile troupe is led by the renowned character actor, Monsieur Mousquelet Moutarde, and can perform anything from classic tragedies to modern farces to bespoke histories of the client\'s favourite Sword-Saint, complete with action scenes and sword fights.',
		control: ['Generals Faction Control']
	}
];

const characters = [ ...control, ...pcs, ...npcs ];

module.exports = { characters };
