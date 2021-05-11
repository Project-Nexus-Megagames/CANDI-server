const assets = [
	{
		type: 'Power',
		name: 'Shadow Walk',
		description: 'You are able to hide and move inside of any shadow or pocket of darkness within your line of sight, although you are vulnerable if that shadow is somehow moved/dissipated by extremely bright lights. When empowered, you are capable of creating shadows and covering an area of up to a 20’ radius in darkness.',
		owner: 'The Sheriff'
	},
	{
		type: 'Bond',
		name: 'Jeong-Gwon "Johnny" Baek - Warm',
		description: 'Your contact in the police department. Johnny is not what one would call morally upstanding, but for a pig he has his uses. He’s in the know, and at least understands the value of keeping his mouth shut if needed.',
		owner: 'The Sheriff'
	},
	{
		type: 'Power',
		name: 'Dream A Little Dream',
		description: 'You can channel this power to peer into the dreams of humans and manipulate aspects or imagery within (e.g. making it rain money, removing a friend, causing a fire) to subconsciously influence their actions in the waking world. When empowered, you can manipulate the dreams of up to ten others at a time, and may manipulate the dreams of Awakened, although Awakened may realize they are under the effect of a Power when they wake.',
		owner: 'The Survivor'
	},
	{
		type: 'Bond',
		name: 'Shani Blake - Warm',
		description: 'There is something about her earnest love of the blooming world that melts the ice and pain around your heart, just a little bit. She reminds you of you, when you were at your happiest, and there is now a gentle bond between you two.',
		owner: 'The Survivor'
	},
	{
		type: 'Power',
		name: 'Three Moves Ahead',
		description: 'If you channel this power, you can see ten seconds into the future actions of any living or once-living being. This allows you to predict their movements near perfectly, but they must remain within your line of sight. Note that you can only use this power for Actions, not in correspondence. When empowered, you’re able to see over a minute into their future actions.',
		owner: 'The Pizza Dude'
	},
	{
		type: 'Bond',
		name: 'Dave Busters - Warm',
		description: 'Your boss and the owner of Count Radula’s House of Pizza. He seems massively relieved that he’s got at least one employee he can talk about being Awakened with, enough that he’s opened up to you more than most bosses would. ',
		owner: 'The Pizza Dude'
	},
	{
		type: 'Power',
		name: 'Emotional Radio',
		description: 'You can hear the surface thoughts of humans and ghosts in a heightened emotional state. This includes distress, anger, joy, jealousy, or any other strong strong feeling, and can be turned on and off at will. Once active, you will hear the surface thoughts of any humans and ghosts in a heightened emotional state within three miles of you. It can sometimes be hard to focus on individuals, but the better you know your target or the closer you are to them, the more likely you’ll be able to isolate their emotions. When empowered, your power will extend to the thoughts of the Awakened, the radius of your power will extend to five miles, and you\'re able to filter between the different emotions, as if they’re channels on the radio.',
		owner: 'The Savior'
	},
	{
		type: 'Bond',
		name: 'Your Charity of Choice - Warm',
		description: 'Less of a large charity and more of a volunteer group, these are hardworking humans who try their best to help others for a good cause.',
		owner: 'The Savior'
	},
	{
		type: 'Power',
		name: 'Barriers Up',
		description: 'You have the ability to manipulate barriers at will, and can edit their existence in reality. You could lengthen a fence, make a hole in a wall and close it up again, or even fortify their defenses to a small degree. When empowered, you are able to near instantaneously imagine and erect barriers that you can freely manipulate.',
		owner: 'The Builder'
	},
	{
		type: 'Bond',
		name: 'Steven Davies - Warm',
		description: 'A retiree and former financier who’s surprisingly knowledgeable about how the city works. He’s seen more than his fair share of it, both the good and the bad, and you get a sense he’s much more there than his old man shtick makes it seem.',
		owner: 'The Builder'
	},
	{
		type: 'Power',
		name: 'Drawn To Life',
		description: 'When you draw or paint in the air, you can create still or moving images, illusions, and messages that are only visible to your intended recipient. These can be as cartoonish or as realistic as you wish. When empowered, your ability can be extended to whole crowds of people.',
		owner: 'The Animator'
	},
	{
		type: 'Bond',
		name: 'Your Fanclub - Warm',
		description: 'A small but dedicated group that love your series, to almost fanatical levels. For the most part their devotion is flattering, although it can get a little intense.',
		owner: 'The Animator'
	},
	{
		type: 'Power',
		name: 'Technobabble',
		description: 'You can understand the “emotions” of machines as if they were living, breathing beings, something like knowing whether an animal is sad, happy, or worried, as well as what’s causing their distress. You can also communicate with them, although they cannot respond back to you in articulated words or thoughts unless you are empowered. Your mileage may vary. Some machines may be talkative and helpful, and others less so. When empowered, you get more detail and can practically speak with machines, having full conversations and possibly getting video recollections if the technology supports it.',
		owner: 'The Programmer'
	},
	{
		type: 'Bond',
		name: 'Your Personal Phone/Electronic Device - Warm',
		description: 'When you gained the power to speak to machines, its most obvious and vocal conduit was the little chatterbox you keep in your pocket. For the most part it’s helpful, though it certainly has a mind of its own.',
		owner: 'The Programmer'
	},
	{
		type: 'Power',
		name: 'Shapeshifting',
		description: 'You can take on the shape of any animal that you have met before, though you can only use this power for a maximum of an hour at a time before needing to rest. If gravely injured while transformed you return back to your original state. When empowered, the duration of this ability triples, and your animal form gains heightened senses and strength beyond what the animal would naturally possess.',
		owner: 'The Wild Child'
	},
	{
		type: 'Bond',
		name: 'Lady Helena - Warm',
		description: 'The Awakened that brought you into this world of darkness, and who seems to have tied her fate to your own. Though powerful and connected in her own right, she currently resides outside of the city, so does not wield the influence she usually would. However, she can still make the right calls to the right people, in order to nudge circumstances in your favour.',
		owner: 'The Wild Child'
	},
	{
		type: 'Power',
		name: 'Celerity',
		description: 'You’re as fast as an Olympic sprinter; your reflexes and reaction time are almost perfect. When empowered, your top speed becomes truly superhuman, others seeming to move in slow motion. To observers, you appear to move from one side of the room to another in the blink of an eye. However, moving at this speed is tiring, and difficult to maintain for more than a few minutes. ',
		owner: 'The Dancer'
	},
	{
		type: 'Bond',
		name: 'Letitia Mayhew - Warm',
		description: 'Dear Letitia was a patron of your world, a socialite who genuinely enjoyed attending the ballet when most simply watched in order to be seen. Your bond with her comes from her genuine respect of dance, and your appreciation of her taste.',
		owner: 'The Dancer'
	},
	{
		type: 'Power',
		name: 'Corrosive Personality',
		description: 'You are literally and figuratively toxic. This can take the physical form of smog, poison, or generally corrosive chemicals that can broadly target or be directed down to the molecule. You can also poison a human figuratively, bringing them down and turning them against someone else. When empowered, you can dissolve in a cloud of toxic gas, spreading your emotional influence across an entire room or becoming actual poison vapors.',
		owner: 'The Extractor'
	},
	{
		type: 'Bond',
		name: 'Susan Chandler - Warm',
		description: 'You’ve known her since she was a child, sitting on her daddy\'s lap as the two of you talked business. While you’ve never been close, per say, there is a certain respect between you and she, not least because you happened to be the one to tell her about Awakening.',
		owner: 'The Extractor'
	},
	{
		type: 'Power',
		name: 'Voices of the Dead',
		description: 'You are able to hear and respond to the voices of the dead, able to channel them within your body so that they may speak with those both living and Awakened. While channelling, you are possessed, and the spirit has control over your speech. Stronger spirits may exert even more control over you, temporarily controlling your eyes, facial expression, and gestures. However, you are always cognizant while possessed, and aware of what the dead are doing and saying. While empowered, you retain full control over your body when you channel, with the spirit only taking the wheel as much as you allow. This means that you may be part of the conversation while channeling, both you and the spirit taking turns speaking from the same mouth.',
		owner: 'The Haunted'
	},
	{
		type: 'Bond',
		name: 'The Voices of the Dead - Warm',
		description: 'You can hear them around you, like an endless chorus. For the most part they aren’t malicious and just want to be heard. Listen to them carefully, and they’ll be able to tell you many things you want to know, and many things you wished you hadn’t heard.',
		owner: 'The Haunted'
	},
	{
		type: 'Power',
		name: 'Exactly as Calculated',
		description: 'You’re able to glean the truth of numbers at a glance, instantly solving equations and identifying discrepancies in balance sheets, formulae, and other assortments of numbers on sight. When empowered, you can further see what numbers are and what should and shouldn’t be [e.g. winning lottery numbers, what numbers will have a higher stock market value, or what are the likely combinations to a safe].',
		owner: 'The Numerologist'
	},
	{
		type: 'Bond',
		name: 'Sanoh "Sunny" Prasansapakit',
		description: 'When you first came to the city she didn’t hesitate to haggle you and your belongings down to the last cent, and it has now become a ritual for you to share a back-and-forth on the relative worth of both material and immaterial things. You’re aware she appreciates it when you use her real name, and not the Anglicization she’s forced to have.',
		owner: 'The Numerologist'
	},
	{
		type: 'Power',
		name: 'Outside the System',
		description: 'Barriers that exist for others are mere suggestions for you. Physical limitations to getting to a destination do not bother you, letting you move through locked doors (or even a lack of a door), ignore alarms or tripwires, and generally move through any kind of physical barrier you might encounter. When empowered, you can bring up to 10 people with you, Awakened or not.',
		owner: 'The Punk'
	},
	{
		type: 'Bond',
		name: 'Devin Slater - Warm',
		description: 'When you saw Devin binding essays and making prints, you thought you might have recognized him from a concert you went to. You mentioned it to him once, and it was enough to make him warm up to you immediately.',
		owner: 'The Punk'
	},
	{
		type: 'Power',
		name: 'Mirror Image',
		description: 'You have the power to see through mirrors into the present of people that you know, so long as they happen to be before a reflective surface, as well as appear to others and communicate with them through reflective surfaces. Think of the mirror as a window, not a recording. When empowered, you can use the mirrors as portals to pass all of part of your body through. You may not pass inanimate objects, such as knives or bullets, through a portal, without the rest of your body attached to them. ',
		owner: 'The Guardian'
	},
	{
		type: 'Bond',
		name: 'Your Family - Warm',
		description: 'Naturally, the people you are fighting for. The people who surround you, who make your life feel whole. You haven’t told them about your new… condition. Not yet. You’re sure they would be supportive of you, but you’re still a little wary. Nevertheless, you know that they’re there for you and love you.',
		owner: 'The Guardian'
	},
	{
		type: 'Power',
		name: 'Echoes Of What Once Was',
		description: 'You’re able to see bits and pieces of the past of those you touch, whether they wish to provide it or not. You will receive the memories that have left the strongest impression, the ones that come to the surface first. Memorable and important. When you’re empowered you can dive deeper into the psyche of the person you touch, looking and finding specific pieces of the past. Note that this is a power you can only use during Action Resolution.',
		owner: 'The Social Worker'
	},
	{
		type: 'Bond',
		name: 'Alfie Barnes - Warm',
		description: 'Though you haven’t worked directly with Alfie himself, due to his own little bit of pride and stubbornness, he’s a familiar sight to you. You’ve developed a fondness for the man and his dogs, and he appreciates the good work you’ve been doing helping his fellows return to society.',
		owner: 'The Social Worker'
	},
	{
		type: 'Power',
		name: 'Fading Shore',
		description: 'You have the ability to selectively and precisely remove memories from the Slothful, though you cannot use this on your fellow Awakened. You cannot see the details of the memories that you’re taking, but can see the general shape and emotions of them. Overfeeding lets you witness the actual memories in question, allowing you greater access to information, and ensuring that you remove the right memories. ',
		owner: 'The Sympathetic'
	},
	{
		type: 'Bond',
		name: 'Alias - Warm',
		description: 'This is not a friendship initiated by the tattoo artist, but one you actively pursued in your quest to try and reinvent yourself. Who better to consult with than someone who changes appearances as often as you change clothes? They appreciate you trying to experiment with who and what you are, and at least give the illusion of listening to you.',
		owner: 'The Sympathetic'
	},
	{
		type: 'Power',
		name: 'Muscling In',
		description: 'Awakening has made your body your weapon as much as your mind. No longer weak, you are possessed of extreme strength. When empowered, you are as durable as you are strong, able to run for hours, and your body resists knives like your skin is a kevlar vest.',
		owner: 'The Philosopher'
	},
	{
		type: 'Bond',
		name: 'Jennifer Yuen - Warm',
		description: 'Ms. Yuen, more than most, seems to be willing to give your philosophizing the time of day… or maybe it’s because you make a very good customer. Regardless of the reason, the two of you share a now familiar rapport that has endeared you to her and her bar.',
		owner: 'The Philosopher'
	},
	{
		type: 'Power',
		name: 'Encyclopedic Information Processing',
		description: 'You can process large amounts of information in rapid time, synthesizing solutions that you consciously wouldn’t have thought of yourself. You’re more effective at research, able to peruse and condense a lot of data quickly, and you can strategize on the fly, increasing your adaptability to get yourself out of tight spots or open up unusual doors. When empowered, you reach an almost laserlike focus about where to find the material that you’re looking for, allowing you to much more broadly search out the answer to a question, not needing direction about the best places to find something.',
		owner: 'The Seeker of Knowledge'
	},
	{
		type: 'Bond',
		name: 'Alan Monty - Warm',
		description: 'A professor at the University of Doxley, Alan is intelligent and easy to get along with, in part because of your own lineage. You can go to him for advice or intellectual discussion, though you get the sense that he’s a fair bit smarter than his disorganized professor shtick lets on.',
		owner: 'The Seeker of Knowledge'
	},
	{
		type: 'Power',
		name: 'Wings of Justice',
		description: 'You have four batlike wings on your back that can be used for mundane flight, but can also be used in combat by changing their size, shape, and characteristics (grow really big, really small, be as hard as steel). When empowered, your wings can shapeshift into near any form, though you will have to support the size and weight of whatever you create on your back.',
		owner: 'The Wanderer'
	},
	{
		type: 'Bond',
		name: 'Duncan Buchanan - Warm',
		description: 'You fought hard to impress the hedge knight, and apparently what you showed him was enough to land you a position as a probationary Guardian Angel. It’s not a place to belong yet, but it’s better than having nothing at all. ',
		owner: 'The Wanderer'
	},
	{
		type: 'Power',
		name: 'The Map Is Not The Territory',
		description: 'Maps define reality. You can change the map. Not the reality, but what people think it is. You can make a person get lost in a straight corridor, or make it so nobody can ever find room 17a, or so that there’s citywide gridlock whenever you need it… When empowered you actually can change reality in small ways. Briefly make a trap street real. Create a room or door where one didn’t exist before.',
		owner: 'The Pathfinder'
	},
	{
		type: 'Bond',
		name: 'Roger Broom - Warm',
		description: 'An architect, a creator of worlds far beyond your wildest hopes and dreams. You’re learning a lot from Roger about the world of this century, and the kinds of places that you wish to see.',
		owner: 'The Pathfinder'
	},
	{
		type: 'Power',
		name: 'Hyperacusis',
		description: 'Your hearing, and vibration sense, is incredible. You can hear people from rooms away. Through a wall. You can hear how fast a person’s heart is beating, hell, you can hear that their mitral valve is a little stenosed. You’re more accurate than a polygraph for catching out a liar. When empowered you can control vibrations to create or destroy sounds through destructive interference, create sonic attacks or damaging subsonic vibrations.',
		owner: 'The Masked Virtuoso'
	},
	{
		type: 'Bond',
		name: 'Dominik - Warm',
		description: 'The human bartender at Thirst. Though you’ve done your best not to grow close to anyone, they respect you enough to give you a place to relax and breathe. Sometimes you even feel the urge to take the mask off fully and drink in front of them.',
		owner: 'The Masked Virtuoso'
	},
	{
		type: 'Power',
		name: 'Traces of Power',
		description: 'You are able to trace and detect magical trails, hotspots of power, and other existing sources of "supernatural power" that should or shouldn\'t be there. When empowered, you can siphon and harness this supernatural power to engage in a little magical chaos of your own.',
		owner: 'The Occultist'
	},
	{
		type: 'Bond',
		name: 'Bobby Weber - Warm',
		description: 'An acquaintance who’s the owner of the Doxley Dark supernatural/conspiracy forum, and one you’ve met in person for the first time recently. Of course, you can’t quite tell him your secret, but at least you can talk about anything except what you actually are.',
		owner: 'The Occultist'
	},
	{
		type: 'Power',
		name: 'Spinning A Yarn',
		description: 'Your voice carries a compulsion within it that can lull the Unawakened into trusting you, providing them with a sense of security. When empowered it has a similar, although milder, effect on the Awakened.',
		owner: 'The Storyteller'
	},
	{
		type: 'Bond',
		name: 'Gustave - Warm',
		description: 'Gustave was a childhood fan of your series, and has told you that it brought him warmth and comfort when he was younger. You haven’t pried into his past (Friends should wait for friends!), but he treats you with a little uncharacteristic warmth.',
		owner: 'The Storyteller'
	},
	{
		type: 'Power',
		name: 'Ride the Current',
		description: 'You can sense electrical fields, which lets you detect hidden people and objects a short distance away without the need for sight or hearing, though it can be confused by electronics. More usefully, you can generate or interfere with electricity, increasing and decreasing resistance. You can shock with a touch (be mindful of pacemakers!), fry complex electronics with a glance or just disrupt the power supply for a few minutes. When empowered you can project arcs of electricity, become a living generator or electromagnetic pulse, even summon lightning strikes.',
		owner: 'The Entrepreneur'
	},
	{
		type: 'Bond',
		name: 'Your Bar - Warm',
		description: 'So maybe it isn’t Thirst or the Clover Lounge, prestigious in its clientele and charging 20 dollars a cocktail. So maybe it isn’t the White Hart with its warmth, history, and Doxley local character. So maybe there are a few more roaches, a few more mould stains, and a lot more repairs needed than you’d like. So what? This dive is still your pride and joy, no matter what anybody says.',
		owner: 'The Entrepreneur'
	},
	{
		type: 'Power',
		name: 'Predator\'s Mimicry',
		description: 'You are able to take on comforting traits to make others feel at ease in your presence, make them think you are harmless, to deceive them with before you destroy them. This can be used more actively to make yourself generically appear to be the thing that they’re looking for or passively to make them feel safe with you. When empowered, you are able to even mimic the appearance, vocal tics, and mannerisms of specific people who you have seen and observed.',
		owner: 'The Hunter'
	},
	{
		type: 'Bond',
		name: 'Michael "Mike" Tharson - Warm',
		description: 'An Enforcer in this city, though one who respects your capabilities. He’s keeping an eye out to make sure that you toe the line, but at the same time begrudgingly acknowledges the strength you have worked hard to achieve.',
		owner: 'The Hunter'
	},
	{
		type: 'Power',
		name: 'Living Nightmare',
		description: 'You are a creature of primal terror. You can conjure fear and dread in the living, from a vague feeling of being watched all the way to mortal terror. When empowered you can affect other Awakened, cause humans to die of fright, create bespoke phobias, even cause mild (terrifying) hallucinations.  ',
		owner: 'The Urban Legend'
	},
	{
		type: 'Bond',
		name: 'Your Legend - Warm',
		description: 'Your Bond is unusual; it represents your alter ego. You devote considerable time and effort to the maintenance of your myth, your asset and your legacy. ',
		owner: 'The Urban Legend'
	},
	{
		type: 'Power',
		name: 'Seeing Further',
		description: 'If you know your target\'s true name you can channel this power to see their location through a crystal ball, GPS, or other appropriate medium of your choice. When empowered, you can “rewind” the medium to see where they’ve been up to two hours before, and can feel which way your target is from you and how close they are to you.',
		owner: 'The Media Mogul'
	},
	{
		type: 'Bond',
		name: 'Melanie Yeoh - Warm',
		description: 'A brilliant little weatherwoman and reporter with an ear to the ground, an eye for details and a nose for trouble. It’s hard to not admire, even love, them a little. She’s also probably the biggest potential threat to the Shroud and your personal powerbase, at least that you’re aware of.',
		owner: 'The Media Mogul'
	},
	{
		type: 'Power',
		name: 'The Scale',
		description: 'You can harm and heal with a touch. You can cause wounds to close, diseases to go into remission. However, it must be an equivalent exchange. You must directly transfer these illnesses and injuries into another. It is possible to ‘hold’ a charge of healing or harming for up to a week, though doing so is uncomfortable. If you fail to balance the scale, your work will become undone, and nature will attempt to balance what you had mistakenly taken. You cannot use this power on yourself but it can affect other Awakened. Note that Awakened are essentially immune to most diseases and heal quickly. If empowered you can heal and harm without the need for balance or to actually touch the subject; you can affect anyone in your line of sight. You may even target multiple people at once.',
		owner: 'The Surgeon'
	},
	{
		type: 'Bond',
		name: 'Josephine Rosales - Warm',
		description: 'A nurse you know from the old days, one who’s willing to lend you a helping hand if it means assisting those patients that she can’t always reach. Despite everything that’s happened, she still respects you',
		owner: 'The Surgeon'
	},
	{
		type: 'Power',
		name: 'You Are What You Eat',
		description: 'You temporarily gain the skills/abilities of those you drink. When empowered you can experience their memories or temporarily copy the abilities of other Awakened (provided you’ve had a taste…). You may only copy one person’s memories or abilities at a time. If voluntarily agreed, drinking does not require extra Effort. You last fed from your starting Bond.',
		owner: 'The Gumshoe'
	},
	{
		type: 'Bond',
		name: 'Chelsea Hubbard - Warm',
		description: 'Old mother Hubbard is very well-informed, with connections to what seems to be everyone who is anyone in the city and a skill with the needle you’ve temporarily picked up. She’s also been kind enough to let you feed off her despite your bane, so long as you do an odd job or two for her.',
		owner: 'The Gumshoe'
	},
	{
		type: 'Power',
		name: 'The F(r)iend Within',
		description: 'When you channel this power you black out and dissociate, allowing your body to instinctively complete the task before you to perfection. At this point in your dissociated state you may take actions you wouldn’t have while cognizant, all in the pursuit of doing things “the correct way”. When empowered, your dissociated state can manifest skills and abilities you have seen before but don’t possess yourself, such as knowledge of languages, mechanical skill, and even combat capability.',
		owner: 'The Perfectionist'
	},
	{
		type: 'Bond',
		name: 'Alice Palmer - Warm',
		description: 'The quintessential hostess, and a formidable restaurateur in her own right. Anybody who has made it this far in the business understands the perfection that is demanded of the role, which is why there is mutual respect between you over the culinary and commercial fields.',
		owner: 'The Perfectionist'
	}
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
		name: 'Doxley Museum',
		description: 'The first building ever built in Doxley City, it used to house the Founder\'s family until a decade ago, when the last remaining descendant moved out. It was then converted into a Museum, boasting Dusk City\'s major cultural artifacts. The Mayor gives speeches there from time to time, and it\'s the site of each inauguration. One of the few cultural preservation landmarks in the city.',
		borough: 'North',
		influence: 5,
		code: 'N10'
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
		influence: 5,
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
		influence: 5,
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
		influence: 5,
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

module.exports = { assets, locations };