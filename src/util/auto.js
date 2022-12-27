const puppeteer = require('puppeteer');

exports.auto = async (userpassword, proxy, dauphancach, callback) => {
    const user = userpassword.split(`${dauphancach}`)[0]
    const password = userpassword.split(`${dauphancach}`)[1]
    // console.log('proxy', user, password);

    const browser = await puppeteer.launch({
        headless: false,
        args: [
            // `--proxy-server=http://${proxy}`,
            '--window-size=300,300'
        ]
    });
    try {

        const facebook = await browser.newPage();
        await facebook.goto('https://www.facebook.com/login/device-based/regular/login/?login_attempt=1&lwv=100');
        await facebook.type('input[name=email]', user)
        await facebook.type('input[name=pass]', password)
        await facebook.click("button[name='login']")
        // await facebook.reload()
        await facebook.waitForNavigation()

        let url;
        url = await facebook.url()

        // if (url.split('/')[3] === '') {
        //     url = await facebook.url()
        // }

        if (url.split('/')[3] === 'login') {
            console.log('url.split("/")[3]', url);
            callback(false, userpassword)
            await browser.close();
        } else {
            console.log('url.split("/")[3]', url);
            callback(true, userpassword)
            await browser.close();
        }
        // await facebook.reload()

        // const submitIg = await browser.newPage();
        // await submitIg.goto('https://www.facebook.com/dialog/oauth?client_id=124024574287414&redirect_uri=fbconnect%3A%2F%2Fsuccess&scope=email%2Cpublish_actions%2Cpublish_pages%2Cuser_about_me%2Cuser_actions.books%2Cuser_actions.music%2Cuser_actions.news%2Cuser_actions.video%2Cuser_activities%2Cuser_birthday%2Cuser_education_history%2Cuser_events%2Cuser_games_activity%2Cuser_groups%2Cuser_hometown%2Cuser_interests%2Cuser_likes%2Cuser_location%2Cuser_notes%2Cuser_photos%2Cuser_questions%2Cuser_relationship_details%2Cuser_relationships%2Cuser_religion_politics%2Cuser_status%2Cuser_subscriptions%2Cuser_videos%2Cuser_website%2Cuser_work_history%2Cfriends_about_me%2Cfriends_actions.books%2Cfriends_actions.music%2Cfriends_actions.news%2Cfriends_actions.video%2Cfriends_activities%2Cfriends_birthday%2Cfriends_education_history%2Cfriends_events%2Cfriends_games_activity%2Cfriends_groups%2Cfriends_hometown%2Cfriends_interests%2Cfriends_likes%2Cfriends_location%2Cfriends_notes%2Cfriends_photos%2Cfriends_questions%2Cfriends_relationship_details%2Cfriends_relationships%2Cfriends_religion_politics%2Cfriends_status%2Cfriends_subscriptions%2Cfriends_videos%2Cfriends_website%2Cfriends_work_history%2Cads_management%2Ccreate_event%2Ccreate_note%2Cexport_stream%2Cfriends_online_presence%2Cmanage_friendlists%2Cmanage_notifications%2Cmanage_pages%2Cphoto_upload%2Cpublish_stream%2Cread_friendlists%2Cread_insights%2Cread_mailbox%2Cread_page_mailboxes%2Cread_requests%2Cread_stream%2Crsvp_event%2Cshare_item%2Csms%2Cstatus_update%2Cuser_online_presence%2Cvideo_upload%2Cxmpp_login&response_type=token')

        // /////////////
        // const getToken = await browser.newPage();
        // await getToken.goto('view-source:https://www.facebook.com/dialog/oauth?client_id=124024574287414&redirect_uri=https://www.instagram.com/accounts/signup/&&scope=email&response_type=token')
        // await getToken.reload()
        // const token = getToken.url()

        // const tool = await browser.newPage();
        // await tool.goto('file:///C:/Users/FPT/Desktop/auto/src/util/share.html')
        // await tool.type('#listToken', token.split('/')[5].split('&')[0].split('=')[1])
        // await tool.type('#listLink', idPost)
        // await tool.click('#shareVideo')
        // setTimeout(async () => {
        //     callback(true, token.split('/')[5].split('&')[0].split('=')[1])
        //     await browser.close();
        // }, 15000)
    } catch (error) {
        callback(false, userpassword)
        await browser.close();
    }
}