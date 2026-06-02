const UsersDAO = require("../dao/mongo/UsersDAO");
const PetsDAO = require("../dao/mongo/PetsDAO");
const AdoptionsDAO = require("../dao/mongo/AdoptionsDAO");

const usersDAO = new UsersDAO();
const petsDAO = new PetsDAO();
const adoptionsDAO = new AdoptionsDAO();

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsDAO.getAll();
        res.status(200).json({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const getAdoptionById = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        const adoption = await adoptionsDAO.getBy({ _id: adoptionId });
        if (!adoption) {
            return res.status(404).json({ status: "error", error: "Adoption not found" });
        }
        res.status(200).json({ status: "success", payload: adoption });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

const createAdoption = async (req, res) => {
    try {
        const { uid, pid } = req.params;

        const user = await usersDAO.getBy({ _id: uid });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }

        const pet = await petsDAO.getBy({ _id: pid });
        if (!pet) {
            return res.status(404).json({ status: "error", error: "Pet not found" });
        }

        if (pet.adopted) {
            return res.status(400).json({ status: "error", error: "Pet is already adopted" });
        }

        user.pets.push(pet._id);
        await usersDAO.update(user._id, { pets: user.pets });
        await petsDAO.update(pet._id, { adopted: true, owner: user._id });

        const adoption = await adoptionsDAO.save({ owner: user._id, pet: pet._id });

        res.status(201).json({ status: "success", payload: adoption });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};

module.exports = { getAllAdoptions, getAdoptionById, createAdoption };