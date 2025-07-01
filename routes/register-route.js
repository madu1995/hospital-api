const express = require("express");
const {
  saveRegistration,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controller/register-controller");
const authenticateToken = require("../controller/auth-middleware");

const router = express.Router();

router.post("/register", saveRegistration);
router.post("/login", loginUser);
router.get("/get", authenticateToken, getAllUsers);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);

module.exports = router;
