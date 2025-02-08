const express = require('express');
const routerRestOwner = express.Router();
const Restaurent = require("../controllers/restaurantOwner")

routerRestOwner.get("/all/:id", Restaurent.getAllItem)
routerRestOwner.put("/:id", Restaurent.updateProfile)
routerRestOwner.post("/create", Restaurent.createItem)
routerRestOwner.put("/updateItem/:id", Restaurent.updateItem)
routerRestOwner.delete("/:id", Restaurent.deleteItem)
routerRestOwner.post("/newcat", Restaurent.addCategory)
routerRestOwner.get("/allItem/:id", Restaurent.getAllItem)

module.exports = routerRestOwner