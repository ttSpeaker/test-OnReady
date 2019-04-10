var express = require("express");
var controller = require("../controllers/moviesController");

var ctl = new controller();
var router = express.Router();

// host/movies

router.get("/", ctl.getAll);

router.get("/:id", ctl.getById);

//router.get("/deleted",ctl.getInactive)

router.post("/", ctl.post);

router.put("/:id", ctl.put);

router.delete("/:id", ctl.deleteById);

module.exports = router;
