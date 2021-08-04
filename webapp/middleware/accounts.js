const isAdmin = (req, res, next) => {
    if (req.session.user.type === 'admin') {
        next();
    } else {
        req.flash('error', 'ERRORE, non sei autorizzato a compiere questa azione.');
        return res.redirect('/');
    }
}

const isInvalidator = (req, res, next) => {
    if (req.session.user.type === 'invalidator') {
        next();
    } else {
        req.flash('error', 'ERRORE, non sei autorizzato a compiere questa azione.');
        return res.redirect('/');
    }
}

const isUser = (req, res, next) => {
    if (req.session.user.type === 'user') {
        next();
    } else {
        return res.redirect('/');
    }
}

const isAdminOrInvalidator = (req, res, next) => {
    if (req.session.user.type === 'admin' || req.session.user.type === 'invalidator') {
        next();
    } else {
        req.flash('error', 'ERRORE, non sei autorizzato a compiere questa azione.');
        return res.redirect('/');
    }
}

module.exports = {isAdmin, isInvalidator, isUser, isAdminOrInvalidator};
