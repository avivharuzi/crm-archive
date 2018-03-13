const Recipe = require('./../models/recipe.model');

const ValidationHandler = require('./../handlers/validation.handler');

class RecipeController {
    static saveRecipe(recipe) {
        return new Promise((resolve, reject) => {
            Recipe.create(recipe, (err, newRecipe) => {
                if (err) {
                    reject(['There was problem by saving recipe']);
                } else {
                    resolve(newRecipe);
                }
            });
        });
    }

    static validateRecipe(recipe, owner) {
        return new Promise((resolve, reject) => {
            recipe.ownerId = owner._id;
            recipe.ownerName = owner.name;

            let errors = [];

            if (!ValidationHandler.regex(recipe.title, /^[a-zA-Z0-9_ ]{2,55}$/)) {
                errors.push('Title is invalid');
            }

            if (!ValidationHandler.regex(recipe.subtitle, /^[a-zA-Z0-9_ ]{2,55}$/)) {
                errors.push('Subtitle is invalid');
            }

            if (!['USD', 'ILS', 'EUR'].includes(recipe.currency)) {
                errors.push('Currency is invalid');
            }

            if (!ValidationHandler.regex(recipe.price, /^[0-9]{1,30}$/)) {
                errors.push('Price is invalid');
            }

            if (!ValidationHandler.regex(recipe.discount, /^[0-9]{1,2}$/)) {
                errors.push('Discount is invalid');
            }

            if (!['cash', 'check', 'credit card'].includes(recipe.payment)) {
                errors.push('Payment is invalid');
            }

            if (errors.length) {
                reject(errors);
            } else {
                recipe.originalPrice = recipe.price;

                if (recipe.discount > 0) {
                    recipe.price = ((100 - recipe.discount) / 100) * recipe.originalPrice;
                    resolve(recipe);
                } else {
                    resolve(recipe);
                }
            }
        });
    }

    static getRecipesToCustomerFromCompany(companyId, customerId) {
        return new Promise((resolve, reject) => {
            Recipe.find({
                ownerId: companyId,
                customerId: customerId
            }, (err, recipes) => {
                if (err) {
                    reject(['There was problem to find recipes']);
                } else {
                    resolve(recipes);
                }
            });
        });
    }
}

module.exports = RecipeController;
