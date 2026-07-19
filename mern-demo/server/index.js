const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    res.json(
        {message: "Data Received successfully!"}
    );
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})