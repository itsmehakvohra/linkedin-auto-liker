const puppeteer = require('puppeteer');

async function likePost({ postUrl, username, password }) {

    //Launch Puppeteer
    const browser = await puppeteer.launch({
        //Headless is false so you can see program run.
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // '--proxy-server=198.199.112.192:3128'
        ]
    });

    //Launch a new page
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    console.log("new incognito page loaded");

    //////////////START LINKEDIN//////////////////
    console.log("going to Linkedin");
    await page.goto('https://www.linkedin.com/');
    console.log("In Linkedin")

    const USERNAME_SELECTOR = '#login-email'; // LinkedIn username selector
    const PASSWORD_SELECTOR = '#login-password'; //LinkedIn password selector
    const LOGIN_BUTTON = '#login-submit'; //LinkedIn login submit button selector
    const LIKE_BUTTON = '.like-button'; //LinkedIn Like Button selector

    await page.click(USERNAME_SELECTOR); // click Username field
    await page.keyboard.type(username); //Type in Username field (bring in username from cred.js)

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(password);

    await page.click(LOGIN_BUTTON);

    await page.waitForNavigation();
    console.log("logged in");

    await page.goto(postUrl); //Go to page link here 

    await page.waitForSelector(LIKE_BUTTON);
    console.log("got it.");

    await page.click(LIKE_BUTTON);
    console.log("we liked it");

    await context.close();
    console.log("we outtie");
}

//export the likePost function
module.exports = likePost;