const GenericDAO = require("./GenericDAO");
const petModel = require("../models/Pet");

class PetsDAO extends GenericDAO {
    constructor() {
        super(petModel);
    }
}

module.exports = PetsDAO;