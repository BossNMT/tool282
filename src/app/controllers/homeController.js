const { auto } = require('../../util/auto');

class homeController {
    home(req, res) {
        res.render('home')
    }

    async handle(req, res) {
        const { valueUser, proxy, dauphancach } = req.body
        // console.log(valueUser, proxy, dauphancach);

        try {
            auto(valueUser, proxy, dauphancach, (bolean, msg) => {
                if (bolean) {
                    res.send({
                        success: true,
                        user: msg
                    })
                } else {
                    res.send({
                        success: false,
                        user: msg
                    })
                }
            })
        } catch (error) {
            res.send({
                success: false,
                user: valueUser
            })
        }
    }
}

module.exports = new homeController;
