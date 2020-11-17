const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: process.env.CAPTCHA_API,
        },
        visualFeedback: true,
    })
);

class CustomPage {
    async init() {
        // start the browser 
        if (!this.browser) {
            this.browser = await puppeteer.launch({ headless: false });
            this.page = await this.browser.newPage();

        }
    }
    //! helper function created
    async navigate() {
        await this.page.goto('https://www.google.com/recaptcha/api2/demo');
    }
    async isRecaptchaExist() {
        const selectElement = await this.page.$('legend');
        const text = selectElement && await this.page.evaluate(el => el.innerText, selectElement);
        return text === "Sample Form with ReCAPTCHA"
    }
    async solveRecaptcha() {
        await this.page.solveRecaptchas();
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click(`#recaptcha-demo-submit`),
        ]);
    }
    async isSolved() {
        await this.page.waitForSelector('.recaptcha-success')
        const selectElement = await this.page.$('.recaptcha-success')
        const successMessage = selectElement && await this.page.evaluate(el => el.innerText, selectElement);
        if (successMessage && successMessage === "Verification Success... Hooray!") {
            await this.page.screenshot({ path: path.join(__dirname, '..', './data', 'response.png'), fullPage: true })
            return true
        } else {
            return false
        }
    }

    async cleanUp() {
        if (this.browser) {
            await this.page.close();
            await this.browser.close();
        }
    }

}

module.exports = CustomPage;