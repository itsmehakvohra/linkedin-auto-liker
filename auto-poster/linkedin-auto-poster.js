const puppeteer = require('puppeteer');
const CREDS = require('../auto-liker/cred');

async function run() {
    //Launch Puppeteer
    const browser = await puppeteer.launch({
        //Headless is false so you can see program run.
        headless: false
    });

    //Launch a new page
    const page = await browser.newPage();

    //Go to the Google Doc Page
    await page.goto('https://docs.google.com/document/d/1gPx5vciMO_QNtQuWbzODvvCSCy7N8rzLFTfC1TFqQwA/edit');

    //The identifiers for Google's Login
    const GD_USERNAME_SELECTOR = '#identifierId'; // Google Docs username selector
    const GD_NEXT_BUTTON = '#identifierNext'; //Google Docs Next button selector
    const GD_PASSWORD_SELECTOR = 'input[type="password"]'; //Google Docs password selector
    const GD_LOGIN_BUTTON = '#passwordNext'; //Google Docs Login button selector

    //Login program
    await page.click(GD_USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.gd_username);

    await page.click(GD_NEXT_BUTTON);

    await page.waitForSelector(GD_PASSWORD_SELECTOR, { visible: true })
    await page.keyboard.type(CREDS.gd_password);

    await page.click(GD_LOGIN_BUTTON);


    //For copying and pasting the text in the file
    const postText = await page.$eval('', el => el.innerText)
    console.log(postText)


    //////////////START LINKEDIN//////////////////

    const page2 = await browser.newPage();
    await page2.goto('https://www.linkedin.com/');

    const USERNAME_SELECTOR = '#login-email'; // LinkedIn username selector
    const PASSWORD_SELECTOR = '#login-password'; //LinkedIn password selector
    const SIGNUP_BUTTON = '#login-submit'; //LinkedIn Signup button selector

    await page2.click(USERNAME_SELECTOR);
    await page2.keyboard.type(CREDS.username);

    await page2.click(PASSWORD_SELECTOR);
    await page2.keyboard.type(CREDS.password);

    await page2.click(SIGNUP_BUTTON);
}

run();