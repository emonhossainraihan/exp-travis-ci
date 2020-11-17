const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: process.env.CAPTCHA_API
        },
        visualFeedback: true,
    })
)

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
    const page = await browser.newPage()
    await page.goto('https://www.google.com/recaptcha/api2/demo')

    // That's it, a single line of code to solve reCAPTCHAs 🎉
    await page.solveRecaptchas()

    await Promise.all([
        page.waitForNavigation(),
        page.click(`#recaptcha-demo-submit`),
    ])
    const selectElement = await page.$('.recaptcha-success')
    let finalResult;
    if (selectElement) {
        finalResult = await page.evaluate(el => el.innerText, selectElement);
    }
    console.log(finalResult);
    await page.screenshot({ path: 'data/response.png', fullPage: true })
    await browser.close()
})