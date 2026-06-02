const express = require("express");
const cookieParser = require("cookie-parser");
const adoptionRouter = require("./routers/adoption.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Adoption API running" });
});

app.use("/api/adoptions", adoptionRouter);

app.use((req, res) => {
    res.status(404).json({ status: "error", error: "Route not found" });
});

module.exports = app;