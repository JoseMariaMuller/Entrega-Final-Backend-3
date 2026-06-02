const mongoose = require("mongoose");

const petCollection = "pets";

const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    specie: { type: String, required: true },
    birthDate: { type: String },
    adopted: { type: Boolean, default: false },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    image: { type: String },
});

const petModel = mongoose.model(petCollection, petSchema);
module.exports = petModel;