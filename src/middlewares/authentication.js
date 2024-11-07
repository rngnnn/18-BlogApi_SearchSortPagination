"use strict";

const User = require("../models/user");

/* -------------------------------------------------------
    EXPRESSJS 
------------------------------------------------------- */

module.exports = async (req, res, next) => {

    req.user = null

    if (req.session._id) {

        const user = await User.findById(req.session._id)

        if (user && user.password == req.session.password) {

            req.user = user
            
        } else {
            req.session = null
        }

    }

    next()
}

