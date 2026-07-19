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

app.get("/users", async (req, res) => {
    try{
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found!"
            });
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
})

app.post("/submit", async (req, res) => {
    try{
        console.log(req.body);
        await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "Data Received successfully!",
            data: User        
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        });
    }
});

app.delete("/users/:id" , async (req, res) => {
    console.log(req.params.id);
    const validUser = await User.findById(req.params.id);
    console.log(validUser);
    if (!validUser){
        return res.json({message: "User Not found"})
    } else {
        await validUser.deleteOne()
        return res.json({message: "Successful"})
    }
});

app.put("/users/:id", async (req, res) => {
    const validUser = await User.findById(req.params.id);
    if (!validUser){
        return res.json({message: "User not found"})
    } else {
        validUser.name = req.body.name;
        validUser.email = req.body.email;
        validUser.password = req.body.password;

        await validUser.save();
        return res.json({message: "Successful"})
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})