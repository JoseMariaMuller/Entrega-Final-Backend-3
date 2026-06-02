const GenericDAO = require("./GenericDAO");
const userModel = require("../models/User");

class UsersDAO extends GenericDAO {
    constructor() {
        super(userModel);
    }
}

module.exports = UsersDAO;