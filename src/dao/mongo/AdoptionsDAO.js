const GenericDAO = require("./GenericDAO");
const adoptionModel = require("../models/Adoption");

class AdoptionsDAO extends GenericDAO {
    constructor() {
        super(adoptionModel);
    }
}

module.exports = AdoptionsDAO;