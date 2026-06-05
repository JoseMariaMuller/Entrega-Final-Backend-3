const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const adoptionRouter = require("./routers/adoption.router");
const usersRouter = require("./routers/users.router");
const petsRouter = require("./routers/pets.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Adoption API running" });
});

app.use("/api/adoptions", adoptionRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", error: "Route not found" });
});

module.exports = app;