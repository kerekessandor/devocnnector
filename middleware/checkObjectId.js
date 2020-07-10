const mongoose = require('mongoose');

module.exports = (idToCheck) => async (req, res, next) => {
    const isValidObjectId = await mongoose.isValidObjectId(req.params[idToCheck]);

    if (!isValidObjectId)
        return res.status(400).json({msg: 'Profile not found. From middleware'});

    next();
}