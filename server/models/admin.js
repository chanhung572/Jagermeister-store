const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
});

adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id, username: this.username },
        process.env.JWTPRIVATE_KEY,
        { expiresIn: '7d' }
    );
    return token;
}

const Admin = mongoose.model('account_admin', adminSchema);

const validateAdmin = (data) => {
    const Schema = joi.object({
        username: joi.string().required().label('Username'),
        password: passwordComplexity().required().label('Password'),
        email: joi.string().email().required().label('Email')
    });
    return Schema.validate(data);
}

module.exports = {Admin, validateAdmin};