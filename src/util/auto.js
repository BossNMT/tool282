const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const { executablePath } = require('puppeteer')

exports.auto = async (userpassword, proxy, dauphancach, callback) => {
    puppeteer.use(
        RecaptchaPlugin({
            provider: {
                id: '2captcha',
                token: '20cb6958021a2431e4dea63457715dae' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
            },
            visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
        })
    )

    const user = userpassword.split(`${dauphancach}`)[0]
    const password = userpassword.split(`${dauphancach}`)[1]

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            `--proxy-server=http://${proxy}`,
            '--window-size=300,300'
        ],
        executablePath: executablePath()
    });
    try {
        // const facebook = await browser.newPage();
        // await facebook.goto('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=100');
        // await facebook.type('input[name=email]', user)
        // await facebook.type('input[name=pass]', password)
        // await facebook.click("button[name='login']")
        // await facebook.waitForNavigation()

        // let url;
        // url = await facebook.url()

        // if (url.split('/')[3] === 'login') {
        //     console.log('url.split("/")[3]', url);
        //     callback(false, userpassword)
        //     // await browser.close();
        // } else {
        //     console.log('url.split("/")[3]', url);
        //     callback(true, userpassword)
        //     // await browser.close();
        // }

        const page = await browser.newPage()
        await page.goto('https://www.google.com/recaptcha/api2/demo')

        // That's it, a single line of code to solve reCAPTCHAs 🎉
        await page.solveRecaptchas()

        await Promise.all([
            page.waitForNavigation(),
            page.click(`#recaptcha-demo-submit`)
        ])
        // await page.screenshot({ path: 'response.png', fullPage: true })
        // await browser.close()
    } catch (error) {
        callback(false, userpassword)
        await browser.close();
    }
}