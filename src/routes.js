const express = require("express")
const Controller = require("./controller")

const routes = express.Router();
const controller = new Controller()


routes.get("/films/:id/", controller.index)


module.exports=routes