const characters = [
	{
		playerName: 'Noe Player Assigned',
		pronouns: 'N/A',
		characterName:'The Agent',
		tags: ['PC'],
		email: 'No Email',
		timeZone: 'N/A',
		bio: 'No bio',
		username: 'temp',
		control: ['Central Control']
	},
	{
		playerName: 'Scott',
		pronouns: 'They/Them',
		characterName:'Tech Support',
		tags: ['Amazing', 'A good Programmer', 'Control'],
		email: 'scott.megagames@gmail.com',
		timeZone: 'PT',
		bio: 'The Man with a plan and who keeps it all rolling.',
		username: 'BobtheNinjaMan',
		control: ['Scott']
	},
	{
		playerName: 'Steph',
		pronouns: 'She/Her',
		characterName: 'Central Control',
		tags: ['Control'],
		email: 'gw.centralcontrol@gmail.com',
		timeZone: 'EDT (UTC-4)',
		bio: 'Controlling Tiresias, Zeus, Aphrodite, Ambrose Erastus, Harry Doyle, Katelyn Doyle, and Bennett Otis as well as being the Sisyphean Olympian Overlord',
		username: 'Kaeira',
		control: []
	},
	{
		playerName: 'Will',
		pronouns: 'They/Them',
		characterName: 'Hammersmith Control',
		tags: ['Control'],
		email: 'gw.hammersmithcontrol@gmail.com',
		timeZone: 'GMT (UTC+0)',
		bio: 'Controlling Athena, Ares, Rebecca Browning, Amy Lewin, Skye Green, Guinevere Green, Luella Wright and hearts everywhere.',
		username: 'orionzbelt',
		control: []
	},
	{
		playerName: 'Greg',
		pronouns: 'He/Him',
		characterName:'Waterloo Control',
		tags: ['Control'],
		email: 'gw.waterloocontrol.com',
		timeZone: 'PST',
		bio: 'Hades, Hermes, Fiona Kelly, Finn, Celina Culpepper, Nora Mather, Night Mather, Odie Smith, Hector Van der Vorm',
		username: 'Aggrocragg',
		control: []
	},
	{
		playerName: 'Stuart',
		pronouns: 'He/Him',
		characterName: 'Overground Control',
		tags: ['Control'],
		email: 'stuart.pbem@gmail.com',
		timeZone: 'GMT (UTC+0)',
		bio: 'Did a lot of design work pregame but now works behind the scenes in some mysterious fashion...',
		username: 'Game Control',
		control: []
	},
	{
		playerName: 'Andrew',
		pronouns: 'He/Him',
		characterName: 'Bakerloo Control',
		tags: ['Control'],
		email: 'gwbakerloo@gmail.com',
		timeZone: 'GMT (UTC+0)',
		bio: 'Controlling Poseidon, Hephaestus, Artemis, Edith Keyes, William Bell, Theodore Cornell, Eveline Cornell, Henry Adalbert, Isobel Beveridge, George Stephenson',
		username: 'AShielDods',
		control: []
	},
	{
		playerName: 'Greg',
		pronouns: 'He/Him',
		characterName:'Waterloo Control ',
		tags: ['Control'],
		email: 'gw.waterloocontrol.com',
		timeZone: 'PST',
		bio: 'Hades, Hermes, Fiona Kelly, Finn, Celina Culpepper, Nora Mather, Night Mather, Odie Smith, Hector Van der Vorm',
		username: 'Aggrocragg',
		control: []
	},
	{
		playerName: 'Eli',
		pronouns: 'He/Him',
		characterName:'Jubilee Control',
		tags: ['Control'],
		email: 'wintercrossmegagames@gmail.com',
		timeZone: 'GMT +8',
		bio: 'controlling Apollo, Dionysus, Charles, Eloise, Oliver, Lillian, Mabel',
		username: 'Wintercross',
		control: ['Game Control']
	},
	{
		playerName: 'Mikolaj / Miki',
		pronouns: 'He/him',
		characterName:'Victoria Control',
		tags: ['Control'],
		email: 'mikolajrwiecek+gwcontrol@gmail.com',
		timeZone: 'CET (UTC +1)',
		bio: 'Channeling Hera, Demeter, Victor Moore, Glenn Garret, Arthur MacNeill, Wren Blackwell, Paul Cresswell, Gary Brindley, Sylvie Belville. Resident Gmail guru and wiki wonder.',
		username: 'mikolajwiecek',
		control: ['Game Control']
	}
	// {
	// 	playerName: 'CONTROLLER ACTUAL NAME HERE',
	// 	pronouns: 'CONTROLLER PRONOUNS HERE',
	// 	characterName:'CONTROLLER TITLE HERE (Game Control,Central Control, ect.)',
	// 	tags: ['Control'],
	// 	email: 'CONTROLLER EMAIL HERE',
	// 	timeZone: 'CONTROLLER TIME ZONE HERE',
	// 	bio: 'ENTER RESPONSIBILITIES HERE',
	// 	username: 'CONTROLLER USERNAME HERE',
	// 	control: ['Game Control']
	// },
];

