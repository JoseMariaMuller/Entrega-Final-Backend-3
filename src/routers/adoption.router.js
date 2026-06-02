const { Router } = require("express");
const adoptionsController = require("../controllers/adoptions.controller");

const router = Router();

router.get("/", adoptionsController.getAllAdoptions);

router.get("/:aid", adoptionsController.getAdoptionById);

router.post("/:uid/:pid", adoptionsController.createAdoption);

module.exports = router;