"use strict";
/* -------------------------------------------------------
    EXPRESSJS 
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    res.status(statusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}


