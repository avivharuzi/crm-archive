const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    subtitle: String,
    ownerName: String,
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    currency: String,
    price: Number,
    originalPrice: Number,
    discount: Number,
    payment: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

module.exports = Recipe;
