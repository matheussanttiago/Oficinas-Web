const User = require('../models/User')

class UserController {

    async readAll(req, res) {
        try {

            const result = await User.findUsers()
            res.send(result)

        } catch (error) {

            res.send(error)

        }
    }

    // Segunda forma de fazer
    // User.findUsers().then((result) => {

    // }).catch((error) => {

    // })

}

module.exports = new UserController()