"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const User = require('../models/user')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {

        const { email, password } = req.body

        if (email && password) { //checking email and password

            const user = await User.findOne({ email: email })

            if (user) {

                if (user.password == passwordEncrypt(password)) {

                    // Session
                    req.session._id = user._id
                    req.session.password = user.password

                    // Cookie
                    if (req.body.rememberMe == true) {
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 2
                    }

                    res.send({
                        error: false,
                        msg: 'Login Success!',
                    })

                } else {

                    res.errorStatusCode = 401
                    throw new Error('User Creadentials wrong!')
                }


            } else {

                res.errorStatusCode = 401
                throw new Error('User is not found!')

            }


        } else {

            res.errorStatusCode = 401
            throw new Error('Email and Password Required!')

        }

    },

    logout: async (req, res) => {

        req.session = null

        res.status(200).send({
            error: false,
            msg: "Logout Success!"
        })
    },

}
