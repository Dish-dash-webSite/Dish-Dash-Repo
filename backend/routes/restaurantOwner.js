const express = require('express');
const routerRestOwner = express.Router();
const Restaurent = require("../controllers/restaurantOwner")
const authMiddleware = require('../middlewares/authDelivery')

routerRestOwner.get("/all/:id", Restaurent.getAllItem)
routerRestOwner.put("/updateProfile", authMiddleware, Restaurent.updateProfile)
routerRestOwner.post("/create", authMiddleware, Restaurent.createItem)
routerRestOwner.put("/updateItem/:id", Restaurent.updateItem)
routerRestOwner.delete("/:id", Restaurent.deleteItem)
routerRestOwner.post("/newcat", Restaurent.addCategory)
// routerRestOwner.get("/allItem", Restaurent.getallRestoOfOne)
routerRestOwner.post("/createResto", Restaurent.CreateRestaurant)
routerRestOwner.post("/loginResto", Restaurent.LoginRestoOwner)
routerRestOwner.get("/getResto", authMiddleware, Restaurent.getRestoOwner)
routerRestOwner.post("/logoutResto", Restaurent.logOutResto)
routerRestOwner.get("/personalInfo", authMiddleware, Restaurent.getProfileInfos)
routerRestOwner.get("/restoInfo", authMiddleware, Restaurent.getRestoInfo)
module.exports = routerRestOwner