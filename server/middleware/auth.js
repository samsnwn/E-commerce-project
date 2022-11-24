const ExpressError = require("../ExpressError");

exports.auth = (req, res, next) => {
    if(req.session.user) {
        if(req.session.user.isVerified) {
            req.user = {...req.session.user, password: null}
            next()
        } else {
            throw new ExpressError('Verify your email to see this content', 401)
        }
    } else {
        throw new ExpressError('Please login first!', 401)
    }
}


exports.verifyAdmin = (req, res, next) => {
    if(req.session.user.isAdmin) {
        next()
    } else {
        throw new ExpressError('You are not authorized!', 401)
    }
}