const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/login');
const EventoService = require('../services/EventoService');

//router.get("/getGiornale", isLoggedIn, async (req, res) => {
router.get('/', isLoggedIn, async (req, res, next) => {
    //let eventoService = await EventoService.getInstance({account: req.session.user.account});
    let eventoService = await EventoService.getInstance({});
    let item = await eventoService.getLuogo();
    //try {
        //let item = await eventoService.storeItem(123, 'prgdg', 'ddsaad', 'sdsda', 'sddsa', 'sdsda', 2424);
      //  let item = await eventoService.getLuogo();
     //   //res.render("evento", { title: "Descrizione Evento", item: item});
    //} catch (error) {
    //req.flash("error", "L'elemento selezionato non esiste.");
    //res.redirect("/");
    //}
});

module.exports = router;
