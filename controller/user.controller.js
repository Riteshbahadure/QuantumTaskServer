const asyncHandler = require("express-async-handler")
const User = require("../model/User")
const bycrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isFound = await User.findOne({ email })
        if (isFound) {
            res.status(409).json({ message: "email already exist" })
        }
        const hashPass = await bycrypt.hash(password, 10)
        await User.create({ ...req.body, password: hashPass })
        res.json({ message: `${req.body.name} Register Success` })
    } catch (error) {
        res.status(500).json({ message: "failed to user register", error: error.message })
    }
})
exports.loginUser = asyncHandler(async (req, res) => {
    try {
        const { password, email } = req.body
        const result = await User.findOne({ email })
        if (!result) {
            res.status(409).json({ message: "email already exist" })
        }
        const verify = await bycrypt.compare(password, result.password)
        if (!verify) {
            res.status(500).json({ message: "password do not match" })
        }
        const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "16h" })
        res.cookie("user", token, { httpOnly: true })
        res.json({
            message: "user login success",
            result: ({
                _id: result._id,
                name: result.name,
                email: result.email,
                dateOfBirth: result.dateOfBirth
            })
        })
    } catch (error) {
        res.status(500).json({ message: "failed to user login", error: error.message })
    }
})
exports.logOutUser = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("user")
        res.json({ message: "user logout success " })
    } catch (error) {
        res.status(500).json({ message: "failed to user logout", error: error.message })
    }
})
exports.getAllUser = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User Fetch Success", result })
})