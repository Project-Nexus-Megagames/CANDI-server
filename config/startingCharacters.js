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
        "bio": "Mrs Highthorn is a relatively new arrival in AM, here to take charge of the Department of Thinkosophy. But despite her newness, she's no shrinking violet. She wants to put Thinkosophy and witchhood on the map, and she doesn't mind making a few enemies along the way.",
        "email": "shonajemphreymegagame@gmail.com", <- this is defferent from the Player's Nexus email. They can be the same but players are free to make different emails listed here on CANDI
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
		pronouns: 'she/her?',
		characterName: 'Supreme Empress for Life',
		tags: ['Control', 'Game Control', 'Public'],
		email: 'temp@mail.com',
		timeZone: 'temp',
		bio: 'No Bio yet',
		username: 'shona.jemphrey@gmail.com',
		control: []
	},
  {
		playerName: 'Maggie',
		pronouns: 'she/her?',
		characterName: 'Marshal n Chief of Hon.s & Esq.s',
		tags: ['Control', 'Public'],
		email: 'temp@mail.com',
		timeZone: 'temp',
		bio: 'No Bio yet',
		username: 'shona.jemphrey@gmail.com',
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
	},
];

const npcs = [
	{
		playerName: 'The Champion',
		pronouns: '???',
		characterName:'The Champion',
		tags: ['NPC', 'Public'],
		email: 'temp@temp.com',
		timeZone: 'EST',
		bio: 'BIO_INFO_HERE',
		control: ['CONTROL_NAME_HERE']
	}
];

module.exports = { control, pcs, npcs };