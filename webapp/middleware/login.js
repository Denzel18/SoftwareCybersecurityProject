let isLoggedIn = (req, res, next) => {
    /*if(req.session.user) {
        next();
    } else {
    return res.redirect("/login");
    }*/
    next();
}

module.exports = isLoggedIn;
