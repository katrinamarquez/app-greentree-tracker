// middleware functions
const userAuthenticated = function (req, res, next) {
    console.log("in userAuthenticated got req.user", req.user)
    console.log("in userAuthenticated got req.session", req.session)
    console.log("in userAuthenticated got req.sessionID", req.sessionID)
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
}

const isAdmin = function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        res.sendStatus(403);
    }
}

const checkPrice = function (req, res, next) {
    if (req.query.price) {
        req.query.price = parseInt(req.query.price)
    }
    next()
}

module.exports = {
    isAdmin,
    userAuthenticated,
    checkPrice
};