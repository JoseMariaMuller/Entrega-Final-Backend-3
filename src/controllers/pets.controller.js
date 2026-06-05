const PetsDAO = require("../dao/mongo/PetsDAO");

const petsDAO = new PetsDAO();

const getAllPets = async (req, res) => {
    try {
        const pets = await petsDAO.getAll();
        res.status(200).json({ status: "success", payload: pets });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const getPetById = async (req, res) => {
    try {
        const pet = await petsDAO.getBy({ _id: req.params.pid });
        if (!pet) {
            return res.status(404).json({ status: "error", error: "Pet not found" });
        }
        res.status(200).json({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const createPet = async (req, res) => {
    try {
        const { name, specie, birthDate } = req.body;
        if (!name || !specie) {
            return res.status(400).json({ status: "error", error: "Name and specie are required" });
        }
        const pet = await petsDAO.save({ name, specie, birthDate, adopted: false, owner: null });
        res.status(201).json({ status: "success", payload: pet });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

module.exports = { getAllPets, getPetById, createPet };