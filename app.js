const puppeteer = require('puppeteer');
const citiesList = require('./cities.json');
const cookieBumble = 'ENTER YOUR SESSION COOKIE'; // example: s2:98:ZX65sd656lfasdfoW5DFA25asdf845asfd48rt4U
let limit = 2000000; // Likes to do
let currentCityIndex = 0;

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}


async function initApp(){
	const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox']});  
	const page = await browser.newPage();
	const cities = citiesList.filter(city => [
		'Lahore',
		'Islamabad',
		'Sialkot',
		'Multan',
		'Karachi',
		'Rawalpindi',
		'Gujranwala',
		'Peshawar',
		'Hyderabad',
		'Quetta',
		'Bahawalpur',
		'Sargodha'
	].includes(city.name));

    let count = 0;
    const url = 'https://bumble.com/app';

	// Grants permission for changing geolocation
	const context = browser.defaultBrowserContext();
	await context.overridePermissions(url, ['geolocation']);



	async function relocate() {
		const nextLatLng = getRelocationLatLng();

		await page.waitFor(5000);

		await page.setGeolocation({ latitude: nextLatLng.latitude, longitude: nextLatLng.longitude });

		await page.waitFor(5000);

		await page.goto(url);

		await page.waitFor(5000);

		await page.waitFor(5000);

	}

	function getRelocationLatLng() {
		const cityObj = cities[currentCityIndex];
		console.log('Relocating to', cityObj.name);
		currentCityIndex++;
		return {
			lat: cityObj.lat,
			lng: cityObj.lng
		};
	}

	function loveClick(x) { 
		return new Promise(async resolve => {
		  setTimeout(async () => {
			await page.keyboard.press('ArrowRight');
			  if (count < limit) {
				  count++;
				  const isMatchAvailable = await page.evaluate(() => document.body.innerText.indexOf('You’re all caught up!')) === -1;
				  if (isMatchAvailable) {
					  await loveClick();
					  await page.waitFor(randomIntFromInterval(0, 3000));
				  } else {
				  	await relocate();
				  }
			  }
			resolve(x);
		  }, 1000);
		});
	  }

	async function toMatch() {
		var x = await loveClick(10);
		console.log(x); // 10
	}

    await page.goto(url);
	const cookies = [{
		'name': 'session',
		'value': cookieBumble
		},{
		'name': 'cookie2',
		'value': 'val2'
		},{
		'name': 'cookie3',
		'value': 'val3'
    }];
    await page.goto(url);
    
	console.log(cookieBumble)
    await page.setCookie(...cookies);
    const cookiesSet = await page.cookies(url);
    await page.goto(url);

	await page.waitForSelector('title');

	await relocate();

    await toMatch();
}

initApp();
