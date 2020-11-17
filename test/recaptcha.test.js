const CustomPage = require('../helper');
const path = require('path');
const fs = require('fs');

jest.setTimeout(216000);
let Chrome = new CustomPage();


describe("Test Start", () => {
    test('Loads a page with captcha', async (done) => {
        await Chrome.init();
        await Chrome.navigate();
        let isRecaptchaExist = await Chrome.isRecaptchaExist();
        expect(isRecaptchaExist).toBeTruthy();
        done();
    })
    test('Fills the form and solve the rechaptcha', async (done) => {
        await Chrome.solveRecaptcha()
        let isSolved = await Chrome.isSolved()
        await Chrome.cleanUp();
        expect(isSolved).toBeTruthy();
        done();
    }, 108000);
    test('Gets final result page', async (done) => {
        let isFinalPageExists;
        try {
            if (fs.existsSync(path.join(__dirname, '..', './data', 'response.png'))) {
                isFinalPageExists = true;
            } else {
                isFinalPageExists = false;
            }
        } catch (err) {
            console.error(err);
        }
        expect(isFinalPageExists).toBeTruthy();
        done();
    })
});