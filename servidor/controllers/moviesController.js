// var conDb = require("../lib/conexionbd.js");
var service = require("../services/moviesService");

var srv = new service();

function Controller() {
  this.getAll = async (req, res) => {
    srv.getAll(req, res);
  };

  this.getById = async (req, res) => {
    var id = req.params.id;
    srv.getById(id, res);
  };

  this.post = async (req, res) => {
    var result = await srv.post(req, res);
    res.status(200).send(JSON.stringify(result));
  };

  this.put = async (req, res) => {
    var result = await srv.put(req, res);
    res.status(200).send(JSON.stringify(result));
  };

  this.deleteById = async (req, res) => {
    var result = await srv.deleteById(req, res);
    res.status(200).send(JSON.stringify(result));
  };
}

module.exports = Controller;
