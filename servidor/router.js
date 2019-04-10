var express = require("express");

var router = express.Router();

var moviesRouter = require("./routes/moviesRouter");

router.use("/movies", moviesRouter);

module.exports = router;
