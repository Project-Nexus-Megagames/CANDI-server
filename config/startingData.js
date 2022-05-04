const assets = [
	// {
	// 	type: 'Power',
	// 	name: 'Shadow Walk',
	// 	description: 'You are able to hide and move inside of any shadow or pocket of darkness within your line of sight, although you are vulnerable if that shadow is somehow moved/dissipated by extremely bright lights. When empowered, you are capable of creating shadows and covering an area of up to a 20’ radius in darkness.',
	// 	owner: 'The Sheriff'
	// },
];

const locations = [
	{
		name: 'Avocado District',
		coords: {	x: 1, y: 0 },
		description: 'The area between Fresno and the mountains, turned into farmland. Although the “Avocado District” was originally a pejorative, thanks to a successful media campaign by [AG MEGACORP], the name stuck, and lost its negative connotations. It can be dangerous owing to automated Ag robots patrolling the fields, including Property Enforcement models. It abuts the weapons testing range of the Stockton Arsenal, which causes the occasional problem.'
	},
	{
		name: 'Golden Gate',
		coords: {	x: 1, y: 1 },
		description: 'The former site of the Golden Gate National Recreation Area, it has since been turned into a bustling port, the “gateway” to the Bay, and the Platform. Billions in goods pass through each year, all paying harbor fees to the NeoSan Port Authority to send their goods to the Platform.'
	},
	{
		name: 'Stockton Arsenal',
		coords: {	x: 1, y: 2 },
		description: ' What was once known as the city of Stockton has now been leveled, and a massive arms development and testing facility. Its weapons testing range abuts the Avocado District, and shrapnel is occasionally known to rain down on [AG MEGACORP’s] fields, much to its dismay.'
	},
	{
		name: 'Millennium Tower',
		coords: {	x: 2, y: 0 },
		description: 'As the effects of global warming continued to get worse and sea levels began to rise, the already staggering property values of the city reached levels that defied all previous records. To compensate, business began to build up, as more and more of the land was reclaimed by the ocean. The wonders of future technology allowed skyscrapers to be built upon skyscrapers, reaching heights never before seen. At the top, the business elites ran their corporations to record profits. At the bottom levels, where the old buildings began to sink into the ocean, crime and poverty flourished..'
	},
	{
		name: 'Luna',
		coords: {	x: 2, y: 1 },
		description: 'The cities on the moon were started in an entirely predictable fashion: settled by billionaires in the early days of private space exploration. What initially began as joyrides into space by pioneering CEOs of yesteryear quickly turned into a race to not only visit the moon, but to settle it. First, it was simple outposts meant for space tourism - a playground for the rich and famous. But as the settlements became more permanent and the travel became easier and less expensive, it became more practical to turn these entertainment centers into more permanent, functioning settlements.'
	}
];

module.exports = { assets, locations };