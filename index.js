const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
const app = express()
// app.use(express.static("dist"))

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))

// app.use("/api/admin", require("./route/admin.route"))
app.use("/api/user", require("./route/user.route"))
app.use("*", async (req, res) => {
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "Resourse Not Found" })
})
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "something wen wrong" })
})
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING")
    )
})