const gods = [
	{
		playerName: 'God',
		Aspect: 'N/A',
		pronouns: 'They/Them',
		worldAnvil: 'https://godswars.miraheze.org/wiki/Gods',
		characterName:'Tiresias',
		tags: ['God', 'Prophecy'],
		email: 'No email yet',
		timeZone: 'PT',
		bio: 'Tiresias is known as the "blind prophet." They are wise, kindly, curious, and knowledgeable. Though they cannot directly interfere in the Gods\' Wars, they are an excellent source of information and are happy to help any participant who comes to them for advice. \n\nTiresias is the neutral Arbitrator of Gods\' Wars. They are explicitly designed to be a "helper NPC"- someone without ulterior motives who can and will help you if you get stuck or are confused about anything in character. You can find them in the Library or contact them by letter.	\n\nBecause of Tiresias\' status as a Neutral Arbitrator, players are unable to progress on their Devotion track like they can with the other 13 Gods. They are also unable to be Bonded like other mortal NPCs. This does not, however, mean that they don\'t have feelings. If you insult them or are kind to them, they will treat you differently. However, because of their Arbitrator status, they will still give you information regardless of their personal feelings. ',
		username: 'none',
		control: ['Game Control']
	},
	{
		playerName: 'God',
		pronouns: 'She/Her',
		worldAnvil: 'https://godswars.miraheze.org/wiki/Gods',
		characterName:'Athena',
		tags: ['God', 'Scholarship', 'Wisdom', 'Warfare'],
		email: 'No email yet',
		timeZone: 'PT',
		bio: 'Athena has a reputation for loving learning and knowledge and having an intense rivalry with her brother Ares. She is also known to be a virgin and has sworn never to marry.	There are few things that Athena loves more than scholarship. She is interested in the pursuit of knowledge of any kind, but has a particular interest in battlefield tactics and military history. Though you are able to contact Athena for any reason, she will likely be particularly interested in speaking with you about these topics.',
		username: 'none',
		control: ['Game Control']
	},
	{
		playerName: 'God',
		pronouns: 'He/Him',
		worldAnvil: 'https://godswars.miraheze.org/wiki/Gods',
		characterName:'Ares',
		tags: ['God', 'Pugilism', 'War'],
		email: 'No email yet',
		timeZone: 'PT',
		bio: 'Ares has a reputation for being violent and bloodthirsty and having an intense rivalry with his sister Athena. Ares loves a good fight and will look for any excuse to do so. Depending on your devotion level, this may be for fun, or out of anger and a true desire to harm. Although you can contact Ares for any reason, he is unlikely to be terribly interested in chatting with you, if it isn\'t about a fight of some kind.',
		username: 'none',
		control: ['Game Control']
	},
];
const npcs = [
	{
		playerName: 'The Champion',
		pronouns: '???',
		characterName:'The Champion',
		tags: ['NPC'],
		controlEmail: 'stuart.pbem@gmail.com  duskcitycontrol@gmail.com',
		email: 'No email yet',
		timeZone: 'EST',
		bio: 'There is nothing more radical than caring. In a world where people are too often blamed for their problems and illnesses, you give a shit. Though Hera has her darker side, love is at the core of her and it is in this way that you take after her. Of course, like your sponsor, you don’t have to be a pushover. Helping those that deserve it doesn’t mean putting up with those who don’t. ',
		username: 'temp',
		control: ['Control 1']
	}
];

module.exports = { characters, npcs, gods };