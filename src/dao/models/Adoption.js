const mongoose = require("mongoose");

const adoptionCollection = "adoptions";

const adoptionSchema = new mongoose.Schema({
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    pet: { type: mongoose.SchemaTypes.ObjectId, ref: "pets" },
});

const adoptionModel = mongoose.model(adoptionCollection, adoptionSchema);
module.exports = adoptionModel;