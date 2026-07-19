require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String
});
const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.post("/submit", async (req, res) => {
    console.log(req.body);
    await User.create(req.body);

    res.json(
        {message: "Data Received successfully!"}
    );
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})