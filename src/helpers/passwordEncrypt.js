"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const crypto = require('node:crypto')

// parameters
// const keyCode = '21yuifhsdkjfgisafisadhfsgawfhssvsfifashfusagfjsdga' // secretKey
// const loopCount = 10_000 // number of loops
// const charCount = 32 // write 32 for 64
// const encType = 'sha512' // Type of algorithm

const keyCode = process.env.SECRET_KEY
const loopCount = Number(process.env.LOOP_COUNT) // in .env should be written --> 10000 not 10_000
const charCount = Number(process.env.CHAR_COUNT) 
const encType = process.env.ENC_TYPE

module.exports = (password) => {

    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
}

// module.exports = passwordEncrypt
