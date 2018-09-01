const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: String,
    number: Number,
    image: String,
    username: String,
    password: String,
    country: String,
    countryImage: String,
    city: String,
    street: String,
    description: String,
    customers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    joined: {
        type: Date,
        default: Date.now
    }
});

companySchema.pre('save', function (next) {
    let company = this;

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(company.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            company.password = hash;
            next();
        });
    });
});

companySchema.methods.comparePassword = function (candidatePassword, cb) {
    let company = this;

    bcrypt.compare(candidatePassword, company.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

const Company = mongoose.model('Company', companySchema, 'companies');

module.exports = Company;
