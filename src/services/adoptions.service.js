const AdoptionsDAO = require("../dao/mongo/AdoptionsDAO");

const adoptionsDAO = new AdoptionsDAO();

const getAllAdoptions = async () => {
  return await adoptionsDAO.getAll();
};

const getAdoptionById = async (id) => {
  return await adoptionsDAO.getBy({ _id: id });
};

module.exports = { getAllAdoptions, getAdoptionById };