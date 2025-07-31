const router = require('express').Router();
const { Admin, validateAdmin } = require('../models/admin');
const bcrypt = require('bcryptjs');

router.post("/",async (req, res) => {
    try {
        const {error} = validateAdmin(req.body);
        if(error)
            return res.status(400).send(error.details[0].message);
        const admin = await Admin.findOne({email: req.body.email});
        if(admin)
            return res.status(400).send("Admin with given email already exists");

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new Admin({...req.body, password: hashPassword}).save();
        res.status(201).send("Admin account created successfully");
    }catch (error) {
        res.status(500).send("Internal Server Error: " + error.message);
    }
})
module.exports = router;