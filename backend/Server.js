require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Chat = require("./Model/Chat");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ Error:", err));

app.get("/", (req, res) => {
    res.send("Backend Working");
});

app.post("/chat", async (req, res) => {
    try {
        const chat = await Chat.create(req.body);
        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/chat", async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 });
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => {
    console.log("🚀 Server Running");
});