const UsersDAO = require("../dao/mongo/UsersDAO");
const bcrypt = require("bcrypt");

const usersDAO = new UsersDAO();

const getAllUsers = async (req, res) => {
  try {
    const users = await usersDAO.getAll();
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await usersDAO.getBy({ _id: req.params.uid });
    if (!user) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: "error", error: "All fields are required" });
    }
    const exists = await usersDAO.getBy({ email });
    if (exists) {
      return res.status(400).json({ status: "error", error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usersDAO.save({ first_name, last_name, email, password: hashedPassword, role: role || "user", pets: [] });
    res.status(201).json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

module.exports = { getAllUsers, getUserById, createUser };