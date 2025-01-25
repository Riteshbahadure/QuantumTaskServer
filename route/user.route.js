const { registerUser, loginUser, logOutUser, getAllUser } = require("../controller/user.controller")

const route = require("express").Router()

route
    .post("/registerUser", registerUser)
    .post("/loginUser", loginUser)
    .post("/logoutUser", logOutUser)
    .get("/getUser", getAllUser)


module.exports = route
