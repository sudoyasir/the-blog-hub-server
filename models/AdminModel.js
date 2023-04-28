const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

AdminSchema.pre('save', async function (next) {
    const admin = this;
    if (!admin.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(admin.password, salt);
        admin.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});
AdminSchema.methods.comparePassword = async function (plainPassword) {
    const admin = this;

    return bcrypt.compare(plainPassword, admin.password);
};

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;