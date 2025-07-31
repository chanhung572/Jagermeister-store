const router = require('express').Router();
const { Admin } = require('../models/admin');
const bcrypt = require('bcryptjs');

router.post("/", async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin)
      return res.status(400).send("Invalid username or password");

    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword)
      return res.status(400).send("Invalid username or password");

    const token = admin.generateAuthToken();
    res.status(200).send({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

module.exports = router;