const puppeteer = require('puppeteer');

async function likePost({ postUrl, username, password }) {

    //Launch Puppeteer
    const browser = await puppeteer.launch({
        //Headless is false so you can see program run.
        headless: process.env.NODE_ENV === 'production',
        args: ['--no-sandbox']
    });

    //Launch a new page
    const page = await browser.newPage();

    //////////////START LINKEDIN//////////////////
    await page.goto('https://www.linkedin.com/');

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
}

//export the likePost function
module.exports = likePost;