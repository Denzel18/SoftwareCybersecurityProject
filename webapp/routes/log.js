
const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/login");
//const convertDate = require("../utils/convertdate");
const venditaLogService = require("../services/venditalogservice");

router.get("/", isLoggedIn, async (req, res) => {
    let venditaLogService = await venditaLogService.getInstance({account: req.session.user.account});
    let log = await venditaLogService.getLog();
    res.render("log", { title: "Log delle vendite", log: log, user: req.session.user });
});

module.exports = router;